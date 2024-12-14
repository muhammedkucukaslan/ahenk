import { NextRequest } from "next/server";
import { TopicController } from "@/src/app/controllers/topic-controller";

export async function GET(req: NextRequest) {
    return TopicController.getTopics(req);
}

export async function POST(req: NextRequest) {
    return TopicController.createTopic(req);
}
