import * as path from "path";
import {
    App
} from "./app";

export const createApp = async () => {
    const app = new App();
    await app.create({
        folders: [{
            alias: "/",
            path: path.join(__dirname, "../static")
        }]
    });
    await app.initGraphQl();
    return app;
};

if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        console.log("Your fort is located at address - localhost:4000");
    }).catch(err => {
        console.error(err);
    });
}