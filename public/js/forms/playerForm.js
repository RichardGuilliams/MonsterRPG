export const playerForm = (create) => {
    const playerForm = document.querySelector('.form--player');

    if(playerForm){
        playerForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('player-name').value);
            form.append('desc', document.getElementById('player-desc').value);
            form.append('photo', document.getElementById('player-photo').files[0]);
            
            create(form, 'player');
        });
    }
}