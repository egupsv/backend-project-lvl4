#!/usr/bin/env node

import Koa from 'koa';
import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: 'POST_SERVER_ITEM_ACCESS_TOKEN',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = new Koa();
app.use(async (ctx, next) => {
  try {
    await next();
    ctx.body = 'hello';
  } catch (err) {
    rollbar.error(err, ctx.request);
  }
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 8000;
}
app.listen(port);
