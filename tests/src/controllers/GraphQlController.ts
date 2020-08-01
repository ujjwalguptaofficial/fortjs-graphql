import { HTTP_METHOD, DefaultWorker, Worker } from "fortjs";
import { GraphQlHelper } from "fortjs-graphql";


export class GraphQlController extends GraphQlHelper {

    /**
     * This method will be used to process graphql query 
     *
     * @returns
     * @memberof GraphQlController
     */
    @DefaultWorker(HTTP_METHOD.Get, HTTP_METHOD.Post)
    async default() {
        return this.processGraphQl();
    }

    /**
     * This method will return graphiql 
     *
     * @returns
     * @memberof GraphQlController
     */
    @Worker()
    async graphiql() {
        return this.getGraphiqlUi();
    }

}