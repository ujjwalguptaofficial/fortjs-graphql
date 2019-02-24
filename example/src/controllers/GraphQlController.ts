import { textResult, HTTP_METHOD, DefaultWorker, Worker } from "fortjs";
import { FortGraphQl } from "fort-graphql";
import { buildSchema } from "graphql";

const schema = `
type Query {
  hello: String
}
`;
export class GraphQlController extends FortGraphQl {
    rootValue = { hello: () => 'Hello world!' };

    constructor() {
        super(schema);
    }

    @DefaultWorker([HTTP_METHOD.Get, HTTP_METHOD.Post])
    async  default() {
        return this.processGraphQl();
    }

    @Worker()
    async  graphiql() {
        return this.getGraphiqlUi();
    }

}