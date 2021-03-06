import {
    DefaultController
} from "./controllers/default_controller";
import { GraphQlController } from "./controllers/graphql_controller";

export const routes = [{
    path: "/*",
    controller: DefaultController
}, {
    path: "/graphql",
    controller: GraphQlController
}]