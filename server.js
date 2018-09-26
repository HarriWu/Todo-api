var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Call/message mom',
	completed: false
}, {
	id: 2,
	description: 'Do lab 3',
	completed: false
}, {
	id: 3,
	description: 'LIke huhu',
	completed: true
}];
app.get('/todos', function (req, res) {
	res.json(todos);
});
app.get('/todos/:id', function (req, res) {
	var id = parseInt(req.params.id, 10);
	for(var i = 0; i < todos.length; i++) {
		if(todos[i].id === id) {
			res.json(todos[i]);
		}
	}
	res.status(404).send();
});
app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);

});
