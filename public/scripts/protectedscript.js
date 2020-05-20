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

function test1() {
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

function test() {
    var testObj = {
        date: "October2",
        shift: "1"
    }

    var http = new XMLHttpRequest();
    
    //specify verb and url
    http.open('POST', '/api/scheduling/get/', true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
    
    //send request
    http.send(JSON.stringify(testObj));

    //response
    http.onload = function() {
        var response = JSON.parse(http.response);
        console.log(response)
    };
}

//Gets a list of everyone signed up for a shift
function getSheetInfo(date, shift){
    var info = {
        date: date,
        shift: shift
    }

    var http = new XMLHttpRequest();
    
    //specify verb and url
    http.open('POST', '/api/scheduling/get/', true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
    
    //send request
    http.send(JSON.stringify(info));

    //response
    http.onload = function() {
        var response = JSON.parse(http.response);
        setPage(response);
    };
}

function setPage(list){
    list.forEach(element => {
        var job = element.job;
        var phone = element.phone;
        var name = element.name;

        document.getElementById(job).innerText = name;
        document.getElementById(job+"Num").innerText = phone;
    });

    checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");

    docList = document.getElementsByClassName("inputField");
    for (let i = 0; i < docList.length; i++) {
        docList[i].appendChild(checkbox);
    }
}