# Product List View 更新说明

## 更改概述

已将 `product-list-view.tsx` 从使用 mock 数据更新为使用真实数据库数据，通过 `useProductListData` hook。

## 主要功能

### ✅ 1. 真实数据集成

- 使用 `useProductListData` hook 从数据库获取产品
- 自动转换 Prisma 数据格式到 UI 组件所需格式
- 支持完整的产品信息（价格、库存、销量、变体等）

### ✅ 2. 分页功能

- 服务端分页（由 `getAllProducts` repository 方法提供）
- 支持自定义每页数量（10/20/50）
- 显示总页数和当前页
- 页码跳转功能

### ✅ 3. Loading 状态

- **首次加载**: 显示 "Loading products..." 加载提示
- **刷新数据**: 显示 "Refreshing products..." 刷新提示
- **1000ms 延迟**: 所有数据请求自动添加 1000ms 延迟（在 hook 内部实现）
- 使用 `Loader2` 旋转图标提供视觉反馈

### ✅ 4. 错误处理

- 捕获并显示错误信息
- 提供 "Try Again" 按钮重新加载
- 错误状态下隐藏产品列表

### ✅ 5. 筛选功能

- **状态筛选**: Active / Draft / Out of Stock
- **可见性筛选**: Published / Unpublished
- **搜索**: 产品名称、描述、slug 搜索
- 筛选条件变化时自动重置到第一页

## 数据转换映射

### Prisma 数据 → UI 组件数据

```typescript
{
  id: product.id,
  name: product.name,
  price: firstVariant.price,           // 第一个变体的价格
  stock: sum(variants.inventory),       // 所有变体库存总和
  status: computed,                     // 根据 product.status 和库存计算
  visibility: product.status映射,       // ACTIVE → published, 其他 → unpublished
  image: thumbnail || first_image,      // 缩略图优先
  variants: variants.length,            // 变体数量
  sales: product.salesCount,            // 销量
  updated: formatRelativeTime()         // 相对时间格式
}
```

### 状态转换逻辑

- `ProductStatus.DRAFT` → `status: 'draft'`
- `ProductStatus.ACTIVE` + 有库存 → `status: 'active'`
- `ProductStatus.ACTIVE` + 库存为0 → `status: 'out_of_stock'`

## 延迟实现

### Hook 层面延迟（推荐）✅

在 `useProductListData` 的 `fetchData` 函数中添加：

```typescript
await delay(1000);
const result = await getAllProducts({...});
```

优点：

- 所有数据加载自动包含延迟
- 不需要在每个调用点重复添加
- 统一的加载体验

### 组件层面延迟（备选）

在特定操作中添加延迟：

```typescript
const handleRefetch = async () => {
  await delay(1000);
  await refetch();
};
```

## 使用示例

```typescript
// 基础使用（自动加载）
const { data, isLoading, pagination } = useProductListData();

// 带初始筛选
const { data } = useProductListData({
  status: ProductStatus.ACTIVE,
  orderBy: 'salesCount',
  initialPageSize: 20
});

// 手动控制
const { data, refetch } = useProductListData({
  autoLoad: false
});
```

## 性能优化

1. **useMemo**: 转换后的产品数据使用 `useMemo` 缓存
2. **前端过滤**: `out_of_stock` 状态在前端过滤（因为是计算状态）
3. **延迟加载**: 分页数据延迟加载，避免一次性加载所有数据
4. **useCallback**: 事件处理函数使用 `useCallback` 避免重复创建

## 后续优化建议

1. **虚拟滚动**: 如果产品数量很大，考虑使用虚拟滚动
2. **缓存策略**: 使用 React Query 或 SWR 实现数据缓存
3. **乐观更新**: 修改产品时先更新 UI，再发送请求
4. **骨架屏**: 替换 Loading spinner 为骨架屏提升用户体验
5. **无限滚动**: 考虑替换传统分页为无限滚动

## 测试建议

1. ✅ 测试首次加载
2. ✅ 测试分页切换
3. ✅ 测试筛选功能
4. ✅ 测试搜索功能
5. ✅ 测试错误状态
6. ✅ 测试空状态
7. ✅ 测试加载状态
