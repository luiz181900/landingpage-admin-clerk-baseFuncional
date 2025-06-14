-- ========================================
-- SCRIPT SQL PARA CRIAÇÃO DAS TABELAS NO SUPABASE
-- Execute estes comandos no SQL Editor do Supabase
-- ========================================

-- 1. TABELA DE CONFIGURAÇÕES DO SITE
-- Armazena configurações globais como tema ativo, título do site, etc.
CREATE TABLE IF NOT EXISTS site_configs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_site_configs_key ON site_configs(key);
CREATE INDEX IF NOT EXISTS idx_site_configs_created_at ON site_configs(created_at);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_configs_updated_at 
    BEFORE UPDATE ON site_configs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================

-- 2. TABELA DE TEMAS PERSONALIZADOS
-- Para futuras funcionalidades de temas customizados
CREATE TABLE IF NOT EXISTS custom_themes (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    colors JSONB NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_custom_themes_name ON custom_themes(name);
CREATE INDEX IF NOT EXISTS idx_custom_themes_is_active ON custom_themes(is_active);
CREATE INDEX IF NOT EXISTS idx_custom_themes_created_by ON custom_themes(created_by);

-- Trigger para updated_at
CREATE TRIGGER update_custom_themes_updated_at 
    BEFORE UPDATE ON custom_themes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================

-- 3. TABELA DE LOGS DE AUDITORIA
-- Registra todas as ações importantes do sistema
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL,
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance e consultas
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_action ON audit_logs(user_id, action);

-- ========================================

-- 4. TABELA DE ESTATÍSTICAS DE USO
-- Armazena métricas e estatísticas do sistema
CREATE TABLE IF NOT EXISTS usage_stats (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    date DATE NOT NULL,
    metric TEXT NOT NULL,
    value INTEGER NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, metric)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_usage_stats_date ON usage_stats(date);
CREATE INDEX IF NOT EXISTS idx_usage_stats_metric ON usage_stats(metric);
CREATE INDEX IF NOT EXISTS idx_usage_stats_date_metric ON usage_stats(date, metric);

-- ========================================

-- 5. TABELA DE PREFERÊNCIAS DO USUÁRIO
-- Armazena configurações específicas de cada usuário
CREATE TABLE IF NOT EXISTS user_preferences (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT UNIQUE NOT NULL,
    preferred_theme TEXT,
    email_notifications BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_preferred_theme ON user_preferences(preferred_theme);

-- Trigger para updated_at
CREATE TRIGGER update_user_preferences_updated_at 
    BEFORE UPDATE ON user_preferences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================

-- 6. INSERIR DADOS INICIAIS
-- Configurações padrão do sistema
INSERT INTO site_configs (key, value) VALUES 
    ('active_theme', 'green'),
    ('site_title', 'Marketing Mastery - 1K por dia'),
    ('site_description', 'Aprenda a criar e vender produtos digitais low ticket'),
    ('maintenance_mode', 'false'),
    ('analytics_enabled', 'true')
ON CONFLICT (key) DO NOTHING;

-- ========================================

-- 7. POLÍTICAS DE SEGURANÇA RLS (Row Level Security)
-- Habilitar RLS para todas as tabelas

-- Site Configs - Apenas leitura pública, escrita apenas para admins
ALTER TABLE site_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de configurações" ON site_configs
    FOR SELECT USING (true);

CREATE POLICY "Permitir escrita apenas para usuários autenticados" ON site_configs
    FOR ALL USING (auth.role() = 'authenticated');

-- Custom Themes - Usuários podem ver todos, mas só editar os próprios
ALTER TABLE custom_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de temas" ON custom_themes
    FOR SELECT USING (true);

CREATE POLICY "Usuários podem inserir seus próprios temas" ON custom_themes
    FOR INSERT WITH CHECK (auth.uid()::text = created_by);

CREATE POLICY "Usuários podem editar seus próprios temas" ON custom_themes
    FOR UPDATE USING (auth.uid()::text = created_by);

-- Audit Logs - Apenas usuários autenticados podem ver seus próprios logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios logs" ON audit_logs
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Sistema pode inserir logs" ON audit_logs
    FOR INSERT WITH CHECK (true);

-- Usage Stats - Apenas leitura para usuários autenticados
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários autenticados podem ver estatísticas" ON usage_stats
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Sistema pode inserir estatísticas" ON usage_stats
    FOR INSERT WITH CHECK (true);

-- User Preferences - Usuários só podem ver/editar suas próprias preferências
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas próprias preferências" ON user_preferences
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Usuários podem inserir suas próprias preferências" ON user_preferences
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Usuários podem editar suas próprias preferências" ON user_preferences
    FOR UPDATE USING (auth.uid()::text = user_id);

-- ========================================

-- 8. FUNÇÕES UTILITÁRIAS
-- Função para obter configuração do site
CREATE OR REPLACE FUNCTION get_site_config(config_key TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN (SELECT value FROM site_configs WHERE key = config_key);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para definir configuração do site
CREATE OR REPLACE FUNCTION set_site_config(config_key TEXT, config_value TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO site_configs (key, value) 
    VALUES (config_key, config_value)
    ON CONFLICT (key) 
    DO UPDATE SET value = config_value, updated_at = NOW();
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para registrar log de auditoria
CREATE OR REPLACE FUNCTION create_audit_log(
    p_user_id TEXT,
    p_action TEXT,
    p_details JSONB DEFAULT NULL,
    p_ip_address TEXT DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO audit_logs (user_id, action, details, ip_address, user_agent)
    VALUES (p_user_id, p_action, p_details, p_ip_address, p_user_agent);
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================

-- 9. VIEWS ÚTEIS
-- View para estatísticas resumidas
CREATE OR REPLACE VIEW stats_summary AS
SELECT 
    COUNT(*) as total_theme_changes,
    COUNT(DISTINCT user_id) as unique_users,
    MAX(created_at) as last_activity
FROM audit_logs 
WHERE action = 'theme_changed';

-- View para temas mais usados
CREATE OR REPLACE VIEW popular_themes AS
SELECT 
    (details->>'newTheme')::text as theme_name,
    COUNT(*) as usage_count,
    MAX(created_at) as last_used
FROM audit_logs 
WHERE action = 'theme_changed' 
    AND details->>'newTheme' IS NOT NULL
GROUP BY details->>'newTheme'
ORDER BY usage_count DESC;

-- ========================================

-- 10. COMENTÁRIOS E DOCUMENTAÇÃO
COMMENT ON TABLE site_configs IS 'Configurações globais do sistema';
COMMENT ON TABLE custom_themes IS 'Temas personalizados criados pelos usuários';
COMMENT ON TABLE audit_logs IS 'Logs de auditoria de todas as ações do sistema';
COMMENT ON TABLE usage_stats IS 'Estatísticas de uso e métricas do sistema';
COMMENT ON TABLE user_preferences IS 'Preferências individuais de cada usuário';

COMMENT ON COLUMN site_configs.key IS 'Chave única da configuração';
COMMENT ON COLUMN site_configs.value IS 'Valor da configuração em formato texto';
COMMENT ON COLUMN custom_themes.colors IS 'Objeto JSON com todas as cores do tema';
COMMENT ON COLUMN audit_logs.details IS 'Detalhes da ação em formato JSON';
COMMENT ON COLUMN usage_stats.metadata IS 'Metadados adicionais da métrica';

-- ========================================
-- FIM DO SCRIPT
-- ========================================

-- Para verificar se tudo foi criado corretamente:
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE tablename IN ('site_configs', 'custom_themes', 'audit_logs', 'usage_stats', 'user_preferences')
ORDER BY tablename;
