// Filter

const listButton = document.querySelectorAll('[button-status]')


if (listButton.length > 0) {
    listButton.forEach(button => {
        button.addEventListener('click', (e) => {
            let url = new URL(location.href);

            const status = e.target.getAttribute('button-status');

            if (status) {
                url.searchParams.set('status', status)
            }
            else {
                url.searchParams.delete('status')
            }

            window.location.href = url.href;

        })
    })
}

//End filter


//Form search
const formSearch = document.querySelector('#form-search');
if (formSearch) {
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        let valueSearch = document.querySelector('input[name="keyword"]').value.trim()


        let url = new URL(window.location.href);

        if (valueSearch) {
            url.searchParams.set('keyword', valueSearch);
        }
        else {
            url.searchParams.delete('keyword');
        }
        window.location.href = url.href;
    })

}
//End search


//Pagination
const listButtonPagination = document.querySelectorAll('[button-pagination]');
listButtonPagination.forEach((item) => {
    let url = new URL(location.href);
    item.addEventListener('click', (e) => {
        const page = item.getAttribute('button-pagination');

        url.searchParams.set('page', page);

        location.href = url.href;

    })
})


//End Pagination


// Checkbox multi
const checkBoxMulti = document.querySelector('[checkbox-multi]');
if (checkBoxMulti) {
    const inputCheckBoxAll = checkBoxMulti.querySelector('input[name="checkall"]');
    const inputsId = checkBoxMulti.querySelectorAll('input[type="checkbox"][name="id"]');

    //Logic checkbox All
    inputCheckBoxAll.addEventListener('click', (e) => {
        if (inputCheckBoxAll.checked == true) {
            inputsId.forEach(input => input.checked = true)

        }
        else {
            inputsId.forEach(input => input.checked = false)
        }
    })
    //End logic checkbox all


    //Logic single check box 
    inputsId.forEach(input => {
        input.addEventListener('click', (e) => {
            const countChecked = checkBoxMulti.querySelectorAll('input[name="id"]:checked').length;

            if (countChecked == inputsId.length) {
                inputCheckBoxAll.checked = true
            }
            else {
                inputCheckBoxAll.checked = false
            }

        })
    })
    //End logic single checkbox

}

//End checkbox multi



//Form change-multi
const formChangeMulti = document.querySelector('[form-change-multi]');
if(formChangeMulti){
    formChangeMulti.addEventListener('submit',(e)=>{
        e.preventDefault();
        const inputsCheked = checkBoxMulti.querySelectorAll('input[name="id"]:checked')
        
        if(inputsCheked.length > 0){
            const ids = Array.from(inputsCheked).map( currentInput => currentInput.value)
            
            const inputIds = formChangeMulti.querySelector('input[name="ids"]');
            inputIds.value = ids.join(',');

            formChangeMulti.submit();
        }
      
    })
}
//End form change-multi