/*jshint esversion: 8 */

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = Router();
var bodyParser = require('koa-bodyparser');
const server = require('http').createServer(app.callback());
const fs = require('fs');

const channelToken = require('./token.js').channelToken;
const replyurl = require('./token.js').utl;

const port = 80;

router.post('/chatbot', async function (ctx) {
    var msg = JSON.parse(ctx.request.body);
    console.log(msg);
    var replyToken = msg.events[0].replyToken;
    var userMessage = msg.events[0].message.text;

    if (typeof replyToken === 'undefined') {
        return;
    }

});

router.post('/open', async function (ctx) {
    console.log('open/ POST data = ' + JSON.stringify(ctx.request.body));
    ctx.body = "OK";
});


router.get('/', async function (ctx) {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

server.listen(port, () => {
    console.log('listening on *:' + port);
});

