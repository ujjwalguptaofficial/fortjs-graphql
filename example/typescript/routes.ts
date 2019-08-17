import { DefaultController } from "./controllers/default_controller";
import { ParentRoute } from "fortjs";
import { GraphQlController } from "./controllers/graphql_controller";

export const routes: ParentRoute[] = [{
    path: "/*",
    controller: DefaultController
}, {
    path: "/graphql",
    controller: GraphQlController
}];