# CUCA Beer - Deploy no Netlify + Vercel

## Configuração Completa

O projeto está totalmente configurado para funcionar com:
- **Frontend (Netlify)**: Landing page React otimizada
- **Backend (Vercel)**: API Node.js/Express com PostgreSQL

## Arquivos de Deploy Criados

### 1. `netlify.toml` - Configuração do Netlify
```toml
[build]
  publish = "dist"
  command = "npm install && node build-client.js"

[build.environment]
  NODE_VERSION = "20"
  VITE_API_URL = "https://cuca-beer.vercel.app"
```

### 2. `vercel.json` - Configuração do Vercel
```json
{
  "version": 2,
  "functions": {
    "api/*.ts": {
      "runtime": "@vercel/node"
    }
  }
}
```

### 3. `build-client.js` - Script de Build Otimizado
Script para gerar apenas o frontend com configurações de produção.

## Passos para Deploy

### Deploy no Vercel (Backend):
1. Conecte repositório no vercel.com
2. Configure variáveis de ambiente:
   - `DATABASE_URL`
   - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`
3. Deploy automático

### Deploy no Netlify (Frontend):
1. Conecte repositório no netlify.com
2. Configure variável de ambiente:
   - `VITE_API_URL=https://sua-app.vercel.app`
3. Deploy automático

## Funcionalidades Incluídas

- Landing page responsiva da CUCA
- Formulário de contato funcional
- Sistema de autenticação
- Galeria de fotos dos fãs
- Painel administrativo
- CORS configurado para comunicação entre domínios
- Otimizações de performance
- SEO completo

## Comunicação Entre Serviços

O projeto está configurado para comunicação segura entre Netlify e Vercel:
- CORS habilitado no backend
- URLs de produção configuradas
- Redirecionamentos SPA funcionais

O projeto está pronto para deploy!