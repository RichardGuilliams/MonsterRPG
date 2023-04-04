export const settingsForm = (updateSettings) => {
    const settingsForm = document.querySelector('.form-user-data');

    if(settingsForm){
        settingsForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('name').value);
            form.append('email', document.getElementById('email').value);
            form.append('photo', document.getElementById('photo').files[0]);
            
            updateSettings(form, 'data');
        });
    }
}

