import axios from "axios";
import { createApp } from "..";
import { Fort } from "fortjs";
const instance = axios.create({
    baseURL: 'http://localhost:4000/graphql',
    timeout: 1000
});

describe('/graphql', () => {

    let app: Fort;
    beforeAll(async () => {
        app = await createApp() as any;
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