import { getSession } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/utils';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return errorResponse('Not authenticated', 401);
    }
    return jsonResponse({ username: session.username, role: session.role });
  } catch {
    return errorResponse('Not authenticated', 401);
  }
}
