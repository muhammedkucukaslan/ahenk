function createResult<T>(success: boolean, data: T | null = null, message?: string): Result<T> {
    return { success, data, message };
}

export { createResult };

