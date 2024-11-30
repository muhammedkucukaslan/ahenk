import { mutate } from 'swr';
import { ICacheService } from '../interfaces';

export class CacheService implements ICacheService {
  revalidateMultiple(paths: string[]): void {
    paths.forEach((path) => mutate(path));
  }
}
