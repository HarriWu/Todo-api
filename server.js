var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = []; 
var todosNextId = 1;
var bodyParser = require('body-parser'); //parsing always means accepting textual 
//data as input and translating it into a format more easily processed by the computer
var _ = require('underscore');
app.use(bodyParser.json()); //always access body middleware accesses the body in json which 
//is javasript object with keys in double quotation marks

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);

});
app.get('/todos', function (req, res) {
	res.json(todos);
});
app.get('/todos/:id', function (req, res) {
	var id = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: id});
	//_.findWhere searches through array todos 
	//and returns first value where id=id
	// for(var i = 0; i < todos.length; i++) {
	// 	if(todos[i].id === id) {
	// 		res.json(todos[i]);
	// 	}
	// }
	// res.status(404).send();
	if(matchedTodo) //if matchedTodo not null
		res.json(matchedTodo);
	else
		res.status(404).send();
});
app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// Post /todos

app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed') ; //you're requesting/getting the body which is json
	//console.log('description ' + body.description ); // as you can see the json body is accessed 
	//like you would with a normal javascript object

	//.trim gets rid of all spaces before and after letters so you can check whether they put all stuff in by checking the length
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0) {
		return res.status(400).send();
	}
	body.id = todosNextId++; //add id field and set id to todosNextId than todosNextId is incremented
	body.description = body.description.trim();
	todos.push(body);

	res.json(body);
});

app.delete('/todos/:id', function(req, res) {
	var todoid = parseInt(req.params.id, 10);
	//findWhere returns the object with "id" = id
	var matchedTodo = _.findWhere(todos, {id: todoid});
	if(!matchedTodo)
		res.status(404).json("error no todo found with that id");
	else{
	todos = _.without(todos, matchedTodo);
	res.json(todos);
	res.json(matchedTodo);
	}
});


