var Todo = require('../model/todo').todo;
exports.index = function(req, res){
    res.sender('index');
};

exports.getTodo = function(req, res){
    Todo.find().exec(function(err, todo){
        if (err)
            return res.send(err);
        return res.json(todo);
    });
};

exports.postTodo = function(req, res){
    Todo.create(req.body, function(err, todo){
        if (err)
            return res.send(err);
        return res.json(todo);
    });
};