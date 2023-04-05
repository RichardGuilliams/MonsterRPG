export const itemForm = (create) => {
    const itemForm = document.querySelector('.form--item');

    if(itemForm){
        itemForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('item-name').value);
            form.append('desc', document.getElementById('item-desc').value);
            form.append('photo', document.getElementById('item-photo').files[0]);
            
            create(form, 'item');
        });
    }
}