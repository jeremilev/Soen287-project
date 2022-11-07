import { getAnnouncements } from '/queries.js';


const AllIcons = document.querySelectorAll('.material-symbols-outlined');

/*
    FUNCTIONS for dynamic creation of elements, (after fetching data from the database, 
    it needs to be rendered, these functions create the elements to display).

*/

const generalInfoBlock = document.getElementById('general-info-block');

const courseDescription = document.getElementById('course-description');
const displayAnnouncements = async function () {
    var announcementsMap = await getAnnouncements();

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

displayAnnouncements();
/*
//DOESNT WORK 
const 

const overlayAnnouncementList = document.getElementById('overlay-announcement-list')
const displayAnnouncements = function (announcementsMap) {
    for (let i = 0; i < announcementsMap.length; i++) {
        let container = document.createElement('div');
        let subject = document.createElement('div');
        let descriptionContainer = document.createElement('div');
        let descriptionText = document.createElement('pre');
        subject.innerText('Midterm date');
        descriptionText.innerText("giwbwi wegiw wg ibgwigbwigbwi w biwggibwbgw igbwi bgwibgwib gwib  wib giwb ");


        container.classList.add('announcement-container');
        subject.classList.add('announcement-subject');
        descriptionContainer.classList.add('announcement-description');

        descriptionContainer.appendChild(descriptionText);

        container.appendChild(subject);
        container.appendChild(descriptionContainer);
        console.log(container);
        overlayAnnouncementList.appendChild(container);
    }

    /*
    WORKED
    var a = document.createElement('div');
    a.classList.add("foo");
    a.textContent = "DID IT WORK?"
    generalInfoBlock.appendChild(a);
    */





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
            displayAnnouncements(5);

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

console.log(attachFileBtns);

/*
const gradesInput = document.querySelector('#grade-nb');

gradesInput.addEventListener('click', (event) => {
    gradesInput.disabled = false;
});

*/