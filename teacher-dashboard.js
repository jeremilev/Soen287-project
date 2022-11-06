// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfrNo-3SfrFNNti469KwNpTv2iCKxVwSQ",
  authDomain: "john-test-e329f.firebaseapp.com",
  projectId: "john-test-e329f",
  storageBucket: "john-test-e329f.appspot.com",
  messagingSenderId: "211133334632",
  appId: "1:211133334632:web:e09f037587a5a655a0a7dd",
  measurementId: "G-CV815CMGL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


//Intermediate tests to dynamically displaying a different number of course cards depending on number of courses a user has in database:

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


// //Successful test to access and log to console: a specific field of a document. 
// const docRef = doc(db, "Users", "S1IBkMUJEUXHrf9V6Ys2"); //Returns a reference to a document
// const docSnap = await getDoc(docRef); //Returns a snapshot of document reference
// if (docSnap.exists()) {
//     console.log("Document name:", docSnap.get("name")); 
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }


// ID's for reference: 
// John: g6hCS9rOmXVXEsHsyCDU
// Jeremi: S1IBkMUJEUXHrf9V6Ys2


// //Successful test to Find how many courses a user has in their Firestore course collection
const docRef = doc(db, "Users", "g6hCS9rOmXVXEsHsyCDU");
const docSnap = await getDoc(docRef);
let courseArray = docSnap.get("Courses");
var size = courseArray.length;
console.log(size);

//TODO: Find a way to not mix the HTML and JavaScript code like this:
//Successful test to dynamically add divs depending on student's course list length.
for (var i = 0; i < size; i++){
  //Succesful test to add a DOM element through JS, and appending to the main_panel:
  let div = document.createElement('div');
        div.className = 'mp_course';
        div.setAttribute("id", "mp_course");
        div.innerHTML = `
        <div class="mp_course1">

        <a class="main-page-a-tag" href="t-course-page.html">
          <h3>COMP 248</h3>
        </a>
      </div>
      <div class="mp_course2">
        <div class="mp_course2_items">Add Assignment</div>
        <div class="mp_course2_items">Input Marks</div>
        <div class="mp_course2_items">View Report</div>
      </div>`;
        document.getElementById('main_panel').appendChild(div);
}