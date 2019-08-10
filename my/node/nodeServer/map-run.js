
/**Connect是一个node中间件（middleware）框架。
如果把一个http处理过程比作是污水处理，中间件就像是一层层的过滤网。
每个中间件在http处理过程中通过改写request或（和）response的数据、状态，实现了特定的功能。
中间件就是类似于一个过滤器的东西，在客户端和应用程序之间的一个处理请求和响应的的方法。*/

var connect = require('connect');  //创建连接
var bodyParser = require('body-parser');   //body解析
var map = new Map();
function isArr(m) {
    let arr = [];
    for (let [key,vue] of map) {
        arr.push({key,vue});
    }
    console.log(arr)
    return arr;
}
var app = connect()
    .use(bodyParser.json())   //JSON解析
    .use(bodyParser.urlencoded({extended: true}))
	//use()方法还有一个可选的路径字符串，对传入请求的URL的开始匹配。
	//use方法来维护一个中间件队列
	.use(function (req, res, next) {
		//跨域处理
		// Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');  //允许任何源
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  //允许任何方法
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Session-Token');   //允许任何类型
		res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});    //utf-8转码
		next();  //next 方法就是一个递归调用
	})
	.use('/add', function(req, res, next) {
	    map.set(req.body.name,req.body.message);
	    var data = {
	        content : 200,
            msg : 'success'
        };
	    console.log(map);
	    console.log(JSON.stringify(map))
		res.end(JSON.stringify(data));
		next();
	})
	.use('/get', function(req, res, next) {

        var data = isArr(map)
        res.end(JSON.stringify(data));
        next();      //
    })
    .use('/map/get', function(req, res, next) {
        var data={
            "code": "200",
            "msg": "success",
            "result": {
                "id":1,
            }
        };
        console.log(req.body);
        console.log(11111111);
        res.end(JSON.stringify(data));
        next();      //
    })
    .use('/map/getList',function (req,res,next) {
        var data ={
            'code':'200',
            'msg':'success',
            result:[
                {title:'first',cotent:[{title:'第一'},{title:'第一一'}]},
                {title:'two',cotent:[{title:'地儿'},{title:'第二'}]},
                {title:'three',cotent:[{title:'第三'},{title:'第三三'}]},
                {title:'last',cotent:[{title:'第四'},{title:'第四四'}]},
            ]
        };
        res.end(JSON.stringify(data));
        next();
    })
    .listen(520);   //
console.log('Server started on port 520.');