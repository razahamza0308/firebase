// Signup Page function
function signup() {
    var fullName = document.getElementById("fullName");
    var email = document.getElementById("email");
    var age = document.getElementById("age");
    var number = document.getElementById("phoneNumber");
    var password = document.getElementById("password");
    var address = document.getElementById("address");
    var message = document.getElementById("message");
    var obj = {
        fullName: fullName.value,
        email: email.value,
        age: age.value,
        number: number.value,
        password: password.value,
        address: address.value,

    };
    for (var x in obj) {
        if (obj[x] === "") {
            message.innerText = "Invalid Credential";
            setTimeout(() => {
                message.innerText = ""
            }, 2000)
            return;
        }
    }
    // console.log(obj);
    var users = JSON.parse(localStorage.getItem("list")) || [];
    var checkIndx = users.findIndex(function(val) {
        return val.email.toLowerCase() === obj.email.toLowerCase()
    })
    if (checkIndx === -1) {
        users.push(obj)
        localStorage.setItem("list", JSON.stringify(users))
        message.innerText = "Account Created Successfully You are going to login page"

        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            firebase.database().ref(`users`).child(res.user.uid).set(obj)
        
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log("error=>", errorMessage)
        });

        setTimeout(() => {
            location.href = "index.html"
        }, 5000)
    } else {
        message.innerText = "User Email Exists "
    }
    console.log(users);

    setTimeout(() => {
        message.innerText = ""
    }, 2000)

}


// Login Page function
function login() {
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    var message = document.getElementById("message")

    var obj = {
        email: email.value,
        password: password.value,
    };
    if (email.value === "" || password.value === "") {
        message.innerText = "Invalid Credential";
        setTimeout(() => {
            message.innerText = ""
        }, 2000)
        return;
    }

    var users = JSON.parse(localStorage.getItem("list")) || []
    var currentUser = users.find(function(val) {
        return val.email.toLowerCase() === obj.email.toLowerCase() && val.password === obj.password
    });
    if (currentUser) {
        localStorage.setItem("login user", JSON.stringify(currentUser))
        message.innerText = "Welcome!";

        let email = document.getElementById("email");
    let password = document.getElementById("password");
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            firebase.database().ref(`users/${user.uid}`)
            .once('value',(obj)=>{
                console.log(obj.val())
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });

        setTimeout(() => {
            location.href = "home.html"
        }, 1000)

    } else {
        message.innerText = "Wrong email or password"
    }
    setTimeout(() => {
        message.innerText = ""
    }, 2000)
}


// for Logout
function logout() {
    var message = document.getElementById("message")
    localStorage.removeItem("login user")
    message.innerText = " Good Bye!"
    setTimeout(() => {
        location.href = "index.html"
    }, 2000)
}


// Current User on index.html
function getCurrentUser() {
    var welcome = document.getElementById("welcome")
    var info1 = document.getElementById("info1");
    var info2 = document.getElementById("info2");
    var info3 = document.getElementById("info3");
    var info4 = document.getElementById("info4");
    // var info5 = document.getElementById("info5");
    var info6 = document.getElementById("info6");
    var loginUser = JSON.parse(localStorage.getItem("login user"));
    welcome.innerText = `Welcome! ` + loginUser.fullName
    info1.innerText = `Name: ` + loginUser.fullName
    info2.innerText = `Email: ` + loginUser.email
    info3.innerText = `Age: ` + loginUser.age
    info4.innerText = `Phone Number: ` + loginUser.number
    // info5.innerText = `Password: ` + loginUser.password
    info6.innerText = `Address: ` + loginUser.address

}


// Div for inputText Bar
var inputText = document.getElementById("inputText");


