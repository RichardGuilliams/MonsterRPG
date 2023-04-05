export const collarForm = (create) => {
    const collarForm = document.querySelector('.form--collar');

    if(collarForm){
        collarForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('collar-name').value);
            form.append('desc', document.getElementById('collar-desc').value);
            form.append('photo', document.getElementById('collar-photo').files[0]);
            
            create(form, 'collar');
        });
    }
}