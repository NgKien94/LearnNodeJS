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
if (formChangeMulti) {
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputsCheked = checkBoxMulti.querySelectorAll('input[name="id"]:checked')

        const typeChange = e.target.elements.type.value;
        // e.target.elements lấy tất cả các phần tử trong form đó- có thể truy cập qua thuộc tính name

        if (typeChange == 'delete-all') {
            const isConfirm = confirm('Bạn có muốn xóa những sản phẩm này!? ');
            if (!isConfirm) {
                return; // xác nhận xóa thì gửi type lên server
                // ngược lại sẽ không thực hiện hành động
            }
        }


        if (inputsCheked.length > 0) {
            let ids = []
            const inputIds = formChangeMulti.querySelector('input[name="ids"]');

            const inputsChecked = checkBoxMulti.querySelectorAll('input[name="id"]:checked');
            inputsChecked.forEach(input =>{
                const id = input.value;

                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    // closet dùng để tìm phần tử cha gần nhất trong DOM tree, tham số là dạng css selector của cha
                   ids.push(`${id}-${position}`);

                }
                else{
                    ids.push(id)
                }
            })
            
        
            
            inputIds.value = ids.join(',');

            formChangeMulti.submit();
        }
        else{
            alert('Vui lòng chọn ít nhất 1 bản ghi');
        }

    })
}
//End form change-multi