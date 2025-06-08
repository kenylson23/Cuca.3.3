# 🔧 Correção do Problema de Login

## ❌ Problema Identificado
O erro "Unexpected token 'o', '<DOCTYPE !' is not valid JSON" ocorre porque o frontend no Netlify está tentando se comunicar com o servidor local em vez do backend no Vercel.

## ✅ Correções Implementadas

### 1. Configuração de API
- Atualizado `client/src/lib/queryClient.ts` para usar `apiRequest()`
- Configurado fallback para URL do Vercel em produção
- Login e registro agora usam a função centralizada de API

### 2. Configuração de CORS
- Adicionado suporte para credenciais (`credentials: 'include'`)
- Configurado CORS no `api/index.ts` para aceitar requests do Netlify
- Headers apropriados para cookies de sessão

### 3. Configuração de Sessões
- Cookies configurados para produção (`secure: true`, `sameSite: 'none'`)
- Suporte para comunicação cross-origin entre Netlify e Vercel

### 4. Arquivos de Deploy
- `vercel.json`: Configurações de CORS e headers
- `netlify.toml`: Configurações de build e redirects

## 🚀 Como Resolver Definitivamente

### Passo 1: Deploy do Backend
1. Faça deploy no Vercel
2. Anote a URL gerada (ex: `https://seu-projeto.vercel.app`)

### Passo 2: Configurar Frontend
Execute o script de configuração:
```bash
node scripts/setup-production.js https://sua-url-vercel.vercel.app https://sua-url-netlify.netlify.app
```

### Passo 3: Variáveis de Ambiente
**No Vercel:**
- `DATABASE_URL=sua_url_postgresql`
- `SESSION_SECRET=cuca-admin-secret-key-2024`
- `NODE_ENV=production`

**No Netlify:**
- `VITE_API_URL=https://sua-url-vercel.vercel.app`

### Passo 4: Testar
Credenciais: `admin` / `cuca2024`

## 📝 Arquivos Modificados
- `client/src/lib/queryClient.ts`
- `client/src/pages/login.tsx`
- `api/index.ts`
- `server/simpleAuth.ts`
- `vercel.json`
- `netlify.toml`

O login funcionará corretamente após estas configurações estarem em produção.