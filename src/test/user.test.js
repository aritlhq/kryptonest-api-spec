import {removeTestUser} from "./test-util.js";
import supertest from "supertest";
import {web} from "../application/web.js";
import {logger} from "../application/logging.js";

describe('POST /api/accounts', function () {
    afterEach(async () => {
        await removeTestUser();
    })

    it('Should be register new user', async () => {
        const result = await supertest(web)
            .post('/api/accounts')
            .send({
                username: "tester",
                first_name: "test first_name",
                last_name: "test last_name",
                email: "testemail@mail.com",
                password: "password",
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("tester");
        expect(result.body.data.first_name).toBe("test first_name");
        expect(result.body.data.last_name).toBe("test last_name");
        expect(result.body.data.email).toBe("testemail@mail.com");
        expect(result.body.data.password).toBeUndefined();
    });

    /**
     * - Empty
     * - Invalid input length for username
     * - Invalid format for email
     */
    it('Should be reject if request is invalid', async() => {
       const result = await supertest(web)
           .post('/api/accounts')
           .send({
               username: "asdf",
               first_name: "asdf",
               last_name: "asdf",
               email: "asdf@",
               password: "aszdfasdf",
           });

       logger.info(result.body);

       expect(result.status).toBe(400);
       expect(result.body.errors).toBeDefined();
    });
});