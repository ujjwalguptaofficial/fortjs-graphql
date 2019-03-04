import { Fort } from 'fortjs';
import { routes } from './routes';
import { FortViewEngine } from 'eshtml';
import * as path from "path";
import { FortGraphQl } from 'fortjs-graphql';
import { resolver } from './graphql/resolver';
import { graphqlSchema } from './graphql/graphql_schema';
import { buildSchema } from 'graphql';

export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = FortViewEngine;
    }
}

new App().create({
    defaultPath: "default",
    folders: [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }]
}).then(() => {
    new FortGraphQl().initiate({
        resolver: resolver,
        schema: buildSchema(graphqlSchema)
    })
})

console.log("Your fort is located at address - localhost:4000");