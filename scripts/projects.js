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