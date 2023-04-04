export const passwordForm = async (updateSettings) => {
    const passwordForm = document.querySelector('.form-user-settings');

    if(passwordForm){
        passwordForm.addEventListener('submit', async e => {
            e.preventDefault();
            document.querySelector('.btn--save-password').innerHTML = 'Updating...'
    
            const passwordCurrent = document.getElementById('password-current').value;
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('password-confirm').value;
            await updateSettings({passwordCurrent, password, passwordConfirm}, 'password');
    
            document.querySelector('.btn--save-password').innerHTML = 'Saved Password'
    
            passwordCurrent = document.getElementById('password-current').value = '';
            password = document.getElementById('password').value = '';
            passwordConfirm = document.getElementById('password-confirm').value = '';
        });
    }
}