import { NextRequest } from "next/server";
import { TopicController } from "@/src/app/controllers/topic-controller";


export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    return TopicController.getTopicBySlug(req, params.slug);
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    return TopicController.updateTopicBySlug(req, params.slug);
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    return TopicController.deleteTopicBySlug(req, params.slug);
}