var getRawBody = require('raw-body');
var Action = require('../Action');
var configs = require('../configs/config');
var crypto = require('crypto');

var HomeController = function(){

}

var fn = HomeController.prototype;

//接受消息请求
fn.main = function *(){

	this.set('Content-Type','application/xml');

	var data = yield getRawBody(this.req,{
		length:this.length,
		limit:'1mb',
		encoding:this.charset
	})


	var message =  yield Action.requestFactory(data);
	this.body = message;
}


//微信绑定验证服务器
fn.init = function *(){

	var token = configs.weixin.token;
	var appId = configs.weixin.appId;
	var appsecret = configs.weixin.appsecret;

	var signature = this.query.signature;
	var timestamp = this.query.timestamp;
	var nonce = this.query.nonce;
	var echostr = this.query.echostr;

	var tmpArr = new Array(token,timestamp,nonce);
	tmpArr.sort();
	var tmpStr = tmpArr.join('');

	var sha1 = crypto.createHash('sha1');
	sha1.update(tmpStr);
	var resStr = sha1.digest('hex');

	if(resStr === signature){
		this.body = echostr;
	}else{
		return false;
	}

}

module.exports = new HomeController();
