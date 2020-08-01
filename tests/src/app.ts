import { Fort } from 'fortjs';
import { routes } from './routes';
import { FortViewEngine } from 'eshtml';
import * as path from "path";
import { FortGraphQl } from 'fortjs-graphql';
import { resolver } from './graphql/resolver';
import { graphqlSchema } from './graphql/graphql_schema';
import { buildSchema } from 'graphql';


Fort.routes = routes;
Fort.folders = [{
    alias: "/",
    path: path.join(__dirname, "../static")
}]
Fort.create().then(() => {
    new FortGraphQl().initiate({
        resolver: resolver,
        schema: buildSchema(graphqlSchema)
    });
})

console.log("Your fort is located at address - localhost:4000");