import express from 'express';
import { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler';

import tools from './utils/tools';

// Express アプリケーションの作成
const app = express();

// セキュリティヘッダー設定
app.use(helmet());
app.use(cors());
// エラーハンドラ
app.use(errorHandler);
// JSON ボディのパース
app.use(express.json({ limit: '1mb' }));

// ヘルスチェックエンドポイント - For ALB health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// 全リクエストが通るプロキシ
app.use((req: Request, res: Response, next) => {
  //リクエストをログに出力
  console.debug('Request received:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    query: req.query,
    body: req.body
  });
  // Fireblocksの署名を検証
  const signature = req.headers['fireblocks-signature'] as string | undefined;
  const isValidSignature = tools.verifyFireblocksSignature(JSON.stringify(req.body), signature);

  if (!isValidSignature) {
    console.error('Invalid signature');
    res.status(401).json({ message: 'Invalid signature' }).send();
    return;
  }

  next();
});

// Webhook エンドポイント
app.post('/webhook', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.status(200).send();
})


export default app;
