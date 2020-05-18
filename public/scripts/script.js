function test(){
    var http = new XMLHttpRequest();

    var testObj = {
        firstName: "AL",
        lastName: "big",
        email: "bigman@gmail.com",
        password: "12345"
    }

    //specify verb and url
    http.open('POST', '/api/users/register/', true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');

    //send request
    http.send(JSON.stringify(testObj));

    //response
    http.onload = function() {
        var response = JSON.parse(http.response);
        alert(response);
    };
}

function login(event){
    event.preventDefault();
    var loginData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    console.log(loginData);
    var http = new XMLHttpRequest();

    //specify verb and url
    http.open('POST', '/api/users/login/', true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');

    //send request
    http.send(JSON.stringify(loginData));
}