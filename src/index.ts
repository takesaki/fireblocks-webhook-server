// src/index.ts
import app from './app';

// listen on port
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.info(`listening on ${port}`);
});

// K8s 終了命令
process.on('SIGTERM', async () => {
  console.info('Server is finishing (SIGTERM).');
  process.exit(0);
});
// Ctrl+Cで終了
process.on('SIGINT', async () => {
  console.info('Server is finishing (SIGINT).');
  process.exit(0);
});