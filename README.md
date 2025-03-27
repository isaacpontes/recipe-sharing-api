# Recipe Sharing API 🍳

A full-stack application built with **TypeScript**, **Express**, and **Prisma**. This project allows users to manage recipes, share comments, organize content by categories, and mark recipes as favorites.

## 🚀 Features

- **User Authentication:** Secure login and registration with **JWT** (JSON Web Tokens).
- **Recipes:** Create, update, delete, and view recipes with detailed instructions and ingredients.
- **Comments:** Users can add and manage comments on recipes.
- **Favorites:** Save favorite recipes for easy access.
- **Categories:** Organize recipes by custom categories.

## 💻 Technologies Used

- **Backend Framework:** [Express.js](https://expressjs.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://postgresql.org/)
- **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/)
- **Environment Variables:** [dotenv](https://www.npmjs.com/package/dotenv)

## 🛠️ Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/projeto-final.git
cd projeto-final
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add the following:
```bash
DATABASE_URL="your-database-url"
```

### 4. Run the application locally

#### Development Mode (with auto-reloading)
```bash
npm run dev
```

#### Build and Production Mode
```bash
npm run build
npm start
```

### 5. Run Migrations
To set up the database schema, run the following Prisma migration:
```bash
npx prisma migrate dev
```

## 📁 Project Structure

```bash
├── .gitignore                  # Git ignore file
├── package-lock.json            # Dependency lock file
├── package.json                 # Project dependencies and scripts
├── prisma
│   ├── migrations               # Database migrations
│   ├── schema.prisma            # Prisma schema for the database
├── src
│   ├── __types__                # Custom TypeScript types
│   ├── config                   # Environment configuration
│   ├── controllers              # Route controllers (Auth, Categories, Recipes, etc.)
│   ├── database                 # Database connection setup
│   ├── errors                   # Error handling
│   ├── middlewares              # Authentication and other middleware
│   ├── services                 # Business logic for handling requests
│   ├── server.ts                # Server entry point
└── tsconfig.json                # TypeScript configuration
```

## 📦 Scripts

- `npm run dev` - Start the app in development mode with live reload.
- `npm run build` - Compile TypeScript code into JavaScript.
- `npm start` - Start the app in production mode.
- `npx prisma migrate dev` - Apply database migrations.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues, bug reports, or pull requests for any enhancements, fixes, or suggestions.
