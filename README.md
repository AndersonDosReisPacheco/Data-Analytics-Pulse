


https://github.com/user-attachments/assets/6bbd581c-2fe9-41e6-8319-32b6cfd015ac



# 📊 DataPulse Analytics

🚀 **DataPulse Analytics** é uma plataforma web moderna de análise de dados, desenvolvida com **arquitetura full stack profissional**, autenticação segura, dashboard interativo e integração completa entre **Frontend (Vercel)**, **Backend (Render)** e **PostgreSQL (Prisma ORM)**.

Projeto criado com foco em **boas práticas de mercado**, escalabilidade, clareza de código e experiência do usuário.

---

## 🔗 Demo Online

- 🌐 **Frontend (Vercel)**:  
  https://data-analytics-pulse.vercel.app

- ⚙️ **Backend API (Render)**:  
  https://data-analytics-pulse.onrender.com

---

## 🧩 Visão Geral da Arquitetura

Frontend (React + Vite)
|
| HTTP / REST (Axios)
|
Backend (Node.js + Express)
|
| Prisma ORM
|
PostgreSQL (Cloud)

markdown
Copiar código

---

## 🛠️ Tecnologias Utilizadas

### 🔹 Frontend
- **React 18**
- **Vite**
- **Zustand** (Gerenciamento de estado)
- **Axios** (HTTP Client)
- **React Router DOM**
- **CSS moderno**
- **Deploy: Vercel**

### 🔹 Backend
- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**
- **CORS configurado corretamente**
- **Deploy: Render**

---

## 🔐 Autenticação e Segurança

- Login e cadastro com **JWT**
- Token armazenado no `localStorage`
- Interceptor Axios para envio automático do token
- Proteção de rotas
- Logout automático em token inválido ou expirado

---

## 🌍 Variáveis de Ambiente

### Frontend (Vercel)
```
VITE_API_BASE_URL=https://data-analytics-pulse.onrender.com


Backend (Render)


```
*.env*

````
DATABASE_URL=postgresql://user:password@host:port/db
JWT_SECRET=sua_chave_secreta
NODE_ENV=production
CLIENT_URL=https://data-analytics-pulse.vercel.app


📦 Rotas da API

🔑 Auth

Método	Rota	Descrição
POST	/api/auth/register	Cadastro de usuário
POST	/api/auth/login	Login
GET	/api/auth/me	Usuário autenticado

📊 Analytics
Método	Rota	Descrição
GET	/api/analytics	Listar métricas
POST	/api/analytics	Criar nova métrica


🩺 Health
Método	Rota
GET	/api/health

🧠 Funcionalidades
✅ Cadastro e login de usuários

✅ Dashboard de métricas

✅ Dados reais + fallback automático com dados de exemplo

✅ Adição dinâmica de métricas

✅ Persistência local mesmo sem API

✅ Sistema resiliente a falhas

✅ UX estável (sem tela branca)

✅ Recarregamento da página sem erro 404 (SPA configurada)

Build automático pelo Vercel

SPA corretamente configurada

Variáveis de ambiente isoladas

Backend
Deploy no Render

Porta dinâmica

Reconexão automática

Prisma Client gerado em build

🧪 Testes Manuais Realizados
Login / Cadastro

Refresh da página (F5)

Requisições autenticadas

Falha de API (fallback ativo)

Conexão com banco

Cold start do Render

📈 Próximos Passos (Roadmap)
🔄 Refresh token

📊 Gráficos com Recharts

👥 Perfis de usuário

📁 Exportação CSV / PDF

🧪 Testes automatizados

🔐 RBAC (roles)

👨‍💻 Autor
Anderson Pacheco
Desenvolvedor Full Stack
Apaixonado por tecnologia, arquitetura limpa e projetos bem feitos.

🔗 LinkedIn: (https://www.linkedin.com/in/anderson-pacheco-dev/)
📂 GitHub: https://github.com/AndersonDosReisPacheco


