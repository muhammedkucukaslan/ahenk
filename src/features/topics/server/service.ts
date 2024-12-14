import { TopicRepository } from './repository';
import { createSuccessResult, createErrorResult, makeItUrl } from '@/src/utils/returnFunctions';
import { ITopicService } from './interfaces';

export const TopicService: ITopicService = {
    async createTopic(data): Promise<IResponse> {
        try {
            const isTopicExist = await TopicRepository.isTopicExist(data.title);
            if (isTopicExist.success) {
                return createErrorResult("Konu ismi zaten alınmış", 'ALREADY_EXIST');
            }
            const slug: string = makeItUrl(data.title);
            const result = await TopicRepository.createTopic({ slug, title: data.title, content: data.content })
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Error while creating topic', 'SERVER_ERROR');
        }
    },
    getTopics: async (): Promise<IResult<ITopic[]>> => {
        try {
            const result = await TopicRepository.getTopics();
            if (!result.success) {
                return createErrorResult('Error while getting topics', 'SERVER_ERROR');
            }
            return createSuccessResult(result.data);
        } catch (error) {
            return createErrorResult('Error while getting topics', 'SERVER_ERROR');
        }
    },
    getTopicBySlug: async (slug: string): Promise<IResult<ITopicProfile>> => {
        try {
            const result = await TopicRepository.getTopicBySlug(slug);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            return createErrorResult('Error while getting topic', 'SERVER_ERROR');
        }
    },
    updateTopicBySlug: async (slug, data): Promise<IResponse> => {
        try {
            const isTopicExist = await TopicRepository.isTopicExist(data.title);
            if (isTopicExist.success) {
                return createErrorResult("Konu ismi zaten alınmış", 'ALREADY_EXIST');
            }
            const newSlug = makeItUrl(data.title);

            const result = await TopicRepository.updateTopicBySlug(slug, { ...data, slug: newSlug });
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Error while updating topic', 'SERVER_ERROR');
        }
    },
    deleteTopicBySlug: async (slug: string): Promise<IResponse> => {
        try {
            const result = await TopicRepository.deleteTopicBySlug(slug);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Error while deleting topic', 'SERVER_ERROR');
        }
    }
}