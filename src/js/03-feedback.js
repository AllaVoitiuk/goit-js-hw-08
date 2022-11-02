import throttle from 'lodash.throttle';

let refs = {
    form: document.querySelector(".feedback-form"),
    input: document.querySelector("input"),
    button: document.querySelector("button"),
    message: document.querySelector("textarea")
};

let formValues = {
    email: "",
    message: ""
};

const throttledWriteToStorage = throttle(writeToStorage, 500);


const keyName = "feedback-form-state";

initForm();

refs.input.addEventListener("input", onInputChange);
refs.message.addEventListener("input", onInputMessage);
refs.form.addEventListener("submit", onFormSubmit);

//refs.input.setCurrentValue(getEmailFromLocale());

function initForm() {
    
    let storageValue = localStorage.getItem(keyName);
    
    if (storageValue) {

        formValues = JSON.parse(storageValue);
        
        refs.input.value = formValues.email;
        refs.message.value = formValues.message;
    }       
         
    return; 
}

function onInputChange (event) {    

    formValues.email = event.currentTarget.value;

    throttledWriteToStorage();
}

function  onInputMessage (event) {
    
    formValues.message = event.currentTarget.value;
    
    throttledWriteToStorage();
}

function onFormSubmit(event){

    event.preventDefault();
         
    localStorage.clear();
    
    console.log("email: " + formValues.email);
    console.log("message: " + formValues.message);

    

    formValues.email = "";
    formValues.message = "";

    refs.input.value = "";
    refs.message.value = "";    
}

function writeToStorage(){
    localStorage.setItem(keyName, JSON.stringify(formValues)); 
}
  