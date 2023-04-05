export const weaponForm = (create) => {
    const weaponForm = document.querySelector('.form--weapon');

    if(weaponForm){
        weaponForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('weapon-name').value);
            form.append('desc', document.getElementById('weapon-desc').value);
            form.append('photo', document.getElementById('weapon-photo').files[0]);
            
            create(form, 'weapon');
        });
    }
}