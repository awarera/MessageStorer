//Loading JSON data
function loadData() {
    $.getJSON("messages.json", function(json) {
        console.log("it worked"); // access the response object
    });
}

loadData();

//Saving user message input
function onSubmit() {
    var message = document.getElementById('message').value;
    window.location.href = ('/messages/add-' + message);
}

//Retrieving saved message with inputted ID
function onRetrieve() {
    var id2 = document.getElementById('id2').value;
    id2 = id2.trim();
    console.log(id2);
    window.location.href = ('/messages/' + id2);
}

//validating user ID input
function validateID() {
    var x;
    x = document.getElementById('id2').value;
    var regex = /.*\S.*/;
    var regex2 = /^[a-zA-Z0-9 -]{2,100}$/;
    if ((regex.test(x)) == false || (regex2.test(x)) == false) {
        alert("Please enter an ID in the correct format");
        return false;
    } else {
        onRetrieve();
    }
}

//validating user message input
function validateMessage() {
    var x;
    x = document.getElementById('message').value;
    var regex = /.*\S.*/;
    var regex2 = /^[a-zA-Z0-9 !?.)(]{1,100}$/;
    if ((regex.test(x)) == false || (regex2.test(x)) == false) {
        alert("Please enter a message (or one without special characters)");
        return false;
    } else {
        onSubmit();
    }
}
