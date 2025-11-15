/**
 * useProductListData Hook 使用示例
 *
 * 这个 hook 提供了完整的产品列表数据管理功能，包括：
 * - 分页
 * - 筛选
 * - 排序
 * - 加载状态
 * - 错误处理
 */

import { useState } from 'react';
import { useProductListData } from './use-product-list-data';
import { ProductStatus } from '@prisma/client';

// ============ 示例 1: 基础使用 ============
export function BasicExample() {
  const { data, isLoading, error, pagination } = useProductListData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
      <div>
        Page {pagination?.page} of {pagination?.totalPages}
      </div>
    </div>
  );
}

// ============ 示例 2: 带筛选条件 ============
export function FilteredExample() {
  const { data, isLoading, setFilters } = useProductListData({
    status: ProductStatus.ACTIVE,
    isActive: true,
    orderBy: 'salesCount'
  });

  const handleFilterChange = () => {
    setFilters({
      status: ProductStatus.DRAFT,
      categoryId: 'cat-1'
    });
  };

  return (
    <div>
      <button onClick={handleFilterChange}>Apply Filters</button>
      {/* ... */}
    </div>
  );
}

// ============ 示例 3: 完整的分页控制 ============
export function PaginationExample() {
  const {
    data,
    isLoading,
    pagination,
    setPage,
    setPageSize,
    nextPage,
    prevPage
  } = useProductListData({
    initialPageSize: 20
  });

  return (
    <div>
      {/* 产品列表 */}
      {data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}

      {/* 分页控制 */}
      <div>
        <button onClick={prevPage} disabled={pagination?.page === 1}>
          Previous
        </button>
        <span>
          Page {pagination?.page} of {pagination?.totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={pagination?.page === pagination?.totalPages}
        >
          Next
        </button>

        {/* 每页数量选择 */}
        <select
          value={pagination?.pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
}

// ============ 示例 4: 搜索功能 ============
export function SearchExample() {
  const { data, isLoading, setFilters, refetch } = useProductListData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setFilters({
      search: searchTerm
    });
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search products...'
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={refetch}>Refresh</button>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.map((product) => <div key={product.id}>{product.name}</div>)
      )}
    </div>
  );
}

// ============ 示例 5: 高级筛选 ============
export function AdvancedFilterExample() {
  const { data, isLoading, isRefetching, setFilters, pagination } =
    useProductListData({
      initialPageSize: 20,
      orderBy: 'createdAt'
    });

  return (
    <div>
      {/* 筛选器 */}
      <div>
        <select
          onChange={(e) =>
            setFilters({ status: e.target.value as ProductStatus })
          }
        >
          <option value=''>All Status</option>
          <option value={ProductStatus.ACTIVE}>Active</option>
          <option value={ProductStatus.DRAFT}>Draft</option>
          <option value={ProductStatus.ARCHIVED}>Archived</option>
        </select>

        <select onChange={(e) => setFilters({ categoryId: e.target.value })}>
          <option value=''>All Categories</option>
          <option value='cat-1'>Bracelets</option>
          <option value='cat-2'>Necklaces</option>
        </select>

        <label>
          <input
            type='checkbox'
            onChange={(e) => setFilters({ isFeatured: e.target.checked })}
          />
          Featured Only
        </label>

        <label>
          <input
            type='checkbox'
            onChange={(e) => setFilters({ isNew: e.target.checked })}
          />
          New Arrivals Only
        </label>
      </div>

      {/* 加载状态 */}
      {isRefetching && <div>Refreshing...</div>}

      {/* 产品列表 */}
      <div>
        {isLoading ? (
          <div>Loading products...</div>
        ) : (
          <>
            <div>Total: {pagination?.total} products</div>
            {data.map((product) => (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <p>Sales: {product.salesCount}</p>
                <p>Views: {product.viewCount}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ============ 示例 6: 手动加载 ============
export function ManualLoadExample() {
  const { data, isLoading, refetch } = useProductListData({
    autoLoad: false // 不自动加载
  });

  return (
    <div>
      <button onClick={refetch} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load Products'}
      </button>

      {data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
