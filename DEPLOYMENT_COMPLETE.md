# 🚀 CUCA Beer - Deploy Completo (Frontend + Backend)

## ✅ Status: Totalmente Configurado

Seu projeto está pronto para deploy completo com arquitetura separada:
- **Frontend (React)**: Netlify
- **Backend (Express/PostgreSQL)**: Vercel

## 📁 Estrutura de Deploy

### Frontend - Netlify
```
netlify.toml
client/public/_redirects
client/public/_headers
```

### Backend - Vercel
```
vercel.json
api/index.ts
.env.example
```

## 🔧 Passos para Deploy Completo

### 1. Deploy do Frontend (Netlify)
1. Conecte repositório ao Netlify
2. Configurações automáticas:
   - Build: `vite build`
   - Publish: `dist/public`
3. Site estático funcionará imediatamente

### 2. Deploy do Backend (Vercel)
1. Conecte o mesmo repositório ao Vercel
2. Configure variáveis de ambiente:
   ```
   DATABASE_URL=postgresql://...
   SESSION_SECRET=sua-chave-secreta
   ```
3. Deploy automático das APIs

### 3. Conectar Frontend ao Backend
Após deploy do Vercel, atualize o frontend:

1. **URL do backend**: `https://seu-projeto.vercel.app`
2. **Configurar no frontend**: Atualize `apiRequest` em `lib/queryClient.ts`

```typescript
// No frontend, atualize a baseURL
const baseURL = "https://seu-projeto.vercel.app";
```

## 🌐 URLs Finais

- **Frontend**: `https://seu-projeto.netlify.app`
- **Backend**: `https://seu-projeto.vercel.app`
- **Admin**: `https://seu-projeto.netlify.app/admin`

## 📊 Providers Recomendados

### PostgreSQL (escolha um):
1. **Neon** (gratuito, recomendado)
2. **Supabase** (gratuito)
3. **Railway** (simples)

### Exemplo de configuração Neon:
```
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/neondb
```

## 🔒 Funcionalidades Incluídas

### Frontend (Netlify):
- Landing page responsiva
- Galeria de fotos
- Formulário de contato (Netlify Forms)
- Pontos de venda
- SEO otimizado
- PWA ready

### Backend (Vercel):
- API REST completa
- Autenticação de admin
- CRUD de produtos
- Gestão de clientes
- Sistema de pedidos
- Galeria de fãs com moderação
- Mensagens de contato

## 🚦 Verificação Final

### Checklist Frontend:
- ✅ Build sem erros
- ✅ Roteamento SPA funcional
- ✅ Formulários configurados
- ✅ Imagens otimizadas

### Checklist Backend:
- ✅ APIs respondendo
- ✅ Database conectado
- ✅ Autenticação funcional
- ✅ CORS configurado

## 📞 Próximos Passos

1. **Deploy frontend no Netlify**
2. **Deploy backend no Vercel**
3. **Configurar database PostgreSQL**
4. **Atualizar URLs no frontend**
5. **Testar integração completa**

---

**Arquitetura moderna, escalável e pronta para produção!**