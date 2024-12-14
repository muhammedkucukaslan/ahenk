import { NextRequest } from 'next/server';
import { CommentController } from '@/src/app/controllers/comment-controller';

export async function POST(req: NextRequest) {
    return CommentController.createReply(req);
}
