
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

    var reader = new FileReader();
    reader.readAsText(filesArr[0]);

    reader.onload = function() {
        console.log(reader.result);
    };
};


const createUsersBtn = document.getElementById('btn-create-users');
createUsersBtn.addEventListener('click', processFiles)
