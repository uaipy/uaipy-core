/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SQLDatabaseWrapper {
    query(queryString: string, queryConfig?: any[]): Promise<{ rows: any[] }>;
}
