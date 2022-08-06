import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = "feedback-form-state";

getSavedInfo();

function saveInfoInStorage() {

  const formData = {
        email: formEl.elements.email.value,
        message: formEl.elements.message.value,
  };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

}

function submitForm(event) {
    event.preventDefault();
    event.currentTarget.reset();
    const sendsInfo = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (sendsInfo !== null) {
         console.log('Your info', sendsInfo);
    }
   
    localStorage.removeItem(STORAGE_KEY);
}

function getSavedInfo() {
    const savedInfo = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedInfo) {
        formEl.elements.email.value = savedInfo.email;
        formEl.elements.message.value = savedInfo.message;
    } 
}

formEl.addEventListener('input', throttle(saveInfoInStorage, 500) );
formEl.addEventListener('submit', submitForm);