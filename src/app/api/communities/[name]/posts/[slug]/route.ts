import { NextRequest } from 'next/server';
import { PostController } from '@/src/app/controllers/post-controller';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    return PostController.getPostBySlug(req, params.slug);
}


export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    return PostController.updatePost(req, params.slug);
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    return PostController.deletePost(req, params.slug);
}