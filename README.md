// generate readme the this project
# API Node TypeScript Prisma
This is a Node.js API project written in TypeScript. It provides a RESTful API for managing resources.
## Features
- TypeScript for type safety
- Express.js for building the API
- MYSQL for the database
- ESLint for linting
- Prettier for code formatting
- dotenv for environment variable management
- CORS for cross-origin resource sharing
- Compression
- Validation
- Error handling
- Prisma for ORM



## Getting Started
### Prerequisites
- Node.js
- npm or yarn
- MySQL
- Postman or any API testing tool
- Elasticsearch (optional)
- Elasticsearch (optional)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/franklinpaulino04/api-node-ts-prisma.git
    cd api-node-ts-prisma
    ```
2. Install dependencies:
3. ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```bash
    DATABASE_URL="mysql://root:password@localhost:3306/api_node_ts?schema=public"
    JWT_SECRET="your_jwt_secret"
    PORT="3000"
    ```
5. Create a MySQL database and update the `.env` file with your database credentials.
6. Si no existe la base de datos, Prisma puede crearla:
   ```bash
   npx prisma db push
   ```
7. con migración:
   ```bash
    npx prisma migrate dev --name init
    ```
8. Genera el cliente Prisma:
    ```bash
    npx prisma generate
    ```
9. Valida el esquema de Prisma:
   ```bash
    npx prisma generate
    ```
   
10. Explora la base de datos:
   ```bash
    npx prisma studio
    ```
   
   This will create the necessary tables in your MySQL database.
7. Run the migrations to create the necessary tables:
   ```bash
   npm run migration:generate
   ```

7. ```bash
   npm run dev
   ```
8. The API will be running at `http://localhost:3000`.
9. You can use Postman or any API testing tool to test the API endpoints.