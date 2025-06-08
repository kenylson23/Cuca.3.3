# 🚀 Guia de Deploy - Netlify + Vercel

## ⚠️ Problema Identificado
O erro "Unexpected token 'o', '<DOCTYPE !' is not valid JSON" indica que o frontend no Netlify está tentando se comunicar com o backend local em vez do Vercel.

## 🔧 Solução Passo a Passo

### 1️⃣ Deploy do Backend no Vercel

1. **Faça login no Vercel** e importe seu repositório
2. **Configure as variáveis de ambiente no Vercel**:
   ```
   DATABASE_URL=sua_url_do_postgres
   SESSION_SECRET=cuca-admin-secret-key-2024
   NODE_ENV=production
   ```
3. **Anote a URL do deploy** (ex: `https://seu-projeto-abc123.vercel.app`)

### 2️⃣ Configuração do Frontend no Netlify

1. **Adicione variável de ambiente no Netlify**:
   ```
   VITE_API_URL=https://sua-url-do-vercel.vercel.app
   ```
   ⚠️ **IMPORTANTE**: Substitua pela URL real do seu backend no Vercel

2. **Atualize as configurações de CORS no Vercel**:
   - Edite o arquivo `vercel.json` e adicione sua URL do Netlify
   - Exemplo: se seu site for `https://cuca.netlify.app`, atualize:
   ```json
   "value": "https://cuca.netlify.app"
   ```

### 3️⃣ Credenciais de Login
- **Usuário**: `admin`
- **Senha**: `cuca2024`

### 4️⃣ Verificação

1. **Teste o backend diretamente**:
   ```bash
   curl -X POST https://sua-url-vercel.vercel.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"cuca2024"}'
   ```

2. **Teste o frontend**: Acesse a página de login e tente fazer login

## 🔍 Problemas Comuns

### ❌ Erro: CORS
- Verifique se a URL do Netlify está em `vercel.json`
- Certifique-se de que `VITE_API_URL` está configurado no Netlify

### ❌ Erro: 404 no Vercel
- Verifique se o deploy foi feito corretamente
- Confirme que a URL está correta

### ❌ Erro: Cookies não funcionam
- Os cookies estão configurados para `sameSite: 'none'` em produção
- `secure: true` para HTTPS

## 📝 Checklist Final

- [ ] Backend deployado no Vercel
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] `VITE_API_URL` configurada no Netlify
- [ ] URL do Netlify adicionada ao CORS no `vercel.json`
- [ ] Teste de login funcionando

## 🆘 Se ainda não funcionar

1. Verifique os logs do Vercel
2. Verifique o console do navegador
3. Teste a API diretamente com curl
4. Confirme que as URLs estão corretas em ambos os serviços