import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import seatsRouter from './routes/seatsRouter';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/seats', seatsRouter)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
