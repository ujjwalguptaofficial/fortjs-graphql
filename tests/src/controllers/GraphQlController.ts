import { HTTP_METHOD, DefaultWorker, Worker } from "fortjs";
import { FortGraphQl } from "fort-graphql";
import { graphqlSchema } from "../graphql/graphql_schema";
import { root } from "../graphql/graphql_root";
 

export class GraphQlController extends FortGraphQl {
    rootValue = root;

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