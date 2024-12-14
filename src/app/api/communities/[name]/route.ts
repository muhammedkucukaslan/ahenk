import { NextRequest } from "next/server";
import { CommunityController } from "@/src/app/controllers/community-controller";

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
    return CommunityController.getCommunityByName(req, params.name);
}

export async function PATCH(req: NextRequest, { params }: { params: { name: string } }) {
    return CommunityController.updatePartialPartOfCommunity(req, params.name);
}

export async function PUT(req: NextRequest, { params }: { params: { name: string } }) {
    return CommunityController.updateCommunity(req, params.name);
}