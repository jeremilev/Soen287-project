import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, doc, getDocs, getDoc, updateDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getStorage, list } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";


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

const db=getFirestore(app);
const userId=localStorage.userId; //johndoe@gmail.com
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
    const docRef = doc(db, 'users', userId);
    //Get the data from the reference above
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document dataL", docSnap.data());
        const userInfo = docSnap.data();

        console.log(userInfo['courseList']);
        return userInfo['courseList'];
    }
    else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}


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
        let myCourse = document.createElement('div');

        myCourse.className = "my-course";


myCourse.innerHTML=`
<div class="courseName-Grade">
    <div class="courseName">
        <h3><a class="courselink" id="courselink" href="student-course-page.html">${courseName}</a></h3>
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


        let middleBar = document.getElementById('middle-panel');

        middleBar.appendChild(myCourse);
    }
}

displayCourseList(userId);


//get the name of each link clicked
const getNameOfClass = ()=>{
    const courseLink = document.getElementById("courselink");

    //try for each
    console.log("this is it: ", courseLink)
}

getNameOfClass();



//Dark Mode
document.getElementById("moon").addEventListener("click",()=>{
    document.documentElement.style.setProperty("--deadlineBackgroundColor","black");
   

});




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
