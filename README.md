# KRYPTONEST API
Kryptonest RESTful API Server

## Installation

setup your `.env`
```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
SWAGGER_PORT=3000
JWT_SECRET_KEY=123456
```

Install & run
```bash
npm install

npx prisma generate
npx prisma migrate dev --name <name>

npm run dev


# ======== Reset ========
npx prisma migrate reset
npx prisma migrate dev --name <name>
```

