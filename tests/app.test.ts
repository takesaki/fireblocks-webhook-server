// tests/app.test.ts
import request from 'supertest';
import app from '../src/app';

const POST_TESTDATA_WEBHOOK = {"id":"08e1edc8-75d2-4542-a914-7720e407a21e","workspaceId":"1b847ea6-5d7e-5adb-99ac-c54126d55be7","eventType":"vault_account.asset.balance_updated","data":{"blockHash":"0xd82b1a1c774f20fd6085b962685b730e059122feaa8ea33c5ddc390e9ed36003","total":"0.28168507872804894","lockedAmount":"0","blockHeight":"19012593","assetId":"AMOY_POLYGON_TEST","pending":"0","staked":"0","vaultAccountId":"8","frozen":"0"},"createdAt":1741569639617};
const POST_TESTDATA_FB_SIGNATURE = "sJXyVXprZl48xwh8Q5S2voE7R1HdtojW3KE3r6CX4lKPpTLfM7aVtA7I3cX/C3TKbN9XB2lfJnUkn9QO7dvEZbx5iIE+tmfDBNv51ZzDzxYtG+6Q3Shqx3JCoOT8CcKBC5N4sV+zZaiK5frrjPpPaGIBeGnfmy+P7jXvEPieCaCL/bl1Ag91FNr2Jl/K5TiB3g2qFxQXsy6aa93NSCmJOw95IG6oryJlGScPZpqG/zEVXWvB04e11mWPfXY0qSRWJN1WNUzPBXcEoDSD256yrv0jb3GPepQFIpRMrecaoWREZBwtd91Jp5pFzeh4zz/Qyvqt1I7aWJlKLe6sl9/DBZER6Ouh8CqDpC4SDoTyC2fkPDgt0Amtt/CQAKB1Ksn/P7l4ItGp4jtAwApycxLQPi+MUw1Dp74ifHyT/25m/vwFQWk5gYfCbX9MH3/XJYla4SoKPmX5ifH80Twvpik+U0NHub5pxQ6/9cJPkZTSJwn3348JbLejOlDe6hF2RsmwSXrLJR2rpobpHV8hMcTwHg96GyuylU9uXvNr3JTnRyRUdm7RD6b9TVZm/MANoZrYQgEdnZqEdPKOwbyzaHUAy3IBbUoJf0NkQKlwypmHNlDxGQxsOqmiqsgl0Fnmoeuo4Iw3y0cXHrhXGFtiCTokL+cnm4B6g7gvFQRnTMs9Q4o=";

// 正常系テスト
describe('Express App Normal Test should return 200', () => {
  it('GET /health without Auth', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('POST /webhook with authentication should return 200', async () => {
    const response = await request(app)
      .post('/webhook')
      .send(POST_TESTDATA_WEBHOOK)
      .set('fireblocks-signature', POST_TESTDATA_FB_SIGNATURE);
    expect(response.status).toBe(200);
  });
});

// 異常系テスト
describe('Express App Error Test', () => {

  it('POST /webhook without authentication should return 401', async () => {
    const response = await request(app)
      .post('/webhook')
      .send(POST_TESTDATA_WEBHOOK);
    expect(response.status).toBe(401);
  });
});