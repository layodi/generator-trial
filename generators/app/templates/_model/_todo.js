var mongoose = require('mongoose');
var todo = mongoose.model('Todo', {
    content: String
});

exports.todo = todo;