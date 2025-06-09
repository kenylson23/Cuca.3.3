# Setup Completo: CUCA Beer - Netlify + Vercel

## Passo 1: Deploy no Vercel (Backend)

1. **Conectar repositório ao Vercel:**
   - Acesse vercel.com
   - Importe seu repositório GitHub
   - Configure as variáveis de ambiente:
     - `DATABASE_URL`: sua URL do PostgreSQL

2. **Depois do deploy, anote a URL do Vercel:**
   - Exemplo: `https://cuca-beer.vercel.app`

## Passo 2: Deploy no Netlify (Frontend)

1. **Conectar repositório ao Netlify:**
   - Acesse netlify.com
   - Conecte o mesmo repositório
   
2. **Configurar variáveis de ambiente no Netlify:**
   - `VITE_API_URL`: [URL_DO_VERCEL]
   - Exemplo: `https://cuca-beer.vercel.app`

3. **Build automático:**
   - O Netlify usará as configurações do `netlify.toml`
   - Build command: `npm run build`
   - Publish directory: `dist`

## Passo 3: Atualizar CORS (Importante!)

Depois de obter a URL do Netlify, atualize os arquivos da API:

1. **Edite cada arquivo em `/api/`:**
   - `api/index.ts`
   - `api/auth/user.ts`
   - `api/test.ts`
   - `api/products.ts`
   - `api/contact.ts`
   - `api/fan-photos.ts`

2. **Adicione sua URL do Netlify na lista allowedOrigins:**
```javascript
const allowedOrigins = [
  'https://cucatest.netlify.app',
  'https://cuca.netlify.app',
  'https://SEU-DOMINIO-AQUI.netlify.app', // <- Adicione aqui
  'http://localhost:5173',
  'http://localhost:5000'
];
```

## Passo 4: Teste da Comunicação

1. **Acesse seu site no Netlify**
2. **Abra as ferramentas de desenvolvimento (F12)**
3. **Vá para Console e execute:**
```javascript
fetch('https://SEU-VERCEL.vercel.app/api/test')
  .then(res => res.json())
  .then(data => console.log(data))
```

Se funcionar, verá: "API da CUCA funcionando perfeitamente!"

## Estrutura Final

```
Frontend (Netlify) ← → Backend API (Vercel) ← → Database (PostgreSQL)
```

## Endpoints Disponíveis

- `GET /api/test` - Teste básico
- `GET /api/index` - Status da API  
- `GET /api/auth/user` - Autenticação
- `GET|POST /api/products` - Produtos
- `GET|POST /api/contact` - Contactos
- `GET|POST|PUT|DELETE /api/fan-photos` - Galeria

## Resolução de Problemas

**Erro CORS:**
- Verifique se a URL do Netlify está na lista allowedOrigins
- Confirme que VITE_API_URL está definido no Netlify

**Erro 404:**
- Verifique se o build do Vercel incluiu os arquivos da pasta `/api/`
- Confirme que os endpoints existem no Vercel

**Erro de Base de Dados:**
- Verifique se DATABASE_URL está definido no Vercel
- Execute `npm run db:push` localmente para sincronizar o schema