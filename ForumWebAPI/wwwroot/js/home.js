function userIsAuthorized() {
    const jwt = localStorage.getItem('jwt');
    if (jwt === null) {
        alert("You must be at least moderator to view this content.");
        return false;
    }
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    });
    fetch('https://localhost:7025/api/User/checkAuth', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ some: 'data' })
    })
        .then(response => response.text())
        .then(data => {
            if (data === "admin") {
                window.location.replace("https://localhost:7025/pages/staffDiscussionPosts.html");
            } else if (data === "mod") {
                window.location.replace("https://localhost:7025/pages/staffDiscussionPosts.html");
            } else if (data === "owner") {
                window.location.replace("https://localhost:7025/pages/staffDiscussionPosts.html");
            } else {
                alert("You must be at least moderator to view this content.");
            }
        })
}


var link = document.getElementById("adminPosty");



link.addEventListener("click", function (event) {
    event.preventDefault();
    userIsAuthorized();
});
