# Guia de Deployment - CUCA Beer Landing Page

## Configuração da Comunicação Netlify ↔ Vercel

### 1. Deploy no Vercel (Backend API)

1. Faça upload do projeto para um repositório GitHub
2. Conecte o repositório ao Vercel
3. Configure as variáveis de ambiente no Vercel:
   - `DATABASE_URL`: URL da sua base de dados PostgreSQL
4. O Vercel irá automaticamente detectar as funções na pasta `/api/`

### 2. Deploy no Netlify (Frontend)

1. Conecte o mesmo repositório ao Netlify
2. Configure as seguintes variáveis de ambiente no Netlify:
   - `VITE_API_URL`: URL do seu projeto no Vercel (ex: https://cuca-beer.vercel.app)
3. O build command está configurado em `netlify.toml`: `npm run build`
4. O publish directory está configurado: `dist`

### 3. Configurações Importantes

#### No vercel.json:
- CORS está configurado para permitir requests do Netlify
- Headers de segurança estão definidos
- Timeouts estão otimizados

#### No netlify.toml:
- Redirects estão configurados para SPA
- Headers de segurança estão definidos
- Build environment está configurado

### 4. Endpoints da API Disponíveis

Todos os endpoints estão na pasta `/api/`:

- `GET /api/index` - Teste da API
- `GET /api/auth/user` - Autenticação do usuário
- `GET|POST /api/products` - Gestão de produtos
- `GET|POST /api/contact` - Mensagens de contacto
- `GET|POST|PUT|DELETE /api/fan-photos` - Galeria de fãs

### 5. Base de Dados

A aplicação usa PostgreSQL com Drizzle ORM. Certifique-se de:
- Configurar `DATABASE_URL` no Vercel
- Executar `npm run db:push` após mudanças no schema

### 6. Testing da Comunicação

Após o deployment:
1. Acesse o frontend no Netlify
2. Abra as ferramentas de desenvolvimento
3. Verifique se as chamadas para a API do Vercel funcionam sem erros CORS

### 7. Troubleshooting

Se encontrar problemas de CORS:
1. Verifique se o domínio do Netlify está na lista de origens permitidas
2. Confirme que `VITE_API_URL` está definido corretamente no Netlify
3. Verifique os headers nas responses da API

### 8. Domínios Permitidos

A configuração atual permite requests de:
- https://cucatest.netlify.app
- https://cuca.netlify.app
- https://incomparable-tartufo-db7f34.netlify.app
- localhost (desenvolvimento)

Para adicionar novos domínios, atualize a lista `allowedOrigins` em cada endpoint da API.