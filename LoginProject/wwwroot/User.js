
const register = async () => {
    const user = {
        Email: document.getElementById("email").value,
        Password: document.getElementById("password").value,
        FirstName: document.getElementById("firstname").value,
        LastName: document.getElementById("lastname").value,
       
    }
    const response = await fetch(`api/Users/`, {
      
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json()
    if (response.ok == false) {
        alert(`status: ${response.status} username or password not good😒`);
        //throw new Error(`error! status:${response.status}`)
    }
    else {
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "Products.html"      
    }
}


const update = async () => {
    const userRes = JSON.parse(sessionStorage.getItem('user'))
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const firstName = document.getElementById("firstname").value.trim();
    const lastName = document.getElementById("lastname").value.trim();

    const user = {
        Email: email !== '' ? email : userRes.email,
        Password: password !== '' ? password : userRes.password,
        FirstName: firstName !== '' ? firstName : userRes.firstName,
        LastName: lastName !== '' ? lastName : userRes.lastName,
    };

    
    const response = await fetch("api/Users/" + userRes.userId, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json()
    
    if (response.ok==false) {

        throw new Error(`error! status:${response.status}`)
    }
    else {
        alert("update succesed!!")
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "products.html"
    }
    
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

const register2 = () => {
    window.location.href = "register.html"
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
        throw new Error(`error! status:${response.status}`)
    }
    else {
        console.log("gdcrctrf")

        //sessionStorage.setItem("id", response.json.UserId);
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "move.html"        
    }
}


