// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
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
  
//Takes JSON file and parses it for JSON objects. 
//Creates users in FireBase storage, and in FireStore database based on those JSON objects
const processFiles = function() {

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

            for (const key in userObject){
            console.log(`${key} : ${userObject[key]}`)
            }
            console.log("isProf: " + isProf + ", email: " + email + ", Password: " + password );


            //Creates a user in Firebase database
            await createUserWithEmailAndPassword(auth, email, password, isProf)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                ////////////////////////////fix  var userID = user.uid;/////////////////
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

            await setDoc(doc(db, "users", localStorage.userId), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                isProf: isProf
            }).then(() => {
                console.log("added doc")
                localStorage.clear();
            })
        }
    };
};

//TODO: Add a import courselist functionality. JSON file with coursename, and studentList

const createUsersBtn = document.getElementById('btn-create-users');
createUsersBtn.addEventListener('click', processFiles)
