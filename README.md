[![npm version](https://badge.fury.io/js/fortjs-graphql.svg)](https://badge.fury.io/js/fortjs-graphql)

# fortjs-graphql
GraphQl module for fortjs 

# Uses

1. `npm i fortjs-graphql` or `yarn add fortjs-graphql`
2. Create a controller and inherit `FortGraphQl` 
   *  Create a default worker and call `processGraphQl` inside it. 
   *  For graphiql , create another worker and call `getGraphiqlUi` inside it.

```
import { HTTP_METHOD, DefaultWorker, Worker } from "fortjs";
import { FortGraphQl } from "fort-graphql";
export const graphqlSchema = `
type Query {
  hello: String
}
`;

export class GraphQlController extends FortGraphQl {
    rootValue = { hello: () => 'Hello world!' };

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
``` 

# Options

### Bulit schema can be provided by using `schema` property -

```
import { HTTP_METHOD, DefaultWorker, Worker } from "fortjs";
import { FortGraphQl } from "fort-graphql";
import { buildSchema } from "graphql";
export const graphqlSchema = `
type Query {
  hello: String
}
`;

export class GraphQlController extends FortGraphQl {
    rootValue = { hello: () => 'Hello world!' };

    // schema 
    schema = buildSchema(graphqlSchema);
 
 }
```

### Errors can be formatted by using `errorFormatter` property.   

```
import { HTTP_METHOD, DefaultWorker, Worker } from "fortjs";
import { FortGraphQl } from "fort-graphql";
import { buildSchema, GraphQLError } from "graphql";
export const graphqlSchema = `
type Query {
  hello: String
}
`;

export class GraphQlController extends FortGraphQl {
    rootValue = { hello: () => 'Hello world!' };

    // schema 
    schema = buildSchema(graphqlSchema);

    errorFormatter = function (error: GraphQLError) {
        // format the error and return it
        return error;
    }
 
 }
```