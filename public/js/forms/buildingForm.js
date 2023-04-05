export const buildingForm = (create) => {
    const buildingForm = document.querySelector('.form--building');

    if(buildingForm){
        buildingForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('building-name').value);
            form.append('desc', document.getElementById('building-desc').value);
            form.append('photo', document.getElementById('building-photo').files[0]);
            
            create(form, 'building');
        });
    }
}