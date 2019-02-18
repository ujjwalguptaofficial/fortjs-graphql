import { Controller, HTTP_METHOD, MIME_TYPE, jsonResult, HttpResult, renderView, htmlResult, HTTP_STATUS_CODE, viewResult } from "fortjs";
import { GraphQLSchema, graphql, GraphQLError } from "graphql";
import { GraphQLParams } from "../types/graphql_params";
import { GraphQlOption } from "../types/graphql_option";

export class FortGraphQl extends Controller {
    schema: GraphQLSchema;
    rootValue: any;
    enableGraphiql: boolean = false;
    context: any;
    errorFormatter: (error: GraphQLError) => any;

    constructor() {
        super();
    }

    async graphiqlWorker() {
        return await viewResult('graphiql');
    }

    async graphqlWorker() {
        try {
            const queryData = this.request.method === HTTP_METHOD.Post ? this.body : this.query;
            console.log('querydata', queryData);
            const params = this.getGraphQLParams_(queryData);
            console.log('params', params);
            const result = await graphql(
                this.schema,
                params.query,
                this.rootValue,
                this.context,
                params.variables,
                params.operationName
            );
            // Format any encountered errors.
            if (result.errors) {
                console.log('result error', result.errors);
                result.errors = result.errors.map(this.errorFormatter);
            }
            else {
                return jsonResult(result.data);
            }
        }
        catch (ex) {
            if (ex.statusCode) {
                return ex;
            }
            else {
                // throw exception & let user handle this
                throw ex;
            }
        }
    }

    private getGraphQLParams_(queryData: { [name: string]: any }): GraphQLParams {
        // GraphQL Query string.
        let query = queryData.query;
        if (typeof query !== 'string') {
            query = null;
        }
        // Parse the variables if needed.
        let variables = queryData.variables;
        if (variables != null && typeof variables === 'string') {
            try {
                variables = JSON.parse(variables);
            } catch (error) {
                throw {
                    contentType: MIME_TYPE.Text,
                    statusCode: HTTP_STATUS_CODE.BadRequest,
                    responseData: 'Variables are invalid JSON.'
                } as HttpResult;
            }
        } else if (typeof variables !== 'object') {
            variables = null;
        }

        // Name of GraphQL operation to execute.
        let operationName = queryData.operationName;
        if (typeof operationName !== 'string') {
            operationName = null;
        }
        return { query, variables, operationName };
    }
}