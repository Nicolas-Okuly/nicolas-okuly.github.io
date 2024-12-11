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


async function pullSpreadData(){
  const sheet_url = "https://docs.google.com/spreadsheets/d/15ZJYjfi5bfpf0hLNjA4ZT2L8pp5twB-UxxYgxR-wh9U/export?format=csv";

  const data = await (await fetch(sheet_url)).text();
  let dataArr = data
  .split("\n")
  .slice(1);

  let jsonArr = [];
  dataArr.forEach(arr => {
    let usableData = arr
      .match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)
      .map(value => value.replace(/^"|"$/g, ''));
    let json = {
      "name": usableData[0],
      "description": usableData[1],
      "technology": usableData[2],
      "date": usableData[3],
      "keyFeatures": usableData[4],
      "comptency": usableData[5],
      "challenges": usableData[6],
      "outcomes": usableData[7],
      "link": usableData[8]
    }

    jsonArr.push(json);
  });
  const template = "<div class='project'><h3 class='project-name'>{{PROJECT_NAME}}</h3><p class='project-desc'>{{PROJECT_DESC}}</p><hr><div class='project_meta'><div class='project_group'><h4>Technology Used</h4><p>{{TECHNOLOGY}}</p></div><div class='project_group'><h4>Date Completed</h4><p>{{DATE_COMPLETED}}</p></div><div class='project_group'><h4>Key Features</h4><p>{{KEY_FEATURES}}</p></div><div class='project_group'><h4>Skills Displayed</h4><p>{{COMPETENCY}}</p></div><div class='project_group'><h4>Challenges Faced</h4><p>{{CHALLENGES}}</p></div><div class='project_group'><h4>Outcomes/Results</h4><p>{{OUTCOMES}}</p></div></div><div id='proj-link'><a href='{{LINK}}' target='_blank'>View Project</a></div></div>"

  const subject = document.getElementById("projects");

  jsonArr.forEach(item => {
    let inject = template
    .replace("{{PROJECT_NAME}}", item.name)
    .replace("{{PROJECT_DESC}}", item.description)
    .replace("{{TECHNOLOGY}}", item.technology)
    .replace("{{DATE_COMPLETED}}", item.date)
    .replace("{{KEY_FEATURES}}", item.keyFeatures)
    .replace("{{COMPETENCY}}", item.comptency)
    .replace("{{CHALLENGES}}", item.challenges)
    .replace("{{OUTCOMES}}", item.outcomes)
    .replace("{{LINK}}", item.link)
    .replace("<a href='N/A\r' target='_blank'>View Project</a>", '');

    subject.innerHTML += `<li>${inject}</li>`;
  });

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
      forks: repo.forks_count,
      forked: repo.fork
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