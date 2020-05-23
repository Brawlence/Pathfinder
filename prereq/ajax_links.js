const request = new XMLHttpRequest();
var clickEvent = "ontouchstart" in window ? "touchend" : "click";

request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
        history.replaceState(null, "", request.responseURL);
        document.getElementsByTagName("title")[0].outerHTML = request.responseText.match(/\<title\>[\s\S]+\<\/title\>/)[0];
        document.getElementsByTagName("meta")[3].outerHTML = request.responseText.match(/\<meta name="description" content=".+?"\>/)[0];
        document.getElementById("ajaxable").outerHTML = request.responseText.match(/\<div id="ajaxable"\>[\s\S]+\<\/div\>/)[0];
    }
});

function initiateShift (e) {
    if (e.target.className === "ajax") {
        e.preventDefault();
        let url = e.target.href;
        request.open('GET', url);
        request.setRequestHeader('Content-Type', 'application/x-www-form-url');
        request.send();
        return false;
    }
}

document.body.addEventListener(clickEvent, initiateShift, false);