const listButton = document.querySelectorAll('[button-status]')


if(listButton.length > 0){
    listButton.forEach( button =>{
       button.addEventListener('click' , (e)=>{
            let url = new URL(location.href);

            const status = e.target.getAttribute('button-status');
            
            if(status){
                url.searchParams.set('status',status)
            }
            else{
                url.searchParams.delete('status')
            }

            window.location.href = url.href;

       })
    })
}
