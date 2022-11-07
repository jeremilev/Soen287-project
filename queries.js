// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, doc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

const db = getFirestore(app);


// Query: user-list 

//QUERIES ALL USERS
/*
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});
*/

//QUERY: all courses
export const getCourses = async function () {

    //Get the data from the reference above
    const querySnapshot = await getDocs(collection(db, "courses"));
    var courses = null;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    })
}

//QUERY: all students within a course **Imperfect, need to find a way to standardized the document name inside the collection studentList
export const getStudentList = async function (className) {

    //studentList is a collection and collections don't contain fields, only documents can contain fields, 
    //so collections must have documents that then, in turn, contain the data.
    //Here, studentList is a collection, jteSOJD0LO8AbUxMlXcM is a document. Else it throws an error
    const docRef = doc(db, "courses", className, "studentList", 'jteSOJD0LO8AbUxMlXcM');

    const docSnap = await getDoc(docRef);

    //If exists
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        //Get the data from that document: IE get the FIELDS DATA

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

//Query: all assessments within a course
export const getAssessments = async function (className) {

    //Fetch multiple docs (every assessment is a doc)
    const querySnapshot = await getDocs(collection(db, "courses", className, "assessments"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    })
}
//getAssessments("COMP232-A");

//Query: a specific assignment within a course and its info 


//Query: a particular student within a course, to display that student's grades.


// Query: list of announcements
export const getAnnouncements = async function () {
    //Specify path with commas, so you get database/courses/COMP232-A
    const docRef = doc(db, "courses", "COMP232-A");

    //Get the data from the reference above
    const docSnap = await getDoc(docRef);

    //If exists
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        //Get the data from that document: IE get the FIELDS DATA
        try {
            var announcements = docSnap.get("announcements");
        } catch (error) {
            console.log(e);
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return announcements;
}

/*formats to access nested keys and values
let announcementsObj = await getAnnouncements();
let announcement = announcementsObj[Object.keys(announcementsObj)[0]];
console.log(announcement[Object.keys(announcement)[0]]);
*/




//reference to courses:
/*
const coursesRef = collection(db, "courses");
const announcementsRef = query(coursesRef, where("Document Id", "==", "COMP232-A"))
const getAnnouncements = await getDoc(announcementsRef).then;
*/
/*
try {
    const docRef = await addDoc(collection(db, "User"), {
        fName: "firstname",
        last: "lastname",
        born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
} catch (e) {
    console.error("Error adding document: ", e);
}
*/
