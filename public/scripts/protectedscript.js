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

//Loads the sheet for a given date and shift
function getSheetInfo(date, shift){
    //A helper function for loading the page
    function setPage(list){

        //Places a signup button in each row
        docList = document.getElementsByClassName("inputField");
        for (let i = 0; i < docList.length; i++) {
            var id = docList[i].attributes.id.value;

            //Clears out the row
            document.getElementById(id+"Num").innerText = "";
            document.getElementById(id+"Sub").innerText = "";
            docList[i].innerHTML = "";

            var btn1 = document.createElement("button");
            btn1.setAttribute("onclick", "loadSignup('"+id+"')");
            btn1.setAttribute("class", "btn-lg btn-dark");
            btn1.innerText="SIGN UP";
                
            docList[i].appendChild(btn1);
        }

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
        
    }

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

//Loads the signup form
function loadSignup(job) {

    function getUserInfo(){
        var http = new XMLHttpRequest();
    
        //specify verb and url
        http.open('GET', '/api/users/getinfo/', true);
        
        //send request
        http.send();

        //response
        http.onload = function() {
            var response = JSON.parse(http.response);
            document.getElementById("name").value = response.name;
            document.getElementById("phone").value= response.phone;
            document.getElementById("sub").value= response.name;
        };
    }
    
    getUserInfo();

    //Hides the table
    document.getElementById("signupSheet").setAttribute("style", "display:none");

    //Shows the signup form position: fixed; z-index: 10;
    document.getElementById("signupForm").setAttribute("style", "display:none");
    document.getElementById("signupForm").setAttribute("style", "display:inline-block; ");

    document.getElementById("job").value = job
}

//Closes the signup form
function closeSignup() {
    //Shows the table
    document.getElementById("signupSheet").setAttribute("style", "display:inline-block");

    //Hides the signup form
    document.getElementById("signupForm").setAttribute("style", "display:none");
}

//A function that returns the current selected shift on the navbar
function getDate() {
    dateList = document.getElementsByClassName("date");
    for (let i = 0; i < dateList.length; i++) {
        if(dateList[i].attributes.class.value == "nav-item date active") {
            return dateList[i].attributes.id.value
        }
    }
}

//Reloads the page when a date is navigated to
function loadDate(date) {
    //A function that deactivates all dates on the navbar
    function deDate() {
        var dateList = document.getElementsByClassName("date");
        for (let i = 0; i < dateList.length; i++) {
            dateList[i].classList.remove("active");
        }
    }

    deDate();
    document.getElementById(date).classList.add("active");
    
    getSheetInfo(date, getShift());
}

//A function that returns the current selected date on the navbar
function getShift() {
    shiftList = document.getElementsByClassName("shift");
    for (let i = 0; i < shiftList.length; i++) {
        if(shiftList[i].attributes.class.value == "nav-item shift active") {
            return shiftList[i].attributes.id.value
        }
    }
}

//Reloads the page when a shift is navigated to
function loadShift(shift) {
    //A function that deactivates all shifts on the navbar
    function deShift() {
        var shiftList = document.getElementsByClassName("shift");
        for (let i = 0; i < shiftList.length; i++) {
            shiftList[i].classList.remove("active");
        }
    }

    deShift();
    document.getElementById(shift).classList.add("active");

    getSheetInfo(getDate(), shift);
}

//Signs the user up
function signup() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var job = document.getElementById("job").value;
    var shift = getShift();
    var date = getDate();
    var sub = document.getElementById("sub").value;

    if (name != "" && phone != ""){
        subData = {
            name: name,
            phone: phone,
            job: job,
            shift: shift,
            date: date,
            sub: sub
        };
        
        var http = new XMLHttpRequest();
    
        //specify verb and url
        http.open('POST', '/api/scheduling/add', true);
    
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
    
        //send request
        http.send(JSON.stringify(subData));
    
        //response
        http.onload = function() {
            var response = JSON.parse(http.response);
            alert(response); 
            closeSignup();
            getSheetInfo(date,shift);
        };

    }
    else {
        alert("Please fill in all fields");
    }

}