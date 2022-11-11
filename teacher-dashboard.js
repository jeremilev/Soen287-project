// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgFGNCDCuhhPGm8dkQujxuix0VpJbS3N0",
  authDomain: "soen287-14875.firebaseapp.com",
  databaseURL: "https://soen287-14875-default-rtdb.firebaseio.com",
  projectId: "soen287-14875",
  storageBucket: "soen287-14875.appspot.com",
  messagingSenderId: "32157055896",
  appId: "1:32157055896:web:d35e1510c1e470604e49ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//define snapshot of user and courselist
const id = localStorage.getItem("userId");
const userRef = doc(db, "users", id);
const userSnap = await getDoc(userRef);
const courselistSnap = await userSnap.get("courseList");
const size = courselistSnap.length;


//TODO: Find a way to not mix the HTML and JavaScript code like "div.innerHTML = ..."
//TODO: Have each course card direct to that course's page.

//Iterate over courseList and create a course card for each course
for (var i = 0; i < size; i++) {
  //Get the course name at index i
  var courseRef = courselistSnap[i];
  var courseSnap = await getDoc(courseRef);
  var courseName = courseSnap.get("name");

  //Add course card div inside the main_panel
  let div = document.createElement('div');
  div.className = 'mp_course';
  div.setAttribute("id", "mp_course");

  //set HTML for each course card
  div.innerHTML = `
        <div class="mp_course1">

        <a class="main-page-a-tag" href="t-course-page.html" 
            onclick="localStorage.setItem('currentCourse', '`+ courseName + `');" >
          <h3>` + courseName + `</h3>
        </a>
      </div>
      <div class="mp_course2">
        <div class="mp_course2_items">Add Assignment</div>
        <div class="mp_course2_items">Input Marks</div>
        <div class="mp_course2_items">View Report</div>
      </div>`;

  document.getElementById('main_panel').appendChild(div);
}