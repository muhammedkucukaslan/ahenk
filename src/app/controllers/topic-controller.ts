
import { NextRequest } from 'next/server';
import { TopicService } from '@/src/features/topics/server/service';
import { createTopicSchema } from '@/src/features/topics/server/validation';
import { validateData } from '@/src/utils/returnFunctions';
import { handleErrorResponse, handleSuccessResponse } from '@/src/utils/returnFunctions';


export const TopicController: ITopicController = {
    async getTopics(req: NextRequest): Promise<IResponse> {
        try {
            const result = await TopicService.getTopics();
            if (!result.success) {
                return handleErrorResponse(result.message, result.ERR_CODE);
            }
            return handleSuccessResponse(result.data);
        } catch (error) {
            return handleErrorResponse('Internal server error', 'INTERNAL_SERVER_ERROR');
        }
    },
    async createTopic(req: NextRequest): Promise<IResponse> {
        try {
            const role = req.headers.get('x-user-role');
            if (role !== 'ADMIN') {
                return handleErrorResponse('Konu oluşturabilmeniz için admin olmanız gerekiyor', 'FORBIDDEN');
            }
            const data = await req.json();
            const validatedData = await validateData(data, createTopicSchema);
            if (!validatedData) {
                return handleErrorResponse('Invalid data', 'INVALID_DATA');
            }
            const result = await TopicService.createTopic(data);
            if (!result.success) {
                return handleErrorResponse(result.message, result.ERR_CODE);
            }
            return handleSuccessResponse(null);
        } catch (error) {
            return handleErrorResponse('Internal server error', 'INTERNAL_SERVER_ERROR');
        }
    },
    getTopicBySlug: async (req: NextRequest, slug: string): Promise<IResponse> => {
        try {
            const result = await TopicService.getTopicBySlug(slug);
            if (!result.success) {
                return handleErrorResponse(result.message, result.ERR_CODE);
            }
            return handleSuccessResponse(result.data);
        } catch (error) {
            return handleErrorResponse('Internal server error', 'INTERNAL_SERVER_ERROR');
        }
    },
    updateTopicBySlug: async (req: NextRequest, slug: string): Promise<IResponse> => {
        try {
            const role = req.headers.get('x-user-role');
            if (role !== 'ADMIN') {
                return handleErrorResponse('Konuları güncelleyebilmeniz için admin olmanız gerekiyor', 'FORBIDDEN');
            }
            const data = await req.json();
            const result = await TopicService.updateTopicBySlug(slug, data);
            if (!result.success) {
                return handleErrorResponse(result.message, result.ERR_CODE);
            }
            return handleSuccessResponse(null);
        } catch (error) {
            return handleErrorResponse('Internal server error', 'INTERNAL_SERVER_ERROR');
        }
    },
    deleteTopicBySlug: async (req: NextRequest, slug: string): Promise<IResponse> => {
        try {
            const role = req.headers.get('x-user-role');
            if (role !== 'ADMIN') {
                return handleErrorResponse('Konuları silebilmeniz için admin olmanız gerekiyor', 'FORBIDDEN');
            }
            const result = await TopicService.deleteTopicBySlug(slug);
            if (!result.success) {
                return handleErrorResponse(result.message, result.ERR_CODE);
            }
            return handleSuccessResponse(null);
        } catch (error) {
            return handleErrorResponse('Internal server error', 'INTERNAL_SERVER_ERROR');
        }
    }
}


interface ITopicController {
    getTopics(req: NextRequest): Promise<IResponse>;
    createTopic(req: NextRequest): Promise<IResponse>;
    getTopicBySlug(req: NextRequest, slug: string): Promise<IResponse>;
    updateTopicBySlug(req: NextRequest, slug: string): Promise<IResponse>;
    deleteTopicBySlug(req: NextRequest, slug: string): Promise<IResponse>;
}