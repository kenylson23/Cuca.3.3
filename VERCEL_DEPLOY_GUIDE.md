# 🚀 Guia de Deploy no Vercel - CUCA Beer Backend

## ✅ Arquivos Configurados

Todos os arquivos necessários foram criados para deployment no Vercel:

### 1. `vercel.json` - Configuração do Vercel
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.ts"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 2. `api/index.ts` - Entry Point Serverless
- Express app adaptado para Vercel
- CORS configurado
- Todas as rotas da API incluídas

## 🔧 Deploy no Vercel

### 1. Conectar Repositório
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub/GitLab
3. Clique em "New Project"
4. Importe este repositório

### 2. Configurar Variáveis de Ambiente
No painel do Vercel, adicione estas variáveis:

**Obrigatórias:**
- `DATABASE_URL` - URL do PostgreSQL
- `SESSION_SECRET` - String aleatória para sessões

**Exemplos de providers de PostgreSQL:**
- **Neon** (recomendado): postgresql://user:pass@host/db
- **Supabase**: postgresql://postgres:pass@host:5432/postgres
- **Railway**: postgresql://postgres:pass@host:port/railway

### 3. Deploy Automático
- Build command: Detectado automaticamente
- Output directory: Detectado automaticamente
- Clique em "Deploy"

## 🌐 Configuração do Frontend

Após deploy do backend, atualize o frontend (Netlify) com a URL do Vercel:

1. **URL do backend**: `https://seu-projeto.vercel.app`
2. **Atualize as chamadas da API** no frontend para usar esta URL

## 📡 Endpoints Disponíveis

### Autenticação
- `POST /api/auth/login` - Login de admin
- `POST /api/auth/logout` - Logout
- `GET /api/auth/user` - Dados do usuário logado

### Administração
- `GET /api/admin/stats` - Estatísticas do painel
- `GET /api/admin/products` - Lista de produtos
- `POST /api/admin/products` - Criar produto
- `PUT /api/admin/products/:id` - Atualizar produto
- `DELETE /api/admin/products/:id` - Deletar produto

### Clientes
- `GET /api/admin/customers` - Lista de clientes
- `POST /api/admin/customers` - Criar cliente
- `PUT /api/admin/customers/:id` - Atualizar cliente

### Pedidos
- `GET /api/admin/orders` - Lista de pedidos
- `POST /api/admin/orders` - Criar pedido
- `PUT /api/admin/orders/:id/status` - Atualizar status

### Contato
- `GET /api/admin/contact-messages` - Mensagens de contato
- `PUT /api/admin/contact-messages/:id` - Marcar como lida

### Galeria de Fãs
- `GET /api/fan-gallery` - Fotos aprovadas
- `POST /api/fan-gallery` - Enviar nova foto
- `GET /api/admin/fan-photos` - Todas as fotos (admin)
- `PUT /api/admin/fan-photos/:id/approve` - Aprovar foto
- `DELETE /api/admin/fan-photos/:id` - Deletar foto

## 🔒 Segurança

- CORS configurado para aceitar requisições do frontend
- Autenticação com sessões seguras
- Headers de segurança implementados
- Validação de dados com Zod

## 📊 Performance

- Serverless functions otimizadas
- Connection pooling para PostgreSQL
- Cache de queries implementado
- Timeout configurado (30s)

## 🐛 Debugging

### Logs do Vercel
- Acesse Functions → View Function Logs
- Monitore erros e performance
- Configure alertas se necessário

### Variáveis de Ambiente
Verifique se estão configuradas:
```bash
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-key
NODE_ENV=production
```

## 🔄 Atualizações

Para deploy de atualizações:
1. Faça push para o repositório
2. Vercel fará deploy automático
3. Monitore logs para verificar sucesso

---

**Backend pronto para produção com todas as funcionalidades da aplicação CUCA!**