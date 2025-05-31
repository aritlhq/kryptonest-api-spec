import {createTestUser, removeTestUser} from "./test-util.js";
import supertest from "supertest";
import {web} from "../application/web.js";
import {logger} from "../application/logging.js";

describe('POST /api/accounts', function () {
    afterEach(async () => {
        await removeTestUser();
    });

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
     * Tests Passed:
     * - Empty
     * - Invalid input length for field(s)
     * - Invalid format for email
     */
    it('Should be reject if request is invalid', async () => {
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


describe('POST /api/accounts/login', function () {
        beforeEach(async () => {
            await createTestUser();
        });

        afterEach(async () => {
            await removeTestUser();
        });

        it('Should be able to login', async () => {
            const result = await supertest(web)
                .post('/api/accounts/login')
                .send({
                    email: "testemail@mail.com",
                    password: "password",
                });

            logger.info(result.body);

            expect(result.status).toBe(200);
            expect(result.body.data.token).toBeDefined();
            // expect(result.body.data.token).not.toBe("123456");
        });

        /**
         * Tests Passed:
         * - Empty
         * - Invalid input length for field(s)
         * - Invalid email or password
         */
        it('Should be reject if request is invalid', async () => {
            const result = await supertest(web)
                .post('/api/accounts/login')
                .send({
                    email: "testemail@mail.com",
                    password: "password32",
                });

            logger.info(result.body);

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
        });
    }
);

describe('GET /api/accounts/me', function () {
    let token;

    beforeEach(async () => {
        token = await createTestUser();
        console.log("Token for tests:", token);
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('Should be able to get me', async () => {
        const result = await supertest(web)
            .get("/api/accounts/me")
            .set("Authorization", `Bearer ${token}`);

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("tester");
        expect(result.body.data.email).toBe("testemail@mail.com");
    });

    /**
     * Test Passed:
     * - Unauthorized
     */
    it('Should be reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/accounts/me')
            .set("Authorization", "123456asdlkfj")

        logger.info(result.body);

        expect(result.status).toBe(401);
    });
});