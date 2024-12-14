import { NextRequest} from "next/server";
import {CommunityController} from "@/src/app/controllers/community-controller";

export async function GET(req: NextRequest) {
    return CommunityController.getCommunities(req);
}

export async function POST(req: NextRequest) {
    return  CommunityController.createCommunity(req);
}
