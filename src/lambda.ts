// src/index.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import app from './app';

// サーバーレスExpressでExpressアプリをラップ
const serverlessExpressInstance = serverlessExpress({ app });

// Lambdaハンドラーをエクスポート
export const handler: APIGatewayProxyHandler = async (event, context, callback) => {
  //console.log('Received event:', JSON.stringify(event, null, 2)); // Log the event
  return serverlessExpressInstance(event, context, callback);
};
