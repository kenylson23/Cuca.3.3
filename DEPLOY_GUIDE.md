# Guia de Deploy - CUCA Beer Landing Page

## Arquitetura de Deploy

- **Frontend**: Netlify (React/Vite)
- **Backend**: Vercel (Node.js/Express)
- **Database**: Neon PostgreSQL

## Deploy no Vercel (Backend)

1. **Conecte seu repositório ao Vercel:**
   - Acesse vercel.com
   - Clique em "New Project"
   - Conecte seu GitHub e selecione este repositório
   - Configure as variáveis de ambiente necessárias:
     - `DATABASE_URL`: URL da sua base de dados PostgreSQL
     - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

2. **Configurações automáticas:**
   - O `vercel.json` já está configurado
   - Build command: automático
   - Output directory: automático
   - Node version: 20

3. **Clique em "Deploy"**

## Deploy no Netlify (Frontend)

1. **Conecte seu repositório ao Netlify:**
   - Acesse netlify.com
   - Clique em "New site from Git"
   - Conecte seu GitHub e selecione este repositório

2. **Configurações automáticas:**
   - Build command: `node build-client.js`
   - Publish directory: `dist`
   - Node version: 20
   - Todas as configurações estão no `netlify.toml`

3. **Variáveis de ambiente:**
   - `VITE_API_URL`: URL do seu backend no Vercel (ex: https://cuca-beer.vercel.app)

4. **Clique em "Deploy site"**

## Arquivos de Configuração

### netlify.toml
```toml
[build]
  publish = "dist"
  command = "node build-client.js"

[build.environment]
  NODE_VERSION = "20"
  VITE_API_URL = "https://cuca-beer.vercel.app"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### vercel.json
```json
{
  "version": 2,
  "functions": {
    "api/*.ts": {
      "runtime": "@vercel/node"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

## Comunicação Netlify ↔ Vercel

- CORS configurado no backend para aceitar requests do Netlify
- Frontend configurado para usar a API do Vercel em produção
- Credenciais e cookies funcionam entre domínios

## Funcionalidades Incluídas

- ✅ Landing page responsiva da CUCA
- ✅ Formulário de contato funcional
- ✅ Sistema de autenticação
- ✅ Galeria de fotos dos fãs
- ✅ Painel administrativo
- ✅ Analytics e métricas
- ✅ SEO completo
- ✅ Performance otimizada

## URLs de Exemplo

- Frontend (Netlify): https://cuca-beer.netlify.app
- Backend (Vercel): https://cuca-beer.vercel.app
- API: https://cuca-beer.vercel.app/api/

## Resolução de Problemas

1. **Erro 404 no Netlify**: Verifique se o arquivo `_redirects` foi criado
2. **CORS Error**: Adicione sua URL do Netlify à lista de origins permitidos
3. **Database Connection**: Verifique as variáveis de ambiente no Vercel