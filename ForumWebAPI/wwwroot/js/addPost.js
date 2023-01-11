(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})();

var myVariable = "User!";
const jwt = localStorage.getItem('jwt');
if (jwt === null) {
    myVariable = "User Error";
} else {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    });
    fetch('https://localhost:7025/api/User/whoiam', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ some: 'data' })
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById("usernameDisplay").innerHTML = data;
        })
}

const addPosta = document.forms['addPosta'];

addPosta.addEventListener('submit', function (e) {
    e.preventDefault();
    if (addPosta.checkValidity()) {
        var topic = document.getElementById('topic').value;
        var content = document.getElementById('content').value;
        var image = document.getElementById('image').files[0];

        const formData = new FormData();
        formData.append('topic', topic);
        formData.append('content', content);
        formData.append('image', image, {
            contentType: 'image/jpeg',
            filename: 'image.jpg'
        });

        const jwt = localStorage.getItem('jwt');
        if (jwt === null) {
            alert("Sign in to proceed.");
            window.location.replace("https://localhost:7025/pages/home.html");
            return false;
        } else {
            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            });
            fetch('https://localhost:7025/api/User/signPost', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ some: 'data' })
            })
                .then(response => response.text())
                .then(data => {
                    var role = data.split(" ")[1];
                    var section = "default";
                    var email = data.split(" ")[0];
                    console.log(data.split(" "));
                    formData.append('role', role);
                    formData.append('section', section);
                    formData.append('email', email);
                    for (var pair of formData.entries()) {
                        console.log(pair[0] + ', ' + pair[1]);
                    }
                    fetch('https://localhost:7025/api/Post/newpost', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            // 'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${jwt}`
                        }
                    }).then(response => response.text())
                        .then(data => {
                            if (data == "Successfully created a new post.") {
                                setTimeout(function () {
                                    window.location.replace("https://localhost:7025/pages/homeLoggedIn.html");
                                }, 3000);
                            }
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                })
        }
    }
});

const loginForm = document.forms['wyloguj'];

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.replace("https://localhost:7025/pages/home.html");
});