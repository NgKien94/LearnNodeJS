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
      
        url.searchParams.set('page',page);

        location.href = url.href;

    })
})


//End Pagination