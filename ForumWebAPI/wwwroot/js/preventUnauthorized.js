window.onload = function () {
    const jwt = localStorage.getItem('jwt');
    if (jwt === null) {
        alert("Sign in to continue.");
        window.location.href = "/pages/home.html";
    } else {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        });
        fetch('/api/User/rolegetter', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ some: 'data' })
        })
            .then(response => response.text())
            .then(data => {
                if(data == "administrator" || data == "moderator" || data == "owner"){
                } else if (data == "default"){
                    window.location.href = "/pages/homeLoggedIn.html";
                } else {
                    window.location.href = "/pages/home.html";
                }
            })
    }
};