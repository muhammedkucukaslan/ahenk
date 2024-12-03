import { NextRequest } from "next/server";
import { CommunityController } from "@/src/app/controllers/community-controller";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return CommunityController.getCommunityById(req, params.id);
}
