var MessageType = {

	image:{
		ToUserName:'',
		FromUserName:'',
		CreateTime:'',
		MsgType:'image',
		Image:{
			MediaId:''
		}
	},

	text:{
		ToUserName:'',
		FromUserName:'',
		CreateTime:'',
		MsgType:'text',
		Content:''
	},

	voice:{
		ToUserName:'',
		FromUserName:'',
		CreateTime:'',
		MsgType:'voice',
		Voice:{
			MediaId:''
		}
	},

	video:{
		ToUserName:'',
		FromUserName:'',
		CreateTime:'',
		MsgType:'voice',
		Video:{
			MediaId:'',
			Title:'',
			Descripition:''
		}
	},

	music:{
		ToUserName:'',
		FromUserName:'',
		CreateTime:'',
		MsgType:'music',
		Music:{
			Title:'',
			Descripition:'',
			MusicUrl:'',
			HQMusicUrl:'',
			ThumbMediaId:''
		}
	},

	news:{
		ToUserName:'',
		FromUserName:'',
		CreateTime:'',
		MsgType:'news',
		ArticleCount:'',
		Articles:[
			{
				item:{
					Title:'',
					Description:'',
					PicUrl:'',
					Url:''
				}
			}
		]
	}
}

module.exports = MessageType;


