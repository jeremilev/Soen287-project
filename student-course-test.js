// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, doc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";


/* const currentCourse = localStorage.getItem('currentCourse'); */

const currentCourse = "COMP232-B";

//Here is a change. 

console.log(currentCourse);
const courseName = document.getElementById('course-name');
courseName.innerText = currentCourse;

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

export const getGrades = async function() {
    console.log("GRADES");
}
// export const getGrades = async function () {
//     //Specify path with commas, so you get database/courses/COMP232-A
//     const docRef = doc(db, "users", "aStudent");

//     //Get the data from the reference above
//     const docSnap = await getDoc(docRef);

//     //If exists
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         //Get the data from that document: IE get the FIELDS DATA
//         try {
//             var grades = docSnap.get("grades");
//         } catch (error) {
//             console.log(e);
//         }
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document (GRADE FUNCTION)!");
        
//     }
//     return grades;
// }


