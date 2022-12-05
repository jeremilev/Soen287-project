

const inputElement = document.getElementById('users-json-file');
inputElement.addEventListener('change', function() {
        
    var fr = new FileReader();
    fr.onload = function(){
        console.log(fr.result);
    }
        
    fr.readAsText(this.files[0]);
})
  

const createUsersBtn = document.getElementById('btn-create-users');
createUsersBtn.addEventListener('click', (e) => {

    const selectedFile = document.getElementById('users-json-file').files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);
    console.log(reader.result);
})
