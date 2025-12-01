# 数据库迁移完成指南

## 迁移已完成 ✅

你的项目已经成功迁移到中心化数据库管理模式。现在所有的数据库配置都在 `db` 文件夹中统一管理。

## 项目结构

```
bracelet-shopping/
├── db/                          # 中心数据库文件夹 🆕
│   ├── prisma/
│   │   ├── schema.prisma        # 统一的 Prisma schema
│   │   └── seed.ts              # 数据库种子文件
│   ├── package.json             # Prisma 依赖
│   ├── .env                     # 数据库连接配置 (需要创建)
│   └── README.md                # 使用说明
├── admin/                       # Admin 项目
│   └── src/lib/prisma.ts        # 已更新，从 db 导入
└── client/                      # Client 项目
    └── lib/prisma.ts            # 已更新，从 db 导入
```

## 下一步操作

### 1. 设置环境变量

在 `db` 文件夹中创建 `.env` 文件：

```bash
cd db
cp .env.example .env
```

然后编辑 `.env` 文件，填入你的数据库连接信息：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/bracelet_shopping"
```

### 2. 运行数据库迁移

如果你已有数据库迁移文件，需要将它们移动到 `db/prisma/migrations` 文件夹：

```bash
# 如果 admin 有迁移文件
mv admin/prisma/migrations db/prisma/

# 然后在 db 文件夹运行
cd db
pnpm db:migrate
```

如果是新数据库，直接推送 schema：

```bash
cd db
pnpm db:push
```

### 3. 生成 Prisma Client

```bash
cd db
pnpm db:generate
```

### 4. 可选：运行种子数据

```bash
cd db
pnpm db:seed
```

### 5. 测试 Admin 项目

```bash
cd admin
pnpm install  # 会自动运行 postinstall 生成 Prisma Client
pnpm dev
```

### 6. 测试 Client 项目

```bash
cd client
pnpm install  # 会自动运行 postinstall 生成 Prisma Client
pnpm dev
```

## 常用命令

### 在 db 文件夹中：

```bash
pnpm db:generate      # 生成 Prisma Client
pnpm db:migrate       # 创建新的迁移
pnpm db:push          # 推送 schema 到数据库（开发环境）
pnpm db:studio        # 打开 Prisma Studio
pnpm db:seed          # 运行种子数据
```

### 在 admin 或 client 文件夹中：

```bash
pnpm db:generate      # 生成 Prisma Client（调用 db 文件夹）
pnpm db:migrate       # 运行迁移（调用 db 文件夹）
pnpm db:studio        # 打开 Prisma Studio（调用 db 文件夹）
```

## 清理旧文件（可选）

迁移完成后，你可以删除以下文件：

```bash
# Admin 项目
rm -rf admin/prisma/schema.prisma
rm -rf admin/prisma/migrations  # 如果已移动到 db

# Client 项目
rm -rf client/prisma/schema.prisma
```

⚠️ **注意**：删除前请确保：

1. db 文件夹中的 schema.prisma 已正确配置
2. 迁移文件已复制到 db/prisma/migrations
3. 所有项目都能正常运行

## 工作流程

### 修改数据库 Schema

1. 编辑 `db/prisma/schema.prisma`
2. 在 db 文件夹运行迁移：
   ```bash
   cd db
   pnpm db:migrate
   ```
3. Admin 和 Client 项目会自动使用新的 schema

### 开发新功能

1. 确保 db 的 Prisma Client 是最新的：
   ```bash
   cd db && pnpm db:generate
   ```
2. 在 admin 或 client 项目中正常开发：
   ```typescript
   import { db } from "@/lib/prisma"; // Admin
   import { db } from "@/lib/prisma"; // Client
   ```

## 故障排查

### 问题：找不到 Prisma Client

**解决方案**：

```bash
cd db
pnpm db:generate
```

### 问题：Admin 或 Client 项目无法连接数据库

**解决方案**：

1. 确保 `db/.env` 文件存在且配置正确
2. 重新生成 Prisma Client：
   ```bash
   cd db && pnpm db:generate
   ```

### 问题：类型错误

**解决方案**：
删除 node_modules 并重新安装：

```bash
cd admin && rm -rf node_modules && pnpm install
cd client && rm -rf node_modules && pnpm install
```

## 优势

✅ 单一数据源：只需在一个地方管理 schema
✅ 避免不一致：admin 和 client 使用完全相同的数据库结构
✅ 简化维护：数据库迁移只需在一个地方运行
✅ 更好的组织：清晰的项目结构

---

如有问题，请参考 `db/README.md` 或联系开发团队。
