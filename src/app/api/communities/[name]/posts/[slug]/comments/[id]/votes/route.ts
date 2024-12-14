import { NextRequest } from "next/server";
import { VoteController } from "@/src/app/controllers/vote-controller";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    return VoteController.voteComment(req, params.id);
}