document.getElementById("contact-me").addEventListener("submit", (e) => { e.preventDefault(); });

function handleSubmit() {
    const form = document.getElementById("contact-me");
    const url = "https://script.google.com/macros/s/AKfycbwkEr2QJYQa8oiKCDL4_1ZGouo1RfbT2j6tEz2-QCkdyXgVcoWvPlo30UJuRTUbCz0/exec";

    const values = {
        "name": form["name"].value,
        "subject": form["subject"].value,
        "email": form["email"].value
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'no-cors',
        body: new URLSearchParams(values).toString()
    }
    fetch(url, options).then((r) => {
        let msg = document.getElementById("msg");
        document.getElementById("msg").style.display = "inline";
        if(r.status == 0) {
            msg.style.color = "#00FF00";
            msg.innerHTML = "Message succesfully sent, I will email you as soon as I can.";
        } else {
            msg.style.color = "#FF0000";
            msg.innerHTML = "Message failed to send. Please try again later or use an alternative method.";
        }
    });
}

function resize() {
    let form = document.getElementById("cform");
    let meth = document.getElementById("meth");
    
    if(form.offsetHeight < meth.offsetHeight) form.style.height = `${meth.offsetHeight}px`;
}