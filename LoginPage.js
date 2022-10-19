const studentButton = document.getElementsByClassName("studentButton");
const profButton = document.getElementById("profbutton");

function clickProf() {
    document.getElementById("profbutton").style.background = "white";
    document.getElementById("profbutton").style.width = "102%";
    document.getElementById("profbutton").style.marginLeft = "100px";
    document.getElementById("profbutton").style.borderRadius = "100px";
    document.getElementById("professor").style.background = "white";
    document.getElementById("professor").style.color = "black";
    document.getElementById("studButton").style.background = "#52796F";
    document.getElementById("student").style.color = "white";
    document.getElementById("student").style.background = "#52796F";

}



function clickStudent() {
    document.getElementById("studButton").style.background = "white";
    document.getElementById("studButton").style.width = "102%";
    document.getElementById("studButton").style.marginLeft = "100px";
    document.getElementById("studButton").style.borderRadius = "100px";
    document.getElementById("student").style.background = "white";
    document.getElementById("student").style.color = "black";
    document.getElementById("profbutton").style.background = "#52796F";
    document.getElementById("professor").style.color = "white";
    document.getElementById("professor").style.background = "#52796F";
}
