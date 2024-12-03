import { NextRequest} from "next/server";
import {CommunityController} from "@/src/app/controllers/community-controller";

export async function POST(req: NextRequest) {
    return  CommunityController.createCommunity(req);
}
