import * as path from "path";
import { FortGraphQl } from "fortjs-graphql";
import { buildSchema } from "graphql";
import { Fort } from "fortjs";
import { routes } from "./routes";

const initGraphQl = async () => {
    // setup graphql
    await new FortGraphQl().initiate({
        errorFormatter: (error) => {
            // format the error and return it
            return error;
        },
        schema: buildSchema(`
                type Query {
                    hello: String
                }
            `),
        resolver: {
            hello: () => 'Hello world!'
        }
    });
}

export const createApp = async () => {
    Fort.routes = routes;
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }]
    await Fort.create();
    await initGraphQl();
};
if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.info("Your fort is located at address - localhost:4000");
    }).catch(err => {
        console.error(err);
    });
}

