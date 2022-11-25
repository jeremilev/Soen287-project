// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, doc, getDocs, getDoc, setDoc, updateDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getStorage, list } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

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

const storage = getStorage(app);

// Query: user-list 

//QUERIES ALL USERS
/*
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});
*/

// Query: get user info
export const getCurrentUserInfo = async function (userId) {
    const docRef = doc(db, "users", userId);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {

        let userData = docSnap.data();
        console.log(userData)
        return userData;

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return "Server not responding... Try again in a few minutes";
    }
}
await getCurrentUserInfo('c1grGgLk3cTUf52t8Fb8tpbjv3f1');

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
    var assessments = {};
    //Fetch multiple docs (every assessment is a doc)
    const querySnapshot = await getDocs(collection(db, "courses", className, "assessments"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        assessments[doc.id] = doc.data();
    })
    return assessments;
}

//Query: create Assessment
export const createAssessment = async function (className, docId, description, filePath, weight, dueDate, datePublished, visible) {

    const docRef = doc(db, "courses", className, "assessments", docId);

    const docData = {
        description: description,
        file: filePath,
        weight: weight,
        dueDate: dueDate,
        datePublished: datePublished,
        visible: visible
    }

    await setDoc(docRef, docData);
}
//WORKEDDDD
//createAssessment("COMP248-D", "Assignment Name", "This is the description", "path/filepath/path", 15);

//Query:
export const getAssessmentGrades = async function (className, assessmentName) {

    const docRef = doc(db, "courses", className, "assessments", assessmentName);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        let assessment = docSnap.data();

        console.log(assessment['submissions']);
        return assessment['submissions'];
        //Get the data from that document: IE get the FIELDS DATA

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return "Server not responding... Try again in a few minutes";
    }
}
//let a = await getAssessmentGrades("COMP232-A", "Assignment 1");

//Update grades
//the data parameter is an object of key:value pairs that are to be overridden or added inside the specified doc
//THIS WORKS
export const updateGrade = async function (className, assessmentName, studentId, newGrade) {
    const docRef = doc(db, "courses", className, "assessments", assessmentName);

    var data = await getAssessmentGrades(className, assessmentName);

    console.log(data[studentId]);
    try {
        data[studentId]['grade'] = newGrade;
    } catch (error) {
        alert('Could not update the grade: ' + error);
    }

    updateDoc(docRef, {
        submissions: data
    }).then(docRef => {
        console.log('updated successfully')
    })
        .catch(error => {
            console.log(error);
        })

}


// Query: create announcement
export const createAnnouncement = async function (className, subject, description) {

    const docRef = doc(db, "courses", className);


    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        //Get the data from that document: IE get the FIELDS DATA
        try {
            var classDoc = docSnap.data();
            var announcements = classDoc['announcements'];

            var k = Object.keys(announcements).length;
            k++;
            var myTimestamp = Date.now();
            console.log(myTimestamp);
            announcements[k] = {}
            console.log(announcements[k]);
            announcements[k]['subject'] = subject;
            announcements[k]['description'] = description;
            announcements[k]['datePublished'] = myTimestamp;

            var newData = announcements;
            updateDoc(docRef, {
                announcements: newData
            }).then(docRef => {

                console.log('updated successfully')
            })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

// Query: list of announcements
export const getAnnouncements = async function (className) {
    //Specify path with commas, so you get database/courses/COMP232-A
    const docRef = doc(db, "courses", className);

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


//John's work below

//Logs all of the student's grades in a course's assessments to console
const logGrades = async function(uid, course){
    //Get submissions subcollection in this course document of student's courses collection.
    
        //Retrieve the array of submission references from within the student's course document
        const courseRef = doc(db, "users", uid, "courses", course);
        const courseSnap = await getDoc(courseRef);
        const submissionsArr = courseSnap.get("submissions");
        const size = submissionsArr.length;
    
        //Access grades inside each submission ref
        for(var i = 0; i < size; i++){
            var submissionRef = submissionsArr[i];
            var submissionSnap = await getDoc(submissionRef);
            var grade = submissionSnap.get("grade");
            
            console.log("Name of assessment: " + submissionSnap.ref.parent.parent.id);
            console.log("Grade: " + grade);
        }
    }
    
    getGradesButton.addEventListener("click", () => {
        //Use when info is saved to localStorage
        // logGrades(localStorage.getItem("userId"), localStorage.getItem("currentCourse"));

        //Hardcoded for now
        logGrades("MsgYjevzqvTtwYf77p0CrXyM2Yy2", "COMP232-B");
      })