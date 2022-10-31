const AllIcons = document.querySelectorAll('.material-symbols-outlined');


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

overlayNavItems = [navItemAssignment, navItemAnnouncements, navItemGrades, navItemFiles];

navItemAssignment.addEventListener('click', function () {
    const assignmentLayout = document.getElementById('assignment-layout');
    assignmentLayout.style.display = "flex";
})

navItemAnnouncements.addEventListener('click', function () {
    const announcementLayout = document.getElementById('announcement-layout');
    announcementLayout.style.display = "flex";
})

navItemGrades.addEventListener('click', function () {
    const gradesLayout = document.getElementById('grades-layout');
    gradesLayout.style.display = "flex";
})

navItemFiles.addEventListener('click', function () {
    const filesLayout = document.getElementById('files-layout');
    filesLayout.style.display = "flex";
})



const attachFileBtns = [];
for (let i = 0; i < AllIcons.length; i++) {
    if (AllIcons[i].innerText == "attach_file_add") {
        attachFileBtns.push(AllIcons[i]);
        attachFileBtns[attachFileBtns.length - 1].addEventListener('click', function () {
            overlayContainer.style.display = "flex";
            overlayPanel.style.display = "flex";
        })
    } else if (AllIcons[i].innerText == "post_add") {
        AllIcons[i].addEventListener('click', function () {
            overlayContainer.style.display = "flex";
            overlayPanel.style.display = "flex";
        })
    } else if (AllIcons[i].innerText == "close") {
        AllIcons[i].addEventListener('click', function () {
            overlayContainer.style.display = "none";
            overlayPanel.style.display = "none";
        })
    }
}

console.log(attachFileBtns);