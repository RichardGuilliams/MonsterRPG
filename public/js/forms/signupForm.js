export const signupForm = (signup) => {
    const signupForm = document.querySelector('.form--signup');

    if(signupForm){
        console.log('hi')
        signupForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const passwordConfirm = document.getElementById('signup-password-confirm').value;
            signup(name, email, password, passwordConfirm);
    
            name = document.getElementById('signup-name').value = '';
            email = document.getElementById('signup-email').value = '';
            password = document.getElementById('signup-password').value = '';
            passwordConfirm = document.getElementById('signup-password-confirm').value = '';
        });
    }
}