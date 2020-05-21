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
        job: "Fryer2",
        name: "Jack!"
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

//A helper function for loading the page
function setPage(list){
    //Fills each row for which a user has volunteered
    list.forEach(element => {
        var job = element.job;
        var phone = element.phone;
        var name = element.name;
        var sub = element.sub;

        document.getElementById(job).innerText = name;
        document.getElementById(job+"Num").innerText = phone;
        document.getElementById(job+"Sub").innerText = sub;
    });

    //Places a signup button in each row that hasn't been filled
    docList = document.getElementsByClassName("inputField");
    for (let i = 0; i < docList.length; i++) {

        if(docList[i].innerText == '') {
            var id = docList[i].attributes.id.value;

            var btn1 = document.createElement("button");
            btn1.setAttribute("onclick", "signup('"+id+"')");
            btn1.setAttribute("class", "btn-lg btn-dark");
            btn1.innerText="SIGN UP";
            
            docList[i].appendChild(btn1);
        }
        
    }
    
}

//Loads the signup form
function signup(job) {

    //Shows the signup form position: fixed; z-index: 10;
    document.getElementById("signupForm").setAttribute("style", "display:inline-block; z-index:10;");
}