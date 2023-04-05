export const charmForm = (create) => {
    const charmForm = document.querySelector('.form--charm');

    if(charmForm){
        charmForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('charm-name').value);
            form.append('desc', document.getElementById('charm-desc').value);
            form.append('photo', document.getElementById('charm-photo').files[0]);
            
            create(form, 'charm');
        });
    }
}