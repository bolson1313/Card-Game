function Validate(){
    let message = {name: null, phone: null, email: null, content: null, type: null};

    let nameInput = document.getElementById('nameInput');
    let phoneNumber = document.getElementById('inputNumber');
    let email = document.getElementById('emailInput');
    let content = document.getElementById('contentInput');
    let radiusImp = document.getElementById('radiusInputImp');

    let validate = true;
    //name input validation 
    if(nameInput.value != null){
        if(!(/\d/.test(nameInput.value))){
            console.log("name correct");
            message.name = nameInput.value;
        } else {
            alert("You enter numbers into name text field");
            while(/\d/.test(nameInput.value)){
                //replace number with empty space
                validate = false;
                nameInput.value = nameInput.value.replace(/\d/, '');
            }
        }
    } else {
        validate = false;
        alert("Name is required"+nameInput.value);
    }

    //phone number validation
    if(phoneNumber.value != null){
        if(/\d/.test(phoneNumber.value) && phoneNumber.value.length == 9){
            console.log("phone correct");
            message.phone = phoneNumber.value;
        } else {
            validate = false;
            alert("You enter letters into name phone number field or its too long");
            phoneNumber.value = '';
        }
    } else {
        validate = false;
        alert("Phone Number is required");
    }

    //email validaiton
    if(email.value != null){
        if(email.value.includes('@')){
            console.log("email correct");
            message.email = email.value;
        } else {
            validate = false;
            alert("Its not even email address");
        }
    } else {
        validate = false;
        alert("Email is required");
    }

    //content of message validation
    if(content.value != null && content.value.length >= 30){
        console.log("content correct");
        message.content = content.value;
    } else {
        validate = false;
        alert("You have to provide content");
    }

    if(radiusImp.checked){
        message.type = true;
    } else {
        message.type = false;
    }

    if(validate){
        if(confirm("Confirm your message: "+message.content)){
            document.getElementById('formBody').reset();
            const messageJSON = JSON.stringify(message);
            console.log(messageJSON);
        }
    }
}