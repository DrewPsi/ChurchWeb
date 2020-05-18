//Calls the backend to log the user in
function login(event){
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email != "" && password !="") {
        var loginData = {
            email: email,
            password: password
        }
        
        var http = new XMLHttpRequest();
    
        //specify verb and url
        http.open('POST', '/api/users/login/', true);
    
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
    
        //send request
        http.send(JSON.stringify(loginData));
    
        //response
        http.onload = function() {
            var response = JSON.parse(http.response);
            if ("Logged in!" == response){
                window.location.replace("/protected");
            }
            alert(response);
        };
    }
    else {
        alert("Please complete all fields before attempting to log in.");
    }
    
}

//Calls the backend to register the user for the site
function register(event) {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    
    if (firstName != "" && lastName != "" && email != "") {
        var userData = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        
        var http = new XMLHttpRequest();
    
        //specify verb and url
        http.open('POST', '/api/users/register/', true);
    
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
    
        //send request
        http.send(JSON.stringify(userData));
    
        //response
        http.onload = function() {
            var response = JSON.parse(http.response);
            alert(response); 
        };
    }
    else {
        event.preventDefault();
        alert("Please complete all fields before submitting.");
    }
}

//Loads the forgot password page by changing display styles
function loadForgotPassword() {
    var login = document.getElementById("loginForm");
    login.style.display = "none";
    
    var forgot = document.getElementById("forgotPasswordForm");
    forgot.style.display = "block";
}

//Calls the backend to send a user an email with their password
function forgotPassword(event) {
    event.preventDefault();
    var email = document.getElementById("emailForgot").value;
    
    if (email != ""){
        userData = {email:email};

        var http = new XMLHttpRequest();
    
        //specify verb and url
        http.open('POST', '/api/users/forgotpassword/', true);
    
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
    
        //send request
        http.send(JSON.stringify(userData));
    
        //response
        http.onload = function() {
            var response = JSON.parse(http.response);
            if (response == "An email has been sent to you with your password.") {
                window.location.reload();
            }
            alert(response); 
        };
    }
    else {
        event.preventDefault();
        alert("Please input your email before submitting.");
    }
}

//Makes all nav items inactive
function removeAllActive() {
    document.getElementById("homeNav").classList.remove('active');
    document.getElementById("aboutNav").classList.remove('active');
    document.getElementById("signupNav").classList.remove('active');
    document.getElementById("loginNav").classList.remove('active');
}

//Makes the home nav item active
function onHome() {
    removeAllActive();
    document.getElementById("homeNav").classList.add('active');
}

//Makes the about nav item active
function onAbout() {
    removeAllActive();
    document.getElementById("aboutNav").classList.add('active');
}

//Makes the signup nav item active
function onSignup() {
    removeAllActive();
    document.getElementById("signupNav").classList.add('active');
}

//Makes the login nav item active
function onLogin() {
    removeAllActive();
    document.getElementById("loginNav").classList.add('active');
}