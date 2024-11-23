import { mutate } from 'swr';

export class CacheService {
  static revalidateMultiple(paths: string[]): void {
    paths.forEach((path) => mutate(path));
  }
}
