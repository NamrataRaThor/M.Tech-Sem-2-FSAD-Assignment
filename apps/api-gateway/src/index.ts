import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApiResponse } from '@studysync/shared';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  const response: ApiResponse<{ status: string }> = {
    status: 'success',
    data: { status: 'Gateway is healthy' }
  };
  res.json(response);
});

app.listen(port, () => {
  console.log(`[API Gateway] running on port ${port}`);
});
