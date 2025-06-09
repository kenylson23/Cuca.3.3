#!/usr/bin/env node

/**
 * Script para configurar automaticamente a comunicação entre Netlify e Vercel
 * Execute: node scripts/setup-production.js <URL_DO_VERCEL> <URL_DO_NETLIFY>
 * 
 * Este script:
 * 1. Configura CORS nos endpoints da API do Vercel
 * 2. Atualiza a URL da API no frontend
 * 3. Configura variáveis de ambiente
 */

const fs = require('fs');
const path = require('path');

function updateVercelConfig(netlifyUrl) {
  const vercelConfigPath = path.join(__dirname, '..', 'vercel.json');
  
  const config = {
    functions: {
      "api/index.ts": {
        maxDuration: 10
      }
    },
    headers: [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          },
          {
            key: "Access-Control-Allow-Origin",
            value: netlifyUrl
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Cookie, Set-Cookie"
          }
        ]
      }
    ]
  };
  
  fs.writeFileSync(vercelConfigPath, JSON.stringify(config, null, 2));
  console.log(`✅ vercel.json atualizado com URL do Netlify: ${netlifyUrl}`);
}

function updateApiConfig(vercelUrl) {
  const queryClientPath = path.join(__dirname, '..', 'client', 'src', 'lib', 'queryClient.ts');
  
  let content = fs.readFileSync(queryClientPath, 'utf8');
  
  // Atualizar a URL do backend
  content = content.replace(
    /const API_BASE_URL = .+/,
    `const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? '' : '${vercelUrl}');`
  );
  
  fs.writeFileSync(queryClientPath, content);
  console.log(`✅ queryClient.ts atualizado com URL do Vercel: ${vercelUrl}`);
}

function updateCorsConfig(netlifyUrl) {
  const apiIndexPath = path.join(__dirname, '..', 'api', 'index.ts');
  
  let content = fs.readFileSync(apiIndexPath, 'utf8');
  
  // Atualizar as URLs permitidas
  const allowedOrigins = [
    netlifyUrl,
    'http://localhost:5173',
    'http://localhost:5000'
  ];
  
  const newOrigins = allowedOrigins.map(url => `      '${url}'`).join(',\n');
  
  content = content.replace(
    /const allowedOrigins = \[[\s\S]*?\];/,
    `const allowedOrigins = [
${newOrigins}
    ];`
  );
  
  fs.writeFileSync(apiIndexPath, content);
  console.log(`✅ api/index.ts atualizado com CORS para: ${netlifyUrl}`);
}

function generateEnvInstructions(vercelUrl, netlifyUrl) {
  const instructions = `
📋 INSTRUÇÕES DE CONFIGURAÇÃO

1️⃣ Variáveis de Ambiente - VERCEL:
   DATABASE_URL=sua_url_do_postgresql
   SESSION_SECRET=cuca-admin-secret-key-2024
   NODE_ENV=production

2️⃣ Variáveis de Ambiente - NETLIFY:
   VITE_API_URL=${vercelUrl}

3️⃣ Credenciais de Login:
   Usuário: admin
   Senha: cuca2024

4️⃣ Teste de Funcionamento:
   curl -X POST ${vercelUrl}/api/auth/login \\
     -H "Content-Type: application/json" \\
     -d '{"username":"admin","password":"cuca2024"}'

✅ Configuração concluída!
`;
  
  fs.writeFileSync(path.join(__dirname, '..', 'PRODUCTION_CONFIG.md'), instructions);
  console.log('✅ Instruções salvas em PRODUCTION_CONFIG.md');
}

// Executar configuração
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('❌ Uso: node scripts/setup-production.js <URL_DO_VERCEL> <URL_DO_NETLIFY>');
  console.error('   Exemplo: node scripts/setup-production.js https://meu-backend.vercel.app https://meu-site.netlify.app');
  process.exit(1);
}

const [vercelUrl, netlifyUrl] = args;

console.log('🚀 Configurando produção...');
updateVercelConfig(netlifyUrl);
updateApiConfig(vercelUrl);
updateCorsConfig(netlifyUrl);
generateEnvInstructions(vercelUrl, netlifyUrl);
console.log('✅ Configuração de produção concluída!');