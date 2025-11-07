import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const query = searchParams.get('query') || '';
    const orderBy = searchParams.get('orderBy') || '-created_at';

    const clerk = await clerkClient();

    const params: any = {
      limit: Math.min(limit, 500),
      offset,
      orderBy
    };

    if (query) {
      params.query = query;
    }

    const response = await clerk.users.getUserList(params);

    return NextResponse.json({
      data: response.data,
      totalCount: response.totalCount,
      pagination: {
        limit,
        offset,
        hasMore: response.data.length === limit
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
