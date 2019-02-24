import { GraphQlController } from "./controllers/GraphQlController";

export const routes = [{
    path: "/graphql",
    controller: GraphQlController as any
}];