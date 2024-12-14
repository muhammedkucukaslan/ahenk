import { NextRequest } from "next/server";
import { CommunityController } from "@/src/app/controllers/community-controller";
import e from "cors";

export async function POST(req: NextRequest, { params }: {
    params: {
        name: string,
        id: string
    }
}) {
    return CommunityController.addMember(req, params.name, params.id);
}

export async function DELETE(req: NextRequest, { params }: { 
    params: { 
        name: string,
        id: string 
    } }) {
    return CommunityController.removeMember(req, params.name, params.id);
}