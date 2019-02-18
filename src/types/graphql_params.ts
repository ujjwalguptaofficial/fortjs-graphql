export type GraphQLParams = {
    query?: string,
    variables?: { [name: string]: any },
    operationName?: string,
};