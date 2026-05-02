import dotenv from 'dotenv';
import path from 'path';

// Load .env from root
dotenv.config({ path: path.join(__dirname, '../../../.env') });

import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[Server] Consolidated backend running on port ${port}`);
});
