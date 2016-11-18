var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var middleware = {
	requireAuthentication: function(req, res, next){
		console.log('private route hit!');
		next();
	},
	logger: function(req,res,next){
		console.log(req.method + ' ' + req.originalUrl);
		next();
	}
};

app.use(middleware.logger);

/*app.get('/', function (req, res){
	
	res.send(express.static(__dirname + '/site'));
});*/

app.get('/', function(req, res) {
	app.use(express.static(__dirname + '/site3'));
    res.sendfile('site3/index.html', {root: __dirname })
});

app.use(bodyParser);

app.post('/', function(req, res){
    console.log(req.body.foo);
    res.send('ok');
});



//app.use('/public', public);

app.get('/about', middleware.requireAuthentication, function(req, res){
	res.send('About us');
});


//app.use(express.static(__dirname + '/public'));


app.listen(PORT, function(){
	console.log("....local server successfully launched on port <"+PORT+">");
});


