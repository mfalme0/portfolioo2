import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { generateId, jsonResponse, errorResponse } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return errorResponse('No file provided');

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop() || 'png';
    const fileName = `${generateId()}.${ext}`;

    const uploadResponse = await fetch(
      `https://api.vercel.com/v1/upload?teamId=${process.env.VERCEL_TEAM_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': file.type,
        },
        body: buffer,
      }
    );

    if (!uploadResponse.ok) {
      const uploadData = await uploadResponse.json();
      return errorResponse(uploadData.error?.message || 'Upload failed', 500);
    }

    const uploadData = await uploadResponse.json();
    return jsonResponse({ url: uploadData.url });
  } catch {
    return errorResponse('Upload failed', 500);
  }
}
