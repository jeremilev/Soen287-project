import { getGrades } from '/student-course-test.js';
import { getAnnouncements } from '/student-course-test.js';


const gradesOverlayContainer = document.getElementById('grades-overlay-container');
console.log(gradesOverlayContainer);
const gradesOverlayPanel = document.getElementById('grades-overlay-panel');
console.log(gradesOverlayPanel);
const gradesOverlayLayout = document.getElementById('grades-overlay-layout'); 
const viewGradesBtn = document.getElementById("view-grades-btn");
console.log(viewGradesBtn);




const courseAnnouncements = document.getElementById('course-announcements');
const currentCourse = "COMP232-B";
console.log(currentCourse);
const courseName = document.getElementById('course-name');
courseName.innerText = currentCourse;

const courseText = document.getElementById('course-text');
const displayAnnouncements = async function (className) {
    var announcementsMap = await getAnnouncements(className);

    for (let i = 0; i < Object.keys(announcementsMap).length; i++) {
        //Create elements to hold data
        var container = document.createElement('div');
        var subject = document.createElement('div');
        var descriptionContainer = document.createElement('div');
        var descriptionText = document.createElement('p');
        
    

    

        //Assign data from announcementsMap
        let announcement = announcementsMap[Object.keys(announcementsMap)[i]];

        let date = new Date(announcement['datePublished']);
        //Get data by key name
        subject.innerText = announcement['subject'] + " - " + date;
        descriptionText.innerText = announcement['description'];

        //Give them css formatting
        container.classList.add('announcement-container');
        subject.classList.add('announcement-subject');
        descriptionContainer.classList.add('announcement-description');

        //Add elements to the main container to form a component
        descriptionContainer.appendChild(descriptionText);
        container.appendChild(subject);
        container.appendChild(descriptionContainer);

        //Add elements to the DOM at the right location
        courseAnnouncements.insertBefore(container, courseText); 
    }
}
displayAnnouncements(currentCourse);











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






