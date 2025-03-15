//Show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert){

    const time = parseInt(showAlert.getAttribute('data-time'));
    const closeAlert = showAlert.querySelector('[close-alert]');

    setTimeout( ()=>{
        showAlert.classList.add('alert-hidden');
    },time)

    closeAlert.addEventListener('click',(e)=>{
        showAlert.classList.add('alert-hidden');
    })
}
