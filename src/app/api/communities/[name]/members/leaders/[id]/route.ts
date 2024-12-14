import { NextRequest } from "next/server";
import { CommunityController } from "@/src/app/controllers/community-controller";

export async function POST(req: NextRequest, { params }: { params: { name: string, id :string  } }) {
    return CommunityController.promoteMember(req, params.name,params.id);
}

export async function DELETE(req: NextRequest, { params }: { params: { name: string, id: string } }) {
    return CommunityController.demoteMember(req, params.name, params.id);
}