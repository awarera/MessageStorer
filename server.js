var fs = require('fs');
var express = require('express');
var shortid = require('shortid'); //for generating random/unique ID's
var data = fs.readFileSync('public/messages.json');
var messages = JSON.parse(data);
var app = express();
app.set('view engine', 'ejs'); //templating


var server = app.listen(3000, start);

function start() {
    console.log('server is listening...');
}

app.use(express.static('public'));

// For accessing all messages in JSON format
app.get('/all', sendAll);

function sendAll(request, response) {
    response.send(messages);
}

// ADDING MESSAGE DATA TO JSON
app.get('/messages/add-:message/', addMessage);

function addMessage(request, response) {
    var data = request.params;
    var message = data.message;
    var id = shortid.generate();
    var reply;
    messages[message] = id;
    var data = JSON.stringify(messages, null, 2);
    fs.writeFile('public/messages.json', data, finished);

    function finished() {
        console.log("all set");
        reply = {
            "id": id
        };
        response.render('postsubmission', {
            yourMessage: message,
            unique: id
        });
    }

}

//Function for finding whether ID value exists within JSON
function findValue(o, value) {
    for (var prop in o) {
        if (o.hasOwnProperty(prop) && o[prop] === value) {
            return prop;
        }
    }
    return null;
}


// USING USER INPUTTED ID TO SEARCH FOR MESSAGE
app.get('/messages/:id/', searchMessage);

function searchMessage(request, response) {
    var id = request.params.id;
    if (findValue(messages, id)) {
        response.render('retrieval', {
            yourMessage2: findValue(messages, id)
        });
    } else {
        response.render('wrongID');
    }
}
