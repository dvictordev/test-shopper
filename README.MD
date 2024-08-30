### test-shopper

## Descrição

Aplicação desenvolvida como um teste técnico para a vaga de Desenvolvedor Full-Stack Júnior.
Este é um projeto Node.js que utiliza Fastify como framework web, Prisma como ORM e `zod` para validação de esquemas.
O projeto também faz uso do Vitest para testes.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão 18.x ou superior)
- Docker

## Instalação

1. Clone este repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd test-shopper
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias, incluindo `GEMINI_API_KEY`.

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

## Uso

### Ambiente de Desenvolvimento

Para rodar o projeto em modo de desenvolvimento, utilize o comando:

```bash
npm run dev
```

Este comando iniciará o servidor usando `tsx` e monitorará as mudanças nos arquivos para recarregar automaticamente.

### Testes

Para rodar os testes, utilize um dos comandos a seguir:

- Rodar todos os testes uma vez:

  ```bash
  npm run test
  ```

- Rodar os testes em modo "watch":

  ```bash
  npm run test:w
  ```

### Migrações do Prisma

Se você estiver utilizando o Prisma para gerenciar o banco de dados, execute as migrações antes de iniciar o servidor:

```bash
npx prisma migrate dev
```

### Executar no Docker

Se preferir rodar o projeto em um container Docker, utilize o `docker-compose` para configurar o ambiente:

1. Construa e inicie os containers:

   ```bash
   docker-compose up --build
   ```

Esse comando ira subir os container e automaticamente rodar as migrations e subir o servidor.

## Estrutura do Projeto

- `src/` - Contém o código-fonte do projeto.
- `src/server.ts` - Ponto de entrada principal para o servidor.
- `src/use-cases/` - Contém os casos de uso e a lógica de negócio.
- `prisma/` - Contém os arquivos de esquema e migrações do Prisma.
- `tmp/` - Diretório temporário onde arquivos são criados e removidos automaticamente após 2 minutos.
