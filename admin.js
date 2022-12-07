// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, setDoc, doc, updateDoc, arrayUnion } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getStorage} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
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
const database = getDatabase(app);
const storage = getStorage(app);


let filesArr = []

const inputElement = document.getElementById('users-json-file');
inputElement.addEventListener('change', function() {        
    filesArr = this.files;
})

//Helper Function to take a JSON file and return a JSON object
const fileToJSON = async function(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    var object;

    reader.onload = async function() {
        //Get the array of users
        object = JSON.parse(reader.result);
    }
    return object;
}

//Takes JSON file and parses it for JSON objects. 
//Creates users in FireBase storage, and in FireStore database based on those JSON objects
const processUsers = function() {

    //get FireBase auth
    const auth = getAuth();

    //Grab files from the file array
    var reader = new FileReader();
    reader.readAsText(filesArr[0]);

    reader.onload = async function() {
        //Get the array of users
        let userObjects = JSON.parse(reader.result)

        // let userObject = userObjects[0];
        // console.log(userObject);

        //Loop through all userObjects, and create a user for each.
        for(let i in userObjects){
            let userObject = userObjects[i];

            //Log the object
            console.log(userObject);

            var email = userObject["email"];
            var password = userObject["password"];
            var isProf = userObject["isProf"];
            var firstName = userObject["firstName"];
            var lastName = userObject["lastName"];
            var isAdmin = userObject["isAdmin"];

            console.log("isAdmin: " + isAdmin);

            for (const key in userObject){
            console.log(`${key} : ${userObject[key]}`)
            }
            console.log("isProf: " + isProf + ", email: " + email + ", Password: " + password );


            //Creates a user in Firebase database
            await createUserWithEmailAndPassword(auth, email, password, isProf,isAdmin)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const userID = user.uid;
                localStorage.setItem('userId', user.uid)
                console.log(user.uid)

                // ... user.uid
                set(ref(database, 'users/' + userID), {
                    isProf: isProf,
                    email: email,
                    password: password,
                    uid: userID
                })
                .then(() => {

                    alert('user created successfully');
                    return userID;
                })
                .catch((error) => {
                    alert(error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorCode);
                alert(errorMessage);
            });

            if(isAdmin){

            }

            await setDoc(doc(db, "users", localStorage.userId), {
                courseList: [],
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                isProf: isProf
            }).then(() => {
                console.log("added doc");
            })

            if(isAdmin){
                await updateDoc(doc(db, "users", localStorage.userId), {'isAdmin': isAdmin});
                console.log("Updated isAdmin");
            }
        }
    };
};

const createUsersBtn = document.getElementById('btn-create-users');
createUsersBtn.addEventListener('click', processUsers)


//TODO: Add a import courselist functionality. JSON file with coursename, and studentList
//TO INCLUDE: - announcements map - studentList map (array?) - profInfo

let coursesArr = []

const inputCourses = document.getElementById('course-json-file');
inputCourses.addEventListener('change', function() {        
    coursesArr = this.files;
})

const createCourses = document.getElementById('btn-create-courses');
createCourses.addEventListener('click', async function(){
    //TODO:Process course files and add to database

    var reader = new FileReader();
    reader.readAsText(coursesArr[0]);
    reader.onload = async function(){
        let courseJSON = JSON.parse(reader.result);
        console.log(courseJSON);

        //Capture data from JSON object
        var name = courseJSON["name"];
        var courseRef = await doc(db, "courses", name);
        //TODO: getProfReference
        var profID = courseJSON["profID"];
        var profRef = await doc(db, "users", profID);
        var studentList = courseJSON["studentList"];

        console.log("Name: " + name);
        console.log("profID: " + profID);
        console.log("studentList: " + studentList);

        //Create Doc and set the attributes
        await setDoc(doc(db, "courses", name), {
            name: name,
            prof: profRef,
            studentList: studentList
        }).then(() => {
            console.log("added doc");
        })

        //Create reference to newly created course
        var courseRef = await doc(db, "courses", name);

        //Add this course to every student's courseList
        studentList.forEach(async function(ID) {
            console.log("student's ID: " + ID);
            const studentRef = doc(db, "users", ID);
            const courseString = "/courses/" + name;

            //Update courseList array for each student
            await updateDoc(studentRef, {
                courseList: arrayUnion(courseString)
            });

            //Create new document in courses subcollection of student
            await setDoc(doc(studentRef, "courses", name), {
                courseReference: courseRef,
                submissions: []
            });
        });

        //Add this course to prof's courses
        await updateDoc(profRef, {
            courseList: arrayUnion(courseRef)
        });
        //Create new document in courses subcollection of professor
        await setDoc(doc(profRef, "courses", name), {
            courseReference: courseRef,
            submissions: []
        });
    }
})

{/* <input type="file" name="" id="course-json-file">
    <br><br>
    <button id="btn-create-courses" type="submit">Create Courses</button> */}