import { GraphQLError, ASTVisitor, GraphQLFieldResolver, GraphQLSchema } from 'graphql';
import { GraphQlRequestInfo } from './graphql_request_info';

export type GraphQlOption = {
    schema: GraphQLSchema;
    rootValue: any;
    enableGraphiql?: boolean;

    /**
     * A value which is provided to every resolver and holds important contextual 
     * information like the currently logged in user, or access to a database.
     *
     * @type {*}
     */
    context?: any,

    /**
    * An optional function which will be used to format any errors produced by
    * fulfilling a GraphQL operation. If no function is provided, GraphQL's
    * default spec-compliant `formatError` function will be used. 
    */
    errorFormatter?: (error: GraphQLError) => any;
}