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

export const getStudentList = async function (className) {

    //studentList is a collection and collections don't contain fields, only documents can contain fields, 
    //so collections must have documents that then, in turn, contain the data.
    //Here, studentList is a collection, jteSOJD0LO8AbUxMlXcM is a document. Else it throws an error
    const docRef = doc(db, "courses", className);

    const docSnap = await getDoc(docRef);

    //If exists
    if (docSnap.exists()) {
        const data = docSnap.data();

        console.log(data['studentList']);
        return data['studentList'];
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

    const submissionsRef = collection(db, "courses", className, "assessments", docId, "submissions");
    const studentList = await getStudentList(className);
    const studentIds = Object.values(studentList); //make it an array
    var studentListSize = Object.keys(studentList).length;
    for (let i = 0; i < studentListSize; i++) {
        var newDoc = doc(submissionsRef);
        var submissionData = {
            comments: "",
            dateSubmitted: null,
            file: "",
            grade: 0,
            studentRef: studentIds[i]
        }
        await setDoc(newDoc, submissionData);
    }

}
//WORKEDDDD
//createAssessment("COMP248-D", "Assignment Name", "This is the description", "path/filepath/path", 15);

//Query:


export const getGradesForAssessment = async function (className, assessmentName) {
    const docsRef = collection(db, "courses", className, "assessments", assessmentName, "submissions");
    const querySnapshot = await getDocs(docsRef);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    })
}
getGradesForAssessment("COMP232-B", "assignment1");

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
//Parameters:
//  - uid: the user ID of the student who's grade is to be fetched
//  - course: the courseID of the course whose grades are to be fetch
//Returns:
//  - an object containing 3 arrays (assessmentIDs, weights, and grades)

export const getGrades = async function (uid, course) {

    //Retrieve the array of submission references from within the student's course document
    const courseRef = doc(db, "users", uid, "courses", course);
    const courseSnap = await getDoc(courseRef);
    const submissionsArr = courseSnap.get("submissions");
    const size = submissionsArr.length;
    const assessmentsRef = collection(db, "courses", course, "assessments");

    //Create empty arrays to add in fetched values
    var assessmentIDs = [];
    var weights = [];
    var grades = [];

    //Access grades inside each submission ref
    for (var i = 0; i < size; i++) {
        //Get grade through submission reference in student's subcollection
        var submissionRef = submissionsArr[i];
        var submissionSnap = await getDoc(submissionRef);
        var grade = submissionSnap.get("grade");

        //Get assessmentID and weight through courses collection
        var assessmentID = submissionRef.parent.parent.id;
        var assessmentRef = doc(assessmentsRef, assessmentID);
        var assessmentSnap = await getDoc(assessmentRef);
        var weight = assessmentSnap.get("weight");

        //populate arrays with fetched data
        assessmentIDs[i] = assessmentID;
        weights[i] = weight;
        grades[i] = grade;
    }

    //return object containing the three arrays.
    return { "assessmentIDs": assessmentIDs, "weights": weights, "grades": grades };
}