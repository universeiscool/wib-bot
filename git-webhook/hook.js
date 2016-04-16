var execFile = require('child_process').execFile;
var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/webhook', secret: '22736ff0-d2e2-11e4-8830-0800200c9a66' });

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(61337);

handler.on('push', function (event) {
	if(event.payload.ref.indexOf('live') > -1) {
		execFile('/var/www/foyer-backend/deploy/hook.sh', function(error, stdout, stderr) {});
	}
});