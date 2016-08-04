var Koa = new require('koa');
var app = new Koa();
var path = require('path');
var onerror = require('koa-onerror');
var convert = require('koa-convert');
var logger = require('koa-logger');
var json = require('koa-json');
var views = require('koa-views');
var bodyparser = require('koa-bodyparser');
var staticDir = require('koa-static');
var dust = require('koa-dust');

var configs = require('./src/configs/config');


app.use(json());

app.use(views('views',{
	root:path.join(__dirname,configs.app.views)
}));

app.use(dust(path.join(__dirname,configs.app.views)));

app.use(bodyparser());

app.use(logger());

app.use(function* (next){

	var start = new Date();
	yield next;
	var ms = new Date - start;

	console.log('%s-%s-%s',this.mothed,this.url,ms);

});

app.use(staticDir(path.join(__dirname,'static')));

var router = require('./src/configs/routes');

app.use(router.routes()).use(router.allowedMethods());

app.on('error',function(err,ctx){
	console.log('service error',err,ctx);
});

app.listen(8080,'127.0.0.1',function(err){

});


module.exports = app;

