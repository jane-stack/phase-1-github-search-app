document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // data we want to pass from the form
        fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
        .then(res => res.json())
        .then(res => {
            // username, avatar_url, profile
            const userList = document.getElementById("user-list")
            const repoList = document.getElementById("repos-list")
            repoList.innerHTML = ""
            userList.innerHTML = ""
            res.items.map(item => {
                const li = document.createElement("li")
                const h2 = document.createElement("h2")
                h2.textContent = item.login
                h2.addEventListener("click", e => showUserRepos(item.login, e))
                const img = document.createElement("img")
                img.src = item.avatar_url

                li.append(h2, img)
                userList.append(li)
            })
        })
        form.reset()
    })
})

function showUserRepos(username, e) {
    const repoList = document.getElementById("repos-list")
    repoList.innerHTML = ""
    e.preventDefault()
    // console.log("username", username)
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(res => res.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        li.append(h1)
        repoList.append(li)
    }))
}