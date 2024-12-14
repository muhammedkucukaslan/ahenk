import { NextRequest } from "next/server";
import { VoteController } from "@/src/app/controllers/vote-controller";

export  async function POST(req: NextRequest, { params }: { params: { slug: string } } ) {
    return VoteController.votePost(req, params.slug);
}

