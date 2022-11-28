import { getGrades } from '/student-course-test.js';
//TODO John: Remove getGradesNew once other getGrades has been removed
import {getGrades as getGradesNew} from '/queries.js';


const gradesOverlayContainer = document.getElementById('grades-overlay-container');
// console.log(gradesOverlayContainer);
const gradesOverlayPanel = document.getElementById('grades-overlay-panel');
// console.log(gradesOverlayPanel);
const gradesOverlayLayout = document.getElementById('grades-overlay-layout'); 
const viewGradesBtn = document.getElementById("view-grades-btn");
console.log(viewGradesBtn);

const navItemGrades = document.querySelector('#grades-overlay-nav-item');

const closeBtn = document.getElementById("grades-overlay-close")

viewGradesBtn.addEventListener("click", function() {
    gradesOverlayContainer.style.display = "flex";
    gradesOverlayPanel.style.display = "flex";
    gradesOverlayLayout.style.display = "flex"; 
})
closeBtn.addEventListener("click", function() {
    gradesOverlayContainer.style.display = "none";
    gradesOverlayPanel.style.display = "none";
    gradesOverlayLayout.style.display = "none"; 

})


const gradesOverlayPanelQuery = document.getElementById('grades-overlay-panel');
const gradesOverlayLayoutQuery = document.getElementById('grades-overlay-layout');


const displayGrades = async function () {
    var gradesMap = await getGrades();

    for (let i = 0; i < Object.keys(gradesMap).length; i++) {
        //Create elements to hold data
        var container = document.createElement('div');
        

        //Assign data from announcementsMap
        let grades = gradesMap[Object.keys(gradesMap)[i]];

        //Get data by key name
        container.innerText = grades['gradeName'] + " - " + grades['gradeValue'] + "% - Weight: " + grades['gradeWeight'];
        

        //Give them css formatting
        container.classList.add('grades-container');
        


        //Add elements to the DOM at the right location
        gradesOverlayPanelQuery.insertBefore(container, gradesOverlayLayoutQuery);
    }
}

displayGrades();

const calculateGrade = async function(){
    var gradesMap = await getGrades();
    let totalGrade = 0;
    let sum = 0;
    for (let i = 0; i < Object.keys(gradesMap).length; i++) {
        
        let grades = gradesMap[Object.keys(gradesMap)[i]];
        let weight = gradesMap[Object.keys(gradesMap)[i]];

        


        totalGrade = (grades['gradeValue']*weight['gradeWeight'])/100;
        sum = sum + totalGrade;
        
    }

    
    


    console.log(sum);
    var container = document.createElement('div');
    container.innerText = "Overall Grade: " + sum + "%";
    container.classList.add('overall-grades-container');
    gradesOverlayPanelQuery.insertBefore(container, gradesOverlayLayoutQuery);




 
}

calculateGrade();

//John's Demonstration of getGradesButton

const getGradesButton = document.getElementById("getGradesButton");
getGradesButton.addEventListener("click", async () => {
    //Use when info is saved to localStorage
    // getGrades(localStorage.getItem("userId"), localStorage.getItem("currentCourse"));

    //Hardcoded for now
    var gradesData = await getGradesNew("MsgYjevzqvTtwYf77p0CrXyM2Yy2", "COMP232-B");

    //Iterate over the gradesData to display data
    const size = gradesData.assessmentIDs.length;
    for (var i = 0; i < size; i++){
        console.log(gradesData.assessmentIDs[i] + " - Weight: " + gradesData.weights[i] + " Grade: " + gradesData.grades[i]);
    }
})




