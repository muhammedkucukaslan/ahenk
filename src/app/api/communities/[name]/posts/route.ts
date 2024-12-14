import { NextRequest } from 'next/server';
import { PostController } from '@/src/app/controllers/post-controller';

export async function POST(req: NextRequest, { params }: { params: { name: string } }) {
    return PostController.createPost(req, params.name);
}


