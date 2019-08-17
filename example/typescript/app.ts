import { Fort, MustacheViewEngine } from 'fortjs';
import { routes } from './routes';
import { FortGraphQl } from 'fortjs-graphql';
import { buildSchema } from 'graphql';


export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = MustacheViewEngine;
    }

    async initGraphQl() {
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
}


