npm i -D prisma
npm i @prisma/client

create db.ts exporting PrismaClient()

npx prisma init

create neon.tech postgres db (select prisma), update prisma/schema.prisma and .env

add model in schema.prisma
-> authjs.dev -> db adapter -> prisma
-> copy models

npx prisma generate
npx prisma db push

authjs.dev -> db adapter -> prisma
npm i @auth/prisma-adapter

authjs.dev -> guides -> upgrade to v5
npm i next-auth@beta
copy auth.ts, route.ts from docs
add auth_secret in env
visit /api/auth/providers
copy middleware.ts

clerk.com -> next js -> auth middleware -> copy matcher for middleware
