
const register = async () => {
    console.log("register")
    const user = {
        Email: document.getElementById("email").value,
        Password: document.getElementById("password").value,
        FirstName: document.getElementById("firstname").value,
        LastName: document.getElementById("lastname").value,
 

    }
    
        const response = await fetch('api/users/', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            alert(`${response.status}`);
        }
        else {
            alert("register create")
        }
    
    
}



//const login = async () => {
//    const user = {
//        Email: document.getElementById("email").value,
//        Password: document.getElementById("password").value

//    };
//    const response = await fetch('api/users/login', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(user)
//    });
//    const data = await response.json()
//    if (!response.ok) {
//        alert("error")
//        throw new Error(`error! status:${data.status}`)
//    }
//    else {
//        window.location.href = "Products.html"
//        alert("nice")
//        sessionStorage.setItem("user", JSON.stringify(data));
//        window.location.href = "Products.html"


//    }
//}

const login = async () => {
    console.log("gdcrctrf")
    const user = {
        Email: document.getElementById("email").value,
        Password: document.getElementById("password").value

    };
    const response = await fetch('api/Users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json()
    if (!response.ok) {
        console.log("ssssssssssssssssss")
        throw new Error(`error! status:${response.status}`)
    }
    else {
        console.log("gdcrctrf")

        //sessionStorage.setItem("id", response.json.UserId);
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "Products.html"
    }
}



const update = async () => {
    const user = {
        Email: document.getElementById("email").value,
        Password: document.getElementById("password").value,
        FirstName: document.getElementById("firstname").value,
        LastName: document.getElementById("lastname").value,
        UserId: document.getElementById("id").value

    }
    
    const response = await fetch(`api/users/${user.UserId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    
    if (!response.ok) {

        throw new Error(`error! status:${response.status}`)
    }
    else {
        alert("else")
    }
    window.location.href = "HomePage.html"
}
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

       



