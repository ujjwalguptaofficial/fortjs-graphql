import axios from "axios";
import { createApp } from "..";

const instance = axios.create({
    baseURL: 'http://localhost:4000/graphql',
    timeout: 1000
});

describe('/graphql', () => {

    let app;
    beforeAll(async () => {
        app = await createApp();
    });

    it('query hello', async () => {
        const query = `query{
            hello
          }`;
        const response = await instance.post('/', { query }, {
        });
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data).toEqual({ "data": { "hello": "Hello world!" } });
    });

    afterAll(() => {
        return app.destroy();
    });

});