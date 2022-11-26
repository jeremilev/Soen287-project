import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import {
  getDatabase,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import {
  getStorage,
  list,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgFGNCDCuhhPGm8dkQujxuix0VpJbS3N0",
  authDomain: "soen287-14875.firebaseapp.com",
  databaseURL: "https://soen287-14875-default-rtdb.firebaseio.com",
  projectId: "soen287-14875",
  storageBucket: "soen287-14875.appspot.com",
  messagingSenderId: "32157055896",
  appId: "1:32157055896:web:d35e1510c1e470604e49ed",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userId = "G98B1WzUm7b4aDIlEN39"; //johndoe@gmail.com
// const userId="EZQIG2EKhRNUhzW4G8dz3RVpgTp1"; //student2@gmail.com
// const userId = localStorage.getItem('userId');

// const getAnnouncements = async function (className) {
//     //Specify path with commas, so you get database/courses/COMP232-A
//     const docRef = doc(db, "courses", className);

//     //Get the data from the reference above
//     const docSnap = await getDoc(docRef);

//     //If exists
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         //Get the data from that document: IE get the FIELDS DATA
//         try {
//             var announcements = docSnap.get("announcements");
//         } catch (error) {
//             console.log(e);
//         }
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
//     return announcements;
// }

const getCourseList = async function (userId) {
  //Path inside the database
  const docRef = doc(db, "users", userId);
  //Get the data from the reference above
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document dataL:", docSnap.data());
    const userInfo = docSnap.data();

    console.log(userInfo["courseList"]);
    return userInfo["courseList"];
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

const displayCourseList = async function (userId) {
  const courseList = await getCourseList(userId);
  console.log(courseList.length);
  for (let i = 0; i < courseList.length; i++) {
    var courseRef = courseList[i];
    const docRef = doc(db, courseRef);
    var courseSnap = await getDoc(docRef);
    var courseName = courseSnap.get("name");
    console.log(courseRef);
    console.log(courseName);
    let myCourse = document.createElement("div");

    myCourse.className = "my-course";

    myCourse.innerHTML = `
<div class="courseName-Grade">
                            <div class="courseName">
                                <h3><a class="courselink"href="student-course-page.html">${courseName}</a></h3>
                            </div>
                            <div class="courseGrade">
                               67.1%
                            </div>
                        </div>
                        <div class="upcoming-deadlines">
                            <h3>Upcoming...</h3>
                            <div class="deadline">Assignment 1 submission - 1/10/2022</div>
                            <div class="deadline">Lab 2 submission - 15/10/2022</div>
                            <div class="deadline">Assignment 2 submission - 31/10/2022</div>
                        </div>`;

    let middleBar = document.getElementById("middle-bar");

    middleBar.appendChild(myCourse);
  }
};

displayCourseList(userId);

//Dynamically display students name
// let studentName=document.createElement('h1');
// studentName.className="studentName";

// studentName.innerText=niko.userName;

// let name_logo_bar=document.getElementById('name_logo-wrapper')
// name_logo_bar.appendChild(studentName);

//Dynamically create each course box

// let myCourse=document.createElement('div');
// myCourse.className="my-course";

// myCourse.innerHTML=`
// <div class="courseName-Grade">
//                             <div class="courseName">
//                                 <h3><a class="courselink"href="www.google.com">${niko.courseNum1}</a></h3>
//                             </div>
//                             <div class="courseGrade">
//                                67.1%
//                             </div>
//                         </div>
//                         <div class="upcoming-deadlines">
//                             <h3>Upcoming...</h3>
//                             <div class="deadline">Assignment 1 submission - 1/10/2022</div>
//                             <div class="deadline">Lab 2 submission - 15/10/2022</div>
//                             <div class="deadline">Assignment 2 submission - 31/10/2022</div>
//                         </div>`;

// let middleBar=document.getElementById('middle-bar');

// middleBar.appendChild(myCourse);

// Code for Dark Mode implementation
document.getElementById("moon").addEventListener("click", () => {
  document.documentElement.style.setProperty(
    "--main_background-color",
    "#262626"
  );
  document.documentElement.style.setProperty("--navbar_color", "#e6e6e6");
  document.documentElement.style.setProperty(
    "--middle-bar_background-color",
    "#1a1a1a"
  );
  document.documentElement.style.setProperty("--middle-bar_color", "#e6e6e6");
  document.documentElement.style.setProperty(
    "--left-sidebar_background-color",
    "#666666"
  );
  document.documentElement.style.setProperty(
    "--right-sidebar_background-color",
    "#404040"
  );
  document.documentElement.style.setProperty(
    "--learning_resources_background-color",
    "#595959"
  );
  document.documentElement.style.setProperty(
    "--calendar_weekdays_color",
    "#e6e6e6"
  );
  document.documentElement.style.setProperty(
    "--learning_resources_color",
    "#e6e6e6"
  );
});

//Code for Light Mode Implementation
document.getElementById("sun").addEventListener("click", () => {
  document.documentElement.style.setProperty(
    "--main_background-color",
    "#d9d9d9"
  );
  document.documentElement.style.setProperty("--navbar_color", "#000000");
  document.documentElement.style.setProperty(
    "--middle-bar_background-color",
    "#ffffff"
  );
  document.documentElement.style.setProperty("--middle-bar_color", "#000000");
  document.documentElement.style.setProperty(
    "--left-sidebar_background-color",
    "#84a98c"
  );
  document.documentElement.style.setProperty(
    "--right-sidebar_background-color",
    "#52796f"
  );
  document.documentElement.style.setProperty(
    "--learning_resources_background-color",
    "#cad2c5"
  );
  document.documentElement.style.setProperty(
    "--calendar_weekdays_color",
    "#247ba0"
  );
  document.documentElement.style.setProperty(
    "--learning_resources_color",
    "#000000"
  );
});

// ********Calendar Implementation**********

// nav = keep track of which month is desplayed
let nav = 0;
// clicked = day we have selected in the calendar
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const eventTitleInput = document.getElementById("eventTitleInput");
const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteTask");
const backDrop = document.getElementById("modalBackDrop");

function openModal(date) {
  clicked = date;
  const eventForDay = events.find((e) => e.date === clicked);

  if (eventForDay) {
    document.getElementById("taskDesc").innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
  } else {
    newEventModal.style.display = "block";
  }
  backDrop.style.display = "block";
}

function loadCalendar() {
  const date = new Date();
  //Allows us to move between months based on nav value
  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayofMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayofMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
  document.getElementById(
    "display_month"
  ).innerText = `${date.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;
  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day");
    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      dayBox.innerText = i - paddingDays;
      dayBox.style.fontSize = "12px";
      const eventForDay = events.find((e) => e.date === dayString);
      if (eventForDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerText = eventForDay.title;
        dayBox.appendChild(eventDiv);
      }
      dayBox.addEventListener("click", () => openModal(dayString));
    } else {
      dayBox.classList.add("padding");
    }
    calendar.appendChild(dayBox);
  }
}
function closeModal() {
  eventTitleInput.classList.remove("error");
  newEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  clicked = null;
  loadCalendar();
}
function saveTask() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error");
    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });
    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}
function deleteTask() {
  events = events.filter((e) => e.date != clicked);
  localStorage.setItem("events", JSON.stringify(events));
  closeModal();
}

function initializeButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    loadCalendar();
  });

  document.getElementById("previousButton").addEventListener("click", () => {
    nav--;
    loadCalendar();
  });

  document.getElementById("saveButton").addEventListener("click", saveTask);

  document.getElementById("cancelButton").addEventListener("click", closeModal);

  document.getElementById("deleteButton").addEventListener("click", deleteTask);

  document.getElementById("quitButton").addEventListener("click", closeModal);
}
initializeButtons();
loadCalendar();
