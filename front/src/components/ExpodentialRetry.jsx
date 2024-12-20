const exponentialRetry = async (operation, maxRetries = 5, baseDelay = 1000) => {
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            return await operation();
        } catch (error) {
            attempt++;
            if (attempt >= maxRetries) {
                throw new Error(`Operation failed after ${maxRetries} retries: ${error.message}`);
            }

            const delay = baseDelay * Math.pow(2, attempt);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
};
export default exponentialRetry;