import {
    Fort
} from 'fortjs';
import {
    routes
} from './routes';
import {
    FortViewEngine
} from 'eshtml';
import * as path from "path";
import {
    FortGraphQl
} from 'fortjs-graphql';
import {
    buildSchema
} from 'graphql';


export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = FortViewEngine;
    }
}

new App().create({
    defaultPath: "/default",
    folders: [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }]
}).then(() => {
    console.log("Your fort is located at address - localhost:4000");

    // setup graphql

    new FortGraphQl().initiate({
        errorFormatter: function (error) {
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
    })
}).catch(err => {
    console.error(err);
})