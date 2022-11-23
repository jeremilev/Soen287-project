//setup
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getStorage, getStream, ref, getDownloadURL, list } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBgFGNCDCuhhPGm8dkQujxuix0VpJbS3N0",
  authDomain: "soen287-14875.firebaseapp.com",
  databaseURL: "https://soen287-14875-default-rtdb.firebaseio.com",
  projectId: "soen287-14875",
  storageBucket: "soen287-14875.appspot.com",
  messagingSenderId: "32157055896",
  appId: "1:32157055896:web:d35e1510c1e470604e49ed"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//ID for test user: c1grGgLk3cTUf52t8Fb8tpbjv3f1

//define snapshot of user and courselist
// const id = "c1grGgLk3cTUf52t8Fb8tpbjv3f1";
const id = localStorage.getItem("userId");
const userRef = doc(db, "users", id);
const userSnap = await getDoc(userRef);
const courselistSnap = userSnap.get("courseList");
const size = courselistSnap.length;

//TODO: Find a way to not mix the HTML and JavaScript code like "div.innerHTML = ..."

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



async function streamToString(stream) {
  // lets have a ReadableStream as a stream variable
  const chunks = [];

  for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf-8");
}

//Grab JSON file from storage. 
//TODO: Test to make sure it works 
const retrieveJSON = async function(){

  //Create a reference for the file in storage
  const pathReference = ref(storage, 'jsonTest1.json');

  const stream = getStream(pathReference);

  const streamString = streamToString(stream);
  console.log(streamString);
}

jsonTestButton.addEventListener('click', (e) => {
  console.log("Button Clicked");

  // retrieveJSON();
});