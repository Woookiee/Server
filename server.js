var express = require('express');
var app = express();
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

app.get('/', function (req, res){
	res.send("Hello Express");
});



app.get('/about', middleware.requireAuthentication, function(req, res){
	res.send('About us');
});


app.use(express.static(__dirname + '/public'));


app.listen(PORT, function(){
	console.log("....local server successfully launched on port <"+PORT+">");
});

