import express from 'express';
import './config/db.js';

import authRouter from './routes/authRoutes.js';
import taskRouter from './routes/taskRoutes.js'

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', authRouter);
app.use('/api', taskRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
