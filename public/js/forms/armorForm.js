export const armorForm = (create) => {
    const armorForm = document.querySelector('.form--armor');

    if(armorForm){
        armorForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('armor-name').value);
            form.append('desc', document.getElementById('armor-desc').value);
            form.append('photo', document.getElementById('armor-photo').files[0]);
            
            create(form, 'armor');
        });
    }
}