
const register = async () => {
    const user = {
        Email: document.getElementById("email").value,
        Password: document.getElementById("password").value,
        FirstName: document.getElementById("firstname").value,
        LastName: document.getElementById("lastname").value

    }
    const response = await fetch('api/users/', {
      
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json()
    //alert("xxxxxxx");
    if (!response.ok) {
        alert(`status: ${response.status} username or password not good😒`);
        //throw new Error(`error! status:${response.status}`)
    }
    else {
        sessionStorage.setItem("user", JSON.stringify(data));

        alert("register success!!")
        window.location.href = "Update.html"
    }
}


//const update = async () => {
//    console.log("update")
//    const user = {
//        Email: document.getElementById("email").value,
//        Password: document.getElementById("password").value,
//        FirstName: document.getElementById("firstname").value,
//        LastName: document.getElementById("lastname").value
//        //id: sessionStorage.getItem('user').id
//    }
//    const Id = JSON.parse(sessionStorage.getItem('user')).id
//    console.log(Id)
//    const response = await fetch(`api/users/${Id}` {

//        method: 'PUT',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(user)
//    });

//    if (!response.ok) {

//        throw new Error(`error! status:${response.status}`)
//    }
//    else {
//        alert("update succesed!!")
//    }
//    window.location.href = "HomePage.html"
//}

const update = async () => {
    debugger;
    console.log("update");
    const userfound = JSON.parse(sessionStorage.getItem('user'));
    const user = {
        Email: document.getElementById("email").value || userfound.email,
        Password: document.getElementById("password").value || userfound.password,
        FirstName: document.getElementById("firstname").value || userfound.firstName,
        LastName: document.getElementById("lastname").value || userfound.lastName,
    };
    debugger;
    const ID = userfound.userId;
    console.log(ID);
    const response = await fetch(`api/users/${ID}`, { // Add a comma here

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const data = await response.json()
    if (!response.ok) {
        throw new Error(`error! status:${response.status}`);
    } else {
        alert("update success!!");
    }
    sessionStorage.setItem("user", JSON.stringify(data));
    window.location.href = "Products.html";
};



const evalutePassword = async () => {
    const Password = document.getElementById("password").value
    const response = await fetch(`api/users/evalutePassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(Password)
    });
    const data = await response.json();
    document.getElementById("password-strength-progress").value = data
    console.log(data);
        
}       



const login = async () => {
    console.log("gdcrctrf")
    const user = {
        Email: document.getElementById("email").value,
        Password: document.getElementById("password").value

    };
    const response = await fetch('api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json()
    if (!response.ok) {
        console.log("ssssssssssssssssss")
        alert("no user!");
        throw new Error(`error! status:${response.status}`)
    }
    else {
        console.log("gdcrctrf")

        //sessionStorage.setItem("id", response.json.UserId);
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "Products.html"        
    }
}


