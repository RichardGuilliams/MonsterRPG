export const locationForm = (create) => {
    const locationForm = document.querySelector('.form--location');

    if(locationForm){
        locationForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('location-name').value);
            form.append('desc', document.getElementById('location-desc').value);
            form.append('photo', document.getElementById('location-photo').files[0]);
            
            create(form, 'location');
        });
    }
}