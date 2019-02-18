import { textResult, HTTP_METHOD, DefaultWorker, Worker } from "fortjs";
import { FortGraphQl } from "fort-graphql";
import { buildSchema } from "graphql";

export class GraphQlController extends FortGraphQl {
    rootValue = { hello: () => 'Hello world!' };
    schema = buildSchema(`
        type Query {
          hello: String
        }
      `);

    constructor() {
        super();
    }

    @DefaultWorker([HTTP_METHOD.Get, HTTP_METHOD.Post])
    async  default() {
        return this.graphqlWorker();
    }

    @Worker()
    async  graphiql() {
        return this.graphiqlWorker();
    }

    @Worker()
    async test() {
        return textResult("fg");
    }
}