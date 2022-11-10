import { getAnnouncements, getAssessments, getAssessmentGrades } from '/queries.js';




//SEMESTER START
/*
const semesterStart = new Date(2022, 8, 5);
const setWeekDatesSemester = function (semesterStart) {
    console.log(semesterStart);
    const semesterWeeks = [];
    for (let i = 0; i < 16; i++) {
        let weekStart = Date.prototype.addDays(semesterStart, 0)
        console.log(weekStart);

        let weekEnd = new Date()
        weekEnd.setDate(weekStart.getDate() + 7);
        semesterWeeks.push([weekStart, weekEnd]);

    }
    return semesterWeeks;
}
let semesterWeeks = setWeekDatesSemester(semesterStart);
console.log(semesterWeeks);
*/

const AllIcons = document.querySelectorAll('.material-symbols-outlined');

/*
    FUNCTIONS for dynamic creation of elements, (after fetching data from the database, 
    it needs to be rendered, these functions create the elements to display).

*/

const generalInfoBlock = document.getElementById('general-info-block');

const courseDescription = document.getElementById('course-description');
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

        //Get data by key name
        subject.innerText = announcement['subject'] + " - " + announcement['datePublished'].toDate().toDateString();
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
        generalInfoBlock.insertBefore(container, courseDescription);
    }
}
const className = "COMP232-A";
displayAnnouncements("COMP232-A");


const displayAssessments = async function (className) {
    var assessmentsMap = await getAssessments(className);
    for (let i = 0; i < Object.keys(assessmentsMap).length; i++) {
        var container = document.createElement('div');
        var title = document.createElement('div');
        var descriptionContainer = document.createElement('div');
        var rowDisplayDiv = document.createElement('div');
        var dueDate = document.createElement('h4');
        var descriptionText = document.createElement('p');
        var file = document.createElement('a');
        var visibilityIcon = document.createElement('i');

        let assessment = assessmentsMap[Object.keys(assessmentsMap)[i]];
        //Give them css formatting **FOR NOW COPIED FROM ABOVE
        container.classList.add('announcement-container');
        title.classList.add('announcement-subject');
        title.style.background = "#52796F"
        descriptionContainer.classList.add('announcement-description');
        file.classList.add('week-block-links');
        visibilityIcon.classList.add('material-symbols-outlined');
        visibilityIcon.classList.add('icons-md-45');
        rowDisplayDiv.classList.add('row-display');
        rowDisplayDiv.style.justifyContent = "space-between";
        //Is it visible?
        if (assessment['visible']) {
            visibilityIcon.innerText = "visibility";
        } else {
            visibilityIcon.innerText = "visibility_off";
        }
        //Make sure it is changeable
        //*****THIS DOES NOT UPDATE INSIDE THE DATABASE AS OF YET
        visibilityIcon.addEventListener('click', () => {
            if (visibilityIcon.innerText == "visibility") {
                visibilityIcon.innerText = "visibility_off";

            } else if (visibilityIcon.innerText == "visibility_off") {
                visibilityIcon.innerText = "visibility";
            }
        })

        //get title from assessment
        let assessmentTitle = Object.keys(assessmentsMap)[i];
        title.innerText = assessmentTitle + " - " + assessment['datePublished'].toDate().toDateString();
        //get dueDate from assessment
        dueDate.innerText = "Due date: " + assessment.dueDate.toDate().toDateString();
        dueDate.style.color = "red";
        dueDate.style.fontWeight = 700;

        //get description from assessment
        if (assessment.description == "") {
            descriptionText.style.display = "none";
        } else {
            descriptionText.innerText = assessment.description;
        }


        //get file from assessment
        //FOR NOW FAKE FILE
        const pdfImg = document.createElement('img');
        pdfImg.classList.add("pdf-img");
        pdfImg.src = "pdf-img.png";
        file.appendChild(pdfImg)
        file.innerText = assessmentTitle + ".pdf"

        //Appending elements 
        rowDisplayDiv.appendChild(dueDate);
        rowDisplayDiv.appendChild(visibilityIcon);
        descriptionContainer.appendChild(rowDisplayDiv);
        descriptionContainer.appendChild(descriptionText);
        descriptionContainer.appendChild(file);
        container.appendChild(title);
        container.appendChild(descriptionContainer);

        generalInfoBlock.appendChild(container);
    }

}
displayAssessments("COMP232-A");


/*

                    <li class="row-display student-grade">
                        <a href="">Student name</a>
                        <input type="number" name="" value="40484844" minlength="8" maxlength="8" id="" disabled>
                        <input type="number" value="75" name="" id="grade-nb" disabled>
                        <label for="grade-nb">/100</label>
                        <div style="background-color: red;">tag</div>
                    </li>

*/

const displayStudentGrades = async function (className, assessmentName) {
    var studentGrades = await getAssessmentGrades(className, assessmentName);
    const studentListUl = document.getElementById("student-list-and-grades");
    for (let i = 0; i < Object.keys(studentGrades).length; i++) {
        var studentGradeItem = document.createElement('li');
        var studentName = document.createElement('a');
        var studentIdInput = document.createElement('input');
        var studentGrade = document.createElement('input');
        var gradeTotalLabel = document.createElement('label');
        var submissionBadge = document.createElement('div');
        submissionBadge.style.color = "white";
        gradeTotalLabel.innerText = "/100";


        studentGradeItem.classList.add('row-display');
        studentGradeItem.classList.add('student-grade');

        studentName.innerText = "Dimitri Kwrjriw";
        //studentName.innerText = studentGrades[Object.keys(studentGrades)[i]];

        studentIdInput.type = "text";
        studentIdInput.disabled = true;
        studentIdInput.value = Object.keys(studentGrades)[i];

        studentGrade.type = "number";
        studentGrade.value = studentGrades[Object.keys(studentGrades)[i]].grade;

        if (studentGrades[Object.keys(studentGrades)[i]].submitted) {
            submissionBadge.innerText = "submitted";
            submissionBadge.style.background = "green";
        } else {
            submissionBadge.innerText = "pending";
            submissionBadge.style.background = "red";
        }

        studentGradeItem.appendChild(studentName);
        studentGradeItem.appendChild(studentIdInput);
        studentGradeItem.appendChild(studentGrade);
        studentGradeItem.appendChild(gradeTotalLabel);
        studentGradeItem.appendChild(submissionBadge);

        studentListUl.appendChild(studentGradeItem);
    }
}

displayStudentGrades("COMP232-A", "Assignment 1");

/*
    MENU ICON: OVERLAY
*/

const menuIcon = document.getElementById('menu-icon');
const menuOverlay = document.getElementById('overlay-menu-icon');

menuIcon.addEventListener('click', function () {
    if (menuIcon.innerText == "menu") {
        menuOverlay.style.display = "flex";
        menuIcon.innerText = "close";
    } else {
        menuOverlay.style.display = "none";
        menuIcon.innerText = "menu";
    }
})


/*
    OVERLAY for Teacher functionalities (add assigments, announcements, grades, etc)
*/
const overlayContainer = document.querySelector('#overlay-container');
const overlayPanel = document.querySelector('#overlay-panel');

const navItemAssignment = document.querySelector('#overlay-nav-item-assignments');
const navItemAnnouncements = document.querySelector('#overlay-nav-item-announcements');
const navItemGrades = document.querySelector('#overlay-nav-item-grades');
const navItemFiles = document.querySelector('#overlay-nav-item-files');

let overlayNavItems = [navItemAssignment, navItemAnnouncements, navItemGrades, navItemFiles];

const assigmentOptions = document.getElementById('overlay-assignment-options')
const assignmentLayout = document.getElementById('assignments-layout');
const announcementLayout = document.getElementById('announcements-layout');
const gradesLayout = document.getElementById('grades-layout');
const filesLayout = document.getElementById('new-file-layout');

navItemAssignment.addEventListener('click', function () {
    assigmentOptions.style.display = "flex";

    assignmentLayout.style.display = "none"
    announcementLayout.style.display = "none";
    gradesLayout.style.display = "none";
    filesLayout.style.display = "none";

})
navItemAnnouncements.addEventListener('click', function () {


    announcementLayout.style.display = "flex";

    //Object.keys(obj).length

    assigmentOptions.style.display = "none";
    assignmentLayout.style.display = "none";
    gradesLayout.style.display = "none";
    filesLayout.style.display = "none";
})

navItemGrades.addEventListener('click', function () {

    gradesLayout.style.display = "flex";

    assigmentOptions.style.display = "none";
    assignmentLayout.style.display = "none";
    announcementLayout.style.display = "none";
    filesLayout.style.display = "none";
})

navItemFiles.addEventListener('click', function () {

    filesLayout.style.display = "flex";

    assigmentOptions.style.display = "none";
    assignmentLayout.style.display = "none";
    announcementLayout.style.display = "none";
    gradesLayout.style.display = "none";
})


const inOverlayNewAssignment = document.getElementById("overlay-new-assignment-btn");
inOverlayNewAssignment.addEventListener('click', function () {
    assignmentLayout.style.display = "flex"

    assigmentOptions.style.display = "none";
    announcementLayout.style.display = "none";
    gradesLayout.style.display = "none";
    filesLayout.style.display = "none";
})


const attachFileBtns = [];

for (let i = 0; i < AllIcons.length; i++) {
    if (AllIcons[i].innerText == "attach_file_add") {
        attachFileBtns.push(AllIcons[i]);
        attachFileBtns[attachFileBtns.length - 1].addEventListener('click', function () {
            overlayContainer.style.display = "flex";
            overlayPanel.style.display = "flex";
            filesLayout.style.display = "flex";

        })
    } else if (AllIcons[i].innerText == "post_add") {
        AllIcons[i].addEventListener('click', function () {
            overlayContainer.style.display = "flex";
            overlayPanel.style.display = "flex";
            assigmentOptions.style.display = "flex";
        })
    } else if (AllIcons[i].innerText == "campaign") {
        AllIcons[i].addEventListener('click', function () {
            overlayContainer.style.display = "flex";
            overlayPanel.style.display = "flex";
            announcementLayout.style.display = "flex";
        })
    } else if (AllIcons[i].innerText == "percent") {
        AllIcons[i].addEventListener('click', function () {
            overlayContainer.style.display = "flex";
            overlayPanel.style.display = "flex";

            assignmentLayout.style.display = "none"
            assigmentOptions.style.display = "none";
            announcementLayout.style.display = "none";
            gradesLayout.style.display = "flex";
            filesLayout.style.display = "none";
        })
    } else if (AllIcons[i].innerText == "close") {
        AllIcons[i].addEventListener('click', function () {
            overlayContainer.style.display = "none";
            overlayPanel.style.display = "none";

            assignmentLayout.style.display = "none"
            assigmentOptions.style.display = "none";
            announcementLayout.style.display = "none";
            gradesLayout.style.display = "none";
            filesLayout.style.display = "none";
        })
    }
}