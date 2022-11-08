// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

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


// ID's for reference (fake database):
// John: g6hCS9rOmXVXEsHsyCDU
// Jeremi: S1IBkMUJEUXHrf9V6Ys2

// ID's for reference (real database):
const id1 = "48OqM7Q2oSWYaKRujIWG"  //1 course
const id2 = "2bZba8mhiWTYjyayqRSH" //2 courses


//define snapshot of user and courselist
const id = id2;
const userRef = doc(db, "users", id);
const userSnap = await getDoc(userRef);
const courselistSnap = userSnap.get("courseList");
const size = courselistSnap.length;

//TODO: Find a way to not mix the HTML and JavaScript code like "div.innerHTML = ..."
//TODO: Have each course card direct to that course's page.

//Iterate over courseList and create a course card for each course
for (var i = 0; i < size; i++){
  //Get the course name at index i
  var courseRef = courselistSnap[i];
  var courseSnap = await getDoc(courseRef);
  var courseName= courseSnap.get("name");

  //Add course card div inside the main_panel
  let div = document.createElement('div');
        div.className = 'mp_course';
        div.setAttribute("id", "mp_course");

        div.innerHTML = `
        <div class="mp_course1">

        <a class="main-page-a-tag" href="t-course-page.html">
          <h3>` + courseName +`</h3>
        </a>
      </div>
      <div class="mp_course2">
        <div class="mp_course2_items">Add Assignment</div>
        <div class="mp_course2_items">Input Marks</div>
        <div class="mp_course2_items">View Report</div>
      </div>`;

        document.getElementById('main_panel').appendChild(div);
}


//---------------------------------------------------//
// Intermediate tests that may be useful references: //
//---------------------------------------------------//


// docRef.get().then((doc) => {
//     if (doc.exists) {
//         const arrayField = doc.data().arrayField; 

//         // arrayField is a JavaScript Array, you can use any method or property  
//         // e.g. get index 0
//         const arrayFieldFirstElement = arrayField[0];
//         console.log(arrayFieldFirstElement);

//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });


// //Succesful test to see if I can add a collection and document to the db.
// try {
//     const docRef = await addDoc(collection(db, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }

// //Successful test to read documents.
// const querySnapshot = await getDocs(collection(db, "Users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });