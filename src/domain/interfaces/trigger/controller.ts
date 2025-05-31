export abstract class TriggerController<T =any> {
    abstract perform(event: unknown, context: unknown): Promise<T>;

    async handle(event: unknown, context: unknown): Promise<T> {
        try {
            return await this.perform(event, context);
        } catch (error) {
            throw error;
        }
    }
}

