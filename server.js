var express = require('express');
	var bodyParser = require('body-parser');
		var _ = require('underscore');

var app = express();
	var PORT = process.env.PORT || 3000;
		var cart = []; //your shopping cart
			var NextMealsID = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Example of meals');
});

//GET /cart *showing your shopping cart

app.get('/cart', function(req, res){
	res.json(cart);
});

//GET /cart/:id *showing your meal by ID

app.get('/cart/:id', function(req, res){
	var mealID = parseInt(req.params.id, 10);
	var matchedMeal = _.findWhere(cart, {id: mealID});

	if(matchedMeal){
		res.json(matchedMeal);
	}else{
		res.status(404).send();
	}
});

//POST /cart *sending meals to your shopping cart

app.post('/cart', function(req, res){
	var body = _.pick(req.body, 'description', 'cost');

	if(!_.isNumber(body.cost) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();
	body.id = NextMealsID++;

	cart.push(body);

	res.json(body);
});

//DELETE /cart/:id *removing meals from your shopping cart

app.delete('/cart/:id', function(req,res){
	var mealID = parseInt(req.params.id,10);
	var matchedMeal = _.findWhere(cart, {id: mealID});

	if(!matchedMeal){
		res.status(404).json({"error": "meal with that ID not found"});
	}else{
		cart = _.without(cart, matchedTodo);
		res.json(matchedMeal);
	}
});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
});
