# Setup de Produção - CUCA Beer

## Configuração Completa para Netlify + Vercel

### 1. Deploy no Vercel (Backend API)

**Passo 1:** Conecte o repositório ao Vercel
- Acesse vercel.com e faça login
- Clique em "New Project"
- Conecte seu GitHub e selecione este repositório

**Passo 2:** Configure as variáveis de ambiente no Vercel:
```
DATABASE_URL=sua_url_do_postgresql
PGHOST=seu_host_do_postgres
PGPORT=5432
PGUSER=seu_usuario
PGPASSWORD=sua_senha
PGDATABASE=nome_da_database
```

**Passo 3:** Configure o domínio personalizado (opcional)
- Acesse Settings > Domains no Vercel
- Adicione seu domínio personalizado

### 2. Deploy no Netlify (Frontend)

**Passo 1:** Conecte o repositório ao Netlify
- Acesse netlify.com e faça login
- Clique em "New site from Git"
- Conecte seu GitHub e selecione este repositório

**Passo 2:** Configure as variáveis de ambiente no Netlify:
```
VITE_API_URL=https://sua-app.vercel.app
```

**Passo 3:** As configurações de build são automáticas via netlify.toml

### 3. Configuração de CORS

O backend já está configurado para aceitar requests dos seguintes domínios:
- `https://cuca-beer.netlify.app`
- `https://cuca-beer-landing.netlify.app`
- Domínios de desenvolvimento locais

Para adicionar seu domínio personalizado do Netlify, edite o arquivo `server/index.ts` na linha que contém `allowedOrigins` e adicione sua URL.

### 4. Verificação de Funcionalidade

Após o deploy, teste:
1. **Frontend:** Acesse sua URL do Netlify
2. **API:** Acesse `sua-url-vercel.app/api/test`
3. **Formulário de contato:** Teste o envio de mensagem
4. **Navegação:** Teste o roteamento SPA

### 5. Monitoramento

- **Netlify:** Logs de build em Site Settings > Build & Deploy
- **Vercel:** Logs de função em Functions > View Details
- **Database:** Monitore conexões via painel do seu provedor PostgreSQL

## Arquivos de Configuração Criados

- `netlify.toml` - Configuração do Netlify
- `vercel.json` - Configuração do Vercel  
- `build-client.js` - Script de build otimizado
- `client/public/_redirects` - Redirecionamentos SPA

## Solução de Problemas

**Erro 404 no Netlify:**
- Verifique se o arquivo `_redirects` foi criado na pasta `dist/`

**Erro de CORS:**
- Adicione sua URL do Netlify na lista `allowedOrigins` no backend

**Falha no build:**
- Verifique as variáveis de ambiente `VITE_API_URL`
- Confirme que todas as dependências estão instaladas

**Database connection error:**
- Verifique se as variáveis `DATABASE_URL` e outras estão corretas no Vercel