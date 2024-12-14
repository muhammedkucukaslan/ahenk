import { NextRequest, NextResponse } from 'next/server';
import { UserController } from '../../../controllers/user-controller';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    return UserController.getUserByUsername(req, params.username);
}
