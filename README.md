# API Gateway com NestJS

Projeto de estudo de System Design utilizando NestJS com o objetivo de implementar uma API Gateway responsável por autenticação, roteamento de requisições e observabilidade básica.

### Objetivos do projeto

O principal objetivo deste projeto foi compreender alguns dos principais conceitos utilizados em arquiteturas modernas baseadas em microsserviços:

- API Gateway;
- Reverse proxy;
- Autenticação JWT;
- Roteamento dinâmico entre serviços;
- Logging de requisições;
- Comunicação de serviços via HTTP.

### Responsabilidades do Gateway

- Receber todas as requisições dos clientes
- Encaminhar requisições para os serviços corretos
- Validar tokens JWT
- Permitir acesso a rotas públicas
- Registrar logs de execução
- Padronizar respostas de erro

### Responsabilidades do Auth Service

- Realizar autenticação
- Gerar tokens JWT
- Gerenciar regras de login

### Responsabilidades do User Service

- Exemplo de microsserviço de domínio
- Disponibiliza recursos protegidos por autenticação

### Variáveis de ambiente

Crie um arquivo `.env` dentro de `gateway` e `auth-service` e configure com base no respectivo arquivo `.env.example`.

### Como rodar o projeto

Como este projeto é composto por múltiplos serviços, você precisará inicializar cada um deles para que o ecossistema funcione corretamente. Siga os passos abaixo:

#### 1. Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado na sua máquina (recomendado versão 22 ou superior) e um gerenciador de pacotes (npm, yarn ou pnpm).

#### 2. Instalação das dependências

Você precisa instalar as dependências de cada um dos 3 serviços. Entre na pasta de cada projeto e execute o comando de instalação:

```bash
# Instalando no Gateway
cd gateway && npm install && cd ..

# Instalando no Auth Service
cd auth-service && npm install && cd ..

# Instalando no User Service
cd user-service && npm install && cd ..
```

#### 3. Configuração do ambiente

Antes de rodar, certifique-se de ter configurado os arquivos .env corretamente dentro da pasta gateway e auth-service.

#### 4. Inicializando os serviços

Para rodar o ecossistema completo, abra terminais separados para cada serviço e execute o comando de inicialização em cada um deles:

```bash
# No terminal do Gateway:
cd gateway && npm run start:dev

# No terminal do Auth Service:
cd auth-service && npm run start:dev

# No terminal do User Service:
cd user-service && npm run start:dev
```

Uma vez que todos os serviços estejam de pé, o Gateway estará pronto para receber as requisições e roteá-las dinamicamente!
