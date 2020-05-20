//Logs the user out
function logout() {
    var http = new XMLHttpRequest();
    
    //specify verb and url
    http.open('GET', '/logout');
    
        
    //send request
    http.send();
    
    //response
    http.onload = function() {
    var response = JSON.parse(http.response);
        window.location.replace("/protected");
    };
}

function test() {
    var testObj = {
        date: "October2",
        shift: "1",
        job: "Fryer1"
    }

    var http = new XMLHttpRequest();
    
    //specify verb and url
    http.open('POST', '/api/scheduling/add/', true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
    
    //send request
    http.send(JSON.stringify(testObj));
}