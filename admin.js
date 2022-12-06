//Will hold uploaded files
let filesArr = []

const inputElement = document.getElementById('users-json-file');
inputElement.addEventListener('change', function() {
        
    filesArr = this.files;

    // var fr = new FileReader();
    // fr.onload = function(){
    //     console.log(fr.result);
    // }
    // fr.readAsText(this.files[0]);
})
  
const processFiles = function() {

    //Grab files from the file array
    var reader = new FileReader();
    reader.readAsText(filesArr[0]);

    reader.onload = function() {
        let userObjects = JSON.parse(reader.result)

        //Log the object
        console.log(userObjects);

        //iterate through object key/value pairs and print to console
        for (const key in userObjects){
            console.log(`${key} : ${userObjects[key]}`)
          }
    };
};


const createUsersBtn = document.getElementById('btn-create-users');
createUsersBtn.addEventListener('click', processFiles)
