import { HTTP_METHOD, DefaultWorker, Worker } from "fortjs";
import { FortGraphQl } from "fort-graphql";
import { graphqlSchema } from "../graphql_schema";
import { GraphQLError } from "graphql";


export class GraphQlController extends FortGraphQl {
    rootValue = { hello: () => 'Hello world!' };

    errorFormatter = function (error: GraphQLError) {
        // format the error and return it
        return error;
    }

    constructor() {
        super(graphqlSchema);
    }

    /**
     * This method will be used to process graphql query 
     *
     * @returns
     * @memberof GraphQlController
     */
    @DefaultWorker([HTTP_METHOD.Get, HTTP_METHOD.Post])
    async  default() {
        return this.processGraphQl();
    }

    /**
     * This method will return graphiql 
     *
     * @returns
     * @memberof GraphQlController
     */
    @Worker()
    async  graphiql() {
        return this.getGraphiqlUi();
    }

}