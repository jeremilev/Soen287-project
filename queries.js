// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, doc, getDocs, getDoc, updateDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getStorage, getStream, ref as sRef, getDownloadURL, list } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

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

// ------------------------Beginning of John's work for 20-finalize-database-structure-------------------------------

// // First Name, Last Name, ID, IsProf, Email, Password, courses (subcollection, which is initially empty)
// const createUser = function(filePath){

//     //TODO: Create a button to bulk create somewhere.

//     //TODO: Read that JSON file and store the fields
//     const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
//     console.log("name is: " + obj.name);
//     console.log("age is: " + obj.age);



//     //TODO: Create a user with that information in Firebase and cloud Firestore

// }

jsonTestButton.addEventListener("click", () => {
    retrieveJSON();
  })

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

    const obj =await JSON.parse('{"name":"John", "age":30, "city":"New York"}');
    console.log("name: " + obj.name);
    console.log("age: " + obj.age);

    //Create a reference for the file in storage
    const pathReference = sRef(storage, 'jsonTest1.json');

    const stream = await getStream(pathReference);
    console.log("stream: " + stream);

    // const streamString = streamToString(stream);
    // console.log(streamString);
}

// //FOR REFERENCE FOR RETRIEVEJSON():

// const storage = getStorage();
// getDownloadURL(ref(storage, 'images/stars.jpg'))
//   .then((url) => {
//     // `url` is the download URL for 'images/stars.jpg'

//     // This can be downloaded directly:
//     const xhr = new XMLHttpRequest();
//     xhr.responseType = 'blob';
//     xhr.onload = (event) => {
//       const blob = xhr.response;
//     };
//     xhr.open('GET', url);
//     xhr.send();

//     // Or inserted into an <img> element
//     const img = document.getElementById('myimg');
//     img.setAttribute('src', url);
//   })
//   .catch((error) => {
//     // Handle any errors
//   });

// //FOR REFERENCE FOR RETRIEVEJSON():

// import { getStorage, ref } from "firebase/storage";

// // Create a reference with an initial file path and name
// const storage = getStorage();
// const pathReference = ref(storage, 'images/stars.jpg');

// // Create a reference from a Google Cloud Storage URI
// const gsReference = ref(storage, 'gs://bucket/images/stars.jpg');

// // Create a reference from an HTTPS URL
// // Note that in the URL, characters are URL escaped!
// const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');  



//FOR REFERENCE:

// //creates new user and ads to realtime databse for firebase auth
// submitButton.addEventListener('click', async (e) => {
//     event.preventDefault();
//     var email = document.getElementById('username').value;
//     var password = document.getElementById('password').value;


//     console.log(email + " " + password);

//     await createUserWithEmailAndPassword(auth, email, password, isProf)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             ////////////////////////////fix  var userID = user.uid;/////////////////
//             const userID = user.uid;
//             localStorage.setItem('userId', user.uid)

//             // ... user.uid
//             set(ref(database, 'users/' + userID), {
//                 isProf: isProf,
//                 email: email,
//                 password: password,
//                 uid: userID
//             })
//                 .then(() => {

//                     alert('user created successfully');
//                     return userID;
//                 })
//                 .catch((error) => {
//                     alert(error);
//                 });
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//             alert(errorMessage);
//         });

//     await setDoc(doc(db, "users", localStorage.userId), {
//         firstName: document.getElementById('firstName').value,
//         lastName: document.getElementById('lastName').value,
//         email: document.getElementById('username').value,
//         password: document.getElementById('password').value,
//         isProf: isProf
//     }).then(() => {
//         console.log("added doc")
//         localStorage.clear();
//     })


// });

// name, announcements, studentList, Assessments, startDate, endDate, userRef(prof)
const createCourse = function(){

}

//due Date, weight, type (assignment, exam, quiz), file, description, date published, courseRef, submissionLists
const createAssessment = function(){

}

// file, studentRef, grade, submission date, assignment ref
const createSubmission = function(){

}

// assignmentRef, studentRef, profRef, submissionRef, grade
const createGrade = function(){

}

// For Reference:


// import { doc, setDoc } from "firebase/firestore"; 

// // Add a new document in collection "cities"
// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

    // //Saves all of the user's fields in localStorage, including their uid.
    // //To access any field: use localStorage.getItem("fieldName");
    // onAuthStateChanged(auth, async (user) => {
    //     if (user) { //if user is signed in

    //         localStorage.setItem("uid", user.uid);

    //         //get logged-in user's data
    //         const userSnap = await getDoc(doc(db, "users", user.uid));
    //         const userData = userSnap.data();

    //         // Save all fields in localStorage
    //         Object.keys(userData).forEach(key => {
    //             localStorage.setItem(key, userData[key]);
    //         });
    //     } else {
    //         console.log("user is not logged in");
    //     }
    // });


// -------------------------End of John's work  for 20-finalize-database-structure--------------------------
