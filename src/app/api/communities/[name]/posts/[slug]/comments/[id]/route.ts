import { NextRequest } from 'next/server';
import { CommentController } from '@/src/app/controllers/comment-controller';



export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    return CommentController.updateComment(req, params.id);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return CommentController.deleteComment(req, params.id);
}