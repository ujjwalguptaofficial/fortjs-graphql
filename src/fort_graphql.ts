import { GraphQlOption } from "./types";
import { Global } from "./global";

export class FortGraphQl {
    async initiate(option: GraphQlOption) {
        Global.graphQlOptionValue = option;
    }
}