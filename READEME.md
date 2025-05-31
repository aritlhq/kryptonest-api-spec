# KRYPTONEST API
Kryptonest RESTful API Server

## Installation

setup your `.env`
```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
SWAGGER_PORT=3000
JWT_SECRET_KEY=123456
```

```bash
npm install

npm prisma generate
npm prisma migrate dev

npm run dev
```

