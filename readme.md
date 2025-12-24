# 🚀 Desafio Técnico Backend - Gestão de Pedidos Laboratoriais

Este projeto é uma API REST para gestão de pedidos laboratoriais, desenvolvida como parte de um desafio técnico para avaliar organização de código, domínio de TypeScript e regras de negócio.

## 🛠️ Tecnologias e Ferramentas

- **Runtime:** Node.js
- **Framework:** Express
- **Linguagem:** TypeScript
- **Banco de Dados:** MongoDB (via Mongoose)
- **Validação de Dados:** Zod
- **Autenticação:** JWT (JSON Web Token)
- **Criptografia:** BcryptJS (Hash de senhas)
- **Testes:** Vitest (Diferencial)

## 🏗️ Arquitetura e Padrões (SOLID)

A aplicação foi construída seguindo princípios de **Clean Architecture** e **SOLID** para garantir escalabilidade:

- **Repository Pattern:** Desacoplamento da camada de dados (Mongoose) da lógica de negócio.
- **Service Layer:** Centralização das regras de negócio (cálculo de valores e máquina de estados).
- **Dependency Inversion (DIP):** Injeção de repositórios nos serviços através de interfaces.
- **Single Responsibility (SRP):** Cada serviço ou controlador possui uma única responsabilidade clara.

## 📋 Requisitos Implementados

### Etapa 1: Essencial (Obrigatório)

- [x] Registro e Login de usuários retornando JWT.
- [x] Middleware de proteção para rotas de pedidos.
- [x] Criação de pedidos com estados iniciais padronizados (`CREATED` e `ACTIVE`).
- [x] Listagem de pedidos com paginação e filtro por `state`.

### Etapa 2: Diferencial (Regras e Qualidade)

- [x] **Validação de Negócio:** Bloqueio de criação de pedidos sem serviços ou com valor total zerado.
- [x] **Fluxo de Status:** Transição estrita (`CREATED` -> `ANALYSIS` -> `COMPLETED`) via endpoint `PATCH /orders/:id/advance`.
- [x] **Segurança:** Uso de DTOs e Projeções para nunca expor senhas no retorno das APIs.
- [x] **Testes Unitários:** Garantia de integridade da lógica de transição de estados.

## ⚙️ Como Configurar no Ambiente Local

### 1. Clonar o repositório

```bash
git clone <url-do-seu-repositorio>
cd desafio-tecnico-backend
```

### 2. Configurar Variáveis de Ambiente

```bash
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/desafio_db
JWT_SECRET=a-string-secret-at-least-256-bits-lon
```

### 3. Instalar dependências e rodar

```bash
npm install
npm run dev
```
