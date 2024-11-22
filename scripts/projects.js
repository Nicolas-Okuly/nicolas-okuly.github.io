function filterList() {
    var input = document.getElementById("q");
    var filter = input.value.toUpperCase();
    var ul = document.getElementById("projects");
    var li = ul.getElementsByTagName('li');
    var a, i, txtValue;

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("project-name")[0];
        txtValue = a.innerHTML || a.innerText || a.textContent;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
    }
}

async function setGhToken(token) {
  document.cookie = `ghToken=${token}`;
}

async function getGithubRepos(){
  const template = '<a class="project-link" href="{{PROJECT_URL}}" target="_blank"><div class="project-item"><h3 class="project-name">{{PROJECT_NAME}}</h3><i class="fa fa-github"></i> <p class="project-desc">{{PROJECT_DESC}}</p><ul class="stats"><li>Stars: {{PROJECT_STARS}}</li><li>Watchers: {{PROJECT_WATCHERS}}</li><li>Forks: {{PROJECT_FORKS}}</li></ul></div></a>'
  let cookie = document.cookie.split("ghToken=")[1];
  var repos;
  var html = "";
  var usableArr = [];

  if (!cookie) repos = await (await fetch("https://api.github.com/users/nicolas-okuly/repos?sort=updated")).json();
  else repos = await (await fetch("https://api.github.com/users/nicolas-okuly/repos?sort=updated", {
    headers: {
      "Authorization": `Bearer ${cookie}`
    }
  })).json();

  if(repos.status == 404 || repos.status == 403) return document.getElementsByClassName("github")[0].style.display = "none";

  repos.forEach(repo => {
    let obj = {
      name: repo.name,
      desc: repo.description || "No description provided.",
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count
    }
    usableArr.push(obj);
  });

  usableArr.forEach(repo => {
    html += template
    .replaceAll("{{PROJECT_URL}}", repo.url)
    .replaceAll("{{PROJECT_NAME}}", repo.name)
    .replaceAll("{{PROJECT_DESC}}", repo.desc)
    .replaceAll("{{PROJECT_STARS}}", repo.stars)
    .replaceAll("{{PROJECT_WATCHERS}}", repo.stars)
    .replaceAll("{{PROJECT_FORKS}}", repo.forks);
  });
  
  document.getElementsByClassName("gh-projects")[0].innerHTML = html;
}

getGithubRepos();