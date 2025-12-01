# DB Prisma Database

这是一个集中化的数据库管理文件夹，包含 Prisma schema 和相关配置。

## 使用说明

### 安装依赖

```bash
cd db
pnpm install
```

### 环境变量配置

复制 `.env.example` 并重命名为 `.env`，然后填入你的数据库连接信息：

```bash
cp .env.example .env
```

### 常用命令

生成 Prisma Client:

```bash
pnpm db:generate
```

创建迁移:

```bash
pnpm db:migrate
```

推送 schema 到数据库（开发环境）:

```bash
pnpm db:push
```

打开 Prisma Studio:

```bash
pnpm db:studio
```

## 在其他项目中使用

### Admin 项目

在 `admin/package.json` 中添加：

```json
{
  "scripts": {
    "db:generate": "cd ../db && pnpm db:generate"
  }
}
```

### Client 项目

在 `client/package.json` 中添加：

```json
{
  "scripts": {
    "db:generate": "cd ../db && pnpm db:generate"
  }
}
```

## Prisma Client 导入

在 admin 和 client 项目中，从 db 文件夹导入 Prisma Client：

```typescript
import { PrismaClient } from "../../db/node_modules/@prisma/client";
```

或者创建一个 `lib/prisma.ts` 文件：

```typescript
import { PrismaClient } from "../../db/node_modules/@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```
