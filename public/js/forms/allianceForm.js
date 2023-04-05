export const allianceForm = (create) => {
    const allianceForm = document.querySelector('.form--alliance');

    if(allianceForm){
        allianceForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('alliance-name').value);
            form.append('desc', document.getElementById('alliance-desc').value);
            form.append('photo', document.getElementById('alliance-photo').files[0]);
            
            create(form, 'alliance');
        });
    }
}