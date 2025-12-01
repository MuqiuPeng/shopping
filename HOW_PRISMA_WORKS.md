# Admin 项目如何读取 Prisma 数据库 - 详细说明

## 🔍 问题
你在 admin 中没有看到 `prisma/` 文件夹，那么 admin 是如何读取数据库的？

## ✅ 答案：通过 node_modules 中的 @prisma/client

让我们追踪整个链条：

## 📦 当前状态（问题所在）

### 1. Admin 项目中的导入
文件：`admin/src/lib/prisma.ts`
```typescript
import { PrismaClient } from '@prisma/client';  // ❌ 这里导入的是 admin 本地的
```

### 2. 这个导入实际上指向哪里？
```
admin/src/lib/prisma.ts
  ↓ import '@prisma/client'
  ↓
admin/node_modules/@prisma/client  (符号链接)
  ↓
admin/node_modules/.pnpm/@prisma+client@6.19.0.../node_modules/@prisma/client
  ↓
admin/node_modules/.pnpm/.../node_modules/.prisma/client/
  └── 这里有生成的 schema.prisma 和类型文件
```

### 3. 问题：Admin 有自己独立的 Prisma Client

**当前情况**：
- ✅ `db/` 文件夹有 Prisma Client（从 db/prisma/schema.prisma 生成）
- ✅ `admin/` 文件夹**也有**自己的 Prisma Client（从 admin 本地生成）
- ❌ 它们是**两个独立的** Prisma Client！

## 🔧 为什么测试脚本能工作？

看看 `admin/test-db.ts` 的导入：
```typescript
import { PrismaClient } from '../db/node_modules/@prisma/client';
```

这个直接指向了 `db` 文件夹的 Prisma Client，所以能正常工作。

## 🎯 正确的配置方案

有两种方案：

### 方案 1：让 Admin 直接使用 db 的 Prisma Client（推荐）

修改 `admin/src/lib/prisma.ts`：
```typescript
// 从中心数据库导入 PrismaClient
import { PrismaClient } from '../../../db/node_modules/@prisma/client';
```

**优点**：
- ✅ 完全中心化管理
- ✅ 只有一个 Prisma Client
- ✅ schema 更改只需在 db 文件夹操作

**缺点**：
- ❌ 路径看起来有点长
- ❌ TypeScript 可能需要额外配置

### 方案 2：在 Admin 中保留 prisma 文件夹但指向 db（软链接）

```bash
# 删除 admin 的本地 prisma（如果存在）
rm -rf admin/prisma

# 创建符号链接指向 db 的 prisma
cd admin
ln -s ../db/prisma prisma
```

然后保持原来的导入：
```typescript
import { PrismaClient } from '@prisma/client';
```

**优点**：
- ✅ 代码看起来更简洁
- ✅ 不需要改变导入路径
- ✅ TypeScript 支持更好

**缺点**：
- ❌ 需要创建符号链接
- ❌ 在某些系统上符号链接可能有问题

## 📊 当前实际运行的是什么？

让我检查一下：

```bash
# Admin 的 package.json 中有：
"@prisma/client": "^6.19.0"
"prisma": "^6.19.0"

# 这意味着 admin 有自己的 Prisma 依赖
```

## 🚀 推荐方案

**最佳实践**：修改 admin 的 prisma.ts 直接从 db 导入

这样做的好处：
1. 明确表示使用中心数据库
2. 避免版本不一致
3. 只需要维护一个 schema

## 📝 需要修改的文件

只需要修改一个文件：`admin/src/lib/prisma.ts`

从：
```typescript
import { PrismaClient } from '@prisma/client';
```

改为：
```typescript
import { PrismaClient } from '../../../db/node_modules/@prisma/client';
```

**或者**创建一个 TypeScript path alias 让导入更简洁。
