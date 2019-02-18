import { DocumentNode } from "graphql";

/**
 * All information about a GraphQL request.
 */
export type GraphQlRequestInfo = {
    /**
     * The parsed GraphQL document.
     */
    document?: DocumentNode,

    /**
     * The variable values used at runtime.
     */
    variables?: {
        [name: string]: any
    },

    /**
     * operation name requested.
     */
    operationName?: string,

    /**
     * The result of executing the operation.
     */
    result?: any,

    /**
     * A value to pass as the context to the graphql() function.
     */
    context?: any,
};