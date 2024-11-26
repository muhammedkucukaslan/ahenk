import { revalidatePath } from 'next/cache';
import { ICacheService } from '../interfaces';

export class CacheService {
  static async revalidateMultiple(paths: string[]): Promise<void> {
    for (const path of paths) {
      await revalidatePath(path);
    }
  }
}

export class NextJSCacheService implements ICacheService {
  async revalidate(paths: string[]): Promise<void> {
    await CacheService.revalidateMultiple(paths);
  }
}
