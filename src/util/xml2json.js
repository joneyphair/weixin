var xml2js =  require('xml2js');

// 解析XML对象
exports.parseXMLAsync = function(xml){
    return new Promise(function(resolve,reject){
        xml2js.parseString(xml,{trim:true},function(err,content){
            if(err) reject(err)
            else resolve(content)
        })
    })
}

//格式化XML对象
function formatMessage(result){
    var message = {}

    if (typeof result === 'object'){
        // 获取对象里所有的key值
        var keys = Object.keys(result)

        for(var i = 0;i<keys.length;i++){

            // 获取每一个key对应的val值
            var item = result[keys[i]]
            var key = keys[i]

            // 如果不是数组，或者长度为0，直接跳过
            if( !(item instanceof Array) || item.length === 0  ){
                continue
            }

            // 如果长度为1，那就直接取值
            if(item.length === 1){
                var val = item[0]

                // 再看看这个值是不是对象，如果是就进一步遍历
                if(typeof val === 'object'){
                    message[key]= formatMessage(val)
                }
                // 如果是字符串的话就把值给massage对应的key的值
                else{
                    message[key] = (val || '').trim()
                }
            }
            // 如果是多个值的数组
            else{
                message[key] = []
                // 对数组内每项值信息遍历,赋予进去
                for(var j=0,k=item.length;j<k;j++){
                    message[key].push(formatMessage(item[j]))
                }
            }
        }

    }

    return message
}

exports.formatMessage = formatMessage



