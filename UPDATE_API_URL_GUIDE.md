# 🔗 Como Atualizar a URL da API no Frontend

## 📍 Passo a Passo

### 1. Encontrar sua URL do Vercel
Após o deploy no Vercel, você terá uma URL como:
```
https://seu-projeto.vercel.app
```

### 2. Atualizar no Netlify (Recomendado)
No painel do Netlify:
1. Vá em **Site settings** → **Environment variables**
2. Adicione:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://sua-url-vercel.vercel.app`
3. Faça **redeploy** do site

### 3. Alternativa: Editar netlify.toml
Ou edite diretamente o arquivo `netlify.toml`:
```toml
[build.environment]
  NODE_VERSION = "20"
  VITE_API_URL = "https://sua-url-vercel.vercel.app"
```

## ✅ Verificação

Após atualizar, teste se as APIs funcionam:
1. Acesse: `https://seu-frontend.netlify.app/admin`
2. Tente fazer login
3. Verifique se dados carregam

## 🔧 Como Funciona

O sistema detecta automaticamente:
- **Desenvolvimento**: Usa URLs relativas (localhost:5000)
- **Produção**: Usa sua URL do Vercel

### Arquivo Atualizado: `client/src/lib/queryClient.ts`
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? '' : 'https://your-project.vercel.app');
```

## 🚨 Importante

Substitua `https://your-project.vercel.app` pela URL real do seu deployment no Vercel.

## 📋 Exemplo Completo

Se sua URL do Vercel for: `https://cuca-beer-api.vercel.app`

Configure no Netlify:
```
VITE_API_URL=https://cuca-beer-api.vercel.app
```

Pronto! O frontend se conectará automaticamente ao seu backend.