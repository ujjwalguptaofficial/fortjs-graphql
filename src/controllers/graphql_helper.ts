import { Controller, HTTP_METHOD, MIME_TYPE, jsonResult, HttpResult, renderView, htmlResult, HTTP_STATUS_CODE, viewResult, textResult } from "fortjs";
import { graphql } from "graphql";
import { GraphQLParams } from "../types/graphql_params";
import { getGraphiQlView } from "../helpers/get_view";
import { Global } from "../global";

export class GraphQlHelper extends Controller {

    async getGraphiqlUi() {
        return htmlResult(getGraphiQlView(), 200);
    }

    async  processGraphQl() {
        const queryData = this.request.method === HTTP_METHOD.Post ? this.body : this.query;
        const params = this.getGraphQLParams_(queryData);
        const option = Global.graphQlOptionValue;
        const result = await graphql(
            option.schema,
            params.query,
            option.resolver,
            option.context,
            params.variables,
            params.operationName
        );
        // Format any encountered errors.
        if (result.errors) {
            if (option.errorFormatter != null) {
                result.errors = result.errors.map(option.errorFormatter);
            }
            return jsonResult(result, HTTP_STATUS_CODE.BadRequest);
        }
        else {
            return jsonResult({
                data: result.data
            });
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
                return Promise.reject(
                    {
                        contentType: MIME_TYPE.Text,
                        statusCode: HTTP_STATUS_CODE.BadRequest,
                        responseData: 'Variables are invalid JSON.'
                    } as HttpResult
                ) as any;
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