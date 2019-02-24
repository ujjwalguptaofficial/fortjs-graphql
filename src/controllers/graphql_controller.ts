import { Controller, HTTP_METHOD, MIME_TYPE, jsonResult, HttpResult, renderView, htmlResult, HTTP_STATUS_CODE, viewResult, textResult } from "fortjs";
import { GraphQLSchema, graphql, GraphQLError } from "graphql";
import { GraphQLParams } from "../types/graphql_params";
import { GraphQlOption } from "../types/graphql_option";
import { getGraphiQlView } from "../helpers/get_view";

export class FortGraphQl extends Controller {
    schema: GraphQLSchema;
    rootValue: any;
    enableGraphiql: boolean = false;
    context: any;
    errorFormatter: (error: GraphQLError) => any;

    async getGraphiqlUi() {
        return htmlResult(getGraphiQlView(), 200);
    }

    async   processGraphQl() {
        try {
            const queryData = this.request.method === HTTP_METHOD.Post ? this.body : this.query;
            const params = this.getGraphQLParams_(queryData);
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
                if (this.errorFormatter != null) {
                    result.errors = result.errors.map(this.errorFormatter);
                }
                return jsonResult(result, HTTP_STATUS_CODE.BadRequest);
            }
            else {
                return jsonResult({
                    data: result.data
                });
            }
        }
        catch (ex) {
            // throw exception & let user handle this
            return Promise.reject(ex);
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
                Promise.reject(
                    {
                        contentType: MIME_TYPE.Text,
                        statusCode: HTTP_STATUS_CODE.BadRequest,
                        responseData: 'Variables are invalid JSON.'
                    } as HttpResult
                );
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