let input = document.querySelector('.get-repos input');
let btn = document.querySelector('.get-btn');
let reposData = document.querySelector('.show-data');

btn.onclick = () => {
    getRepos();
}

function getRepos() {
    if (input.value === "") {
        reposData.innerHTML = "<span>Please Write Github Username</span>"
    } else {
        fetchRepositories()
    }
}

function fetchRepositories() {
    fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response) => {
            return response.json()
        })
        .then((repositories) => {
            reposData.innerHTML = "";
            repositories.forEach(repo => {
                showContent(repo)
            });
        });
}

function showContent(repo) {
    let mainDiv = document.createElement('div');
    let repoName = document.createElement('p');
    repoName.textContent = repo.name;
    mainDiv.appendChild(repoName);
    let theUrl = document.createElement('a');
    let urlText = document.createTextNode('visit');
    theUrl.appendChild(urlText);
    theUrl.href = `https://github.com/${input.value}/${repo.name}`;
    theUrl.setAttribute('target','_blank');
    mainDiv.appendChild(theUrl);
    let starsSpan = document.createElement('span');
    let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
    starsSpan.appendChild(starsText);
    mainDiv.appendChild(starsSpan);
    mainDiv.className = 'repo-box';
    reposData.appendChild(mainDiv);
}