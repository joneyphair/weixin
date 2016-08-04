var fetch = require('node-fetch');
var crypto = require('crypto');

var configs = require('./configs/config');

var data2xml = require('data2xml');
var convert = data2xml();
var util = require('./util/xml2json');

var Action = function(){ } ;

var fn = Action.prototype;

fn.getRandomImage = function(params){

	var params = params || {};

	var appId = configs.apiCloud.appId;
	var appKey = configs.apiCloud.appKey;
	var  now = + (new Date());

	var sha1 = crypto.createHash('sha1');
	sha1.update(appId+'UZ'+appKey+'UZ'+now);
	var keyStr = sha1.digest('hex')+'.'+now;

	var urlPre = 'https://d.apicloud.com/mcm/api';
	var url ='images';

	var requestUrl = urlPre +'/'+url+'?filter={"where":{},"skip":0,"limit":20}';


	var result = [];
	var str = '';

	//拼接params参数
	for(var item in params){
		str = '';
		str+= item + '=' + JSON.stringify(params[item]);
		result.push(str);
	}

	if(result.length){
		requestUrl += '?'+result.join('&');
	}

	console.log('----',requestUrl);

	var response = fetch(requestUrl, {
		method: 'GET',
		headers: {
			"X-APICloud-AppId": appId,
			"X-APICloud-AppKey": keyStr,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	}).then((res) =>{return res.json()});

	return response;
}


fn.requestFactory = function *(data){


	var content = yield util.parseXMLAsync(data);
	var message = yield util.formatMessage(content.xml);


	var toUserName = message.ToUserName;
	var fromUserName = message.FromUserName;

	message.ToUserName = fromUserName;
	message.FromUserName = toUserName;

	//处理消息类型
	switch(message.MsgType){

	case 'image':{
		message = yield this.responseImage(message);
		break;
	}

	default:{
		message = yield this.responseText(message);
	}

	}

	console.log("----->>>",message);


	var xml2 = convert('xml', message);
	xml2 = xml2.toString().split('\n');
	xml2.shift();
	xml2 = xml2.join('');

	console.log("xml2----->>>",xml2);

	return xml2;

}

fn.responseText = function *(message){

	return message;
}


fn.responseImage = function(message){

	message.Image = {
		MediaId:message.MediaId
	};

	delete message.MediaId;

	return message;


}

module.exports = new Action();





