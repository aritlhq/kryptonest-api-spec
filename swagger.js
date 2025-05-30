import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };
import 'dotenv/config'



const app = express();
const port = process.env.SWAGGER_PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.listen(port, () => {
    console.info("Server started on port 3000");
});