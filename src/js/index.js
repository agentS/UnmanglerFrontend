"use strict";
var BACKEND_URL = "http://127.0.0.1:80/unmangler/unmangle?mangled=";
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        document.getElementById("search").onsubmit = unmangleName;
    }
};
function unmangleName(event) {
    event.preventDefault();
    var mangledTextInput = document.getElementById("txtMangled");
    var mangled = mangledTextInput.value;
    var request = new XMLHttpRequest();
    request.open("GET", BACKEND_URL + mangled);
    request.onload = function () {
        document.getElementById("result").setAttribute("class", "line");
        var unmangledTextJSON = JSON.parse(request.responseText);
        var unmangledTextOutput = document.getElementById("txtUnmangled");
        unmangledTextOutput.value = unmangledTextJSON.result;
    };
    request.onerror = function () {
        alert("Error on unmangling the name. Check your browser console for details.");
    };
    request.send();
}
