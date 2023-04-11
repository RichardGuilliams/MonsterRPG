import { updateFormTables, updateTableData } from '../actions/updateFormTables';


export const locationForm = (create) => {
    const locationForm = document.querySelector('.form--location');
    const increaseTables = document.getElementById('increase--tables')
    const table = document.getElementById('form--table'); 
    
    increaseTables.addEventListener('click', (ev) => {
        updateFormTables(table, 1);
        updateTableData(table.firstElementChild.lastElementChild);
        console.log('increase--tables');
    });

    const decreaseTables = document.getElementById('decrease--tables')
    
    decreaseTables.addEventListener('click', (ev) => {
        updateFormTables(table, -1);
    });


    if(locationForm){
        locationForm.addEventListener('submit', e => {
            console.log(e);
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('location-name').value);
            form.append('desc', document.getElementById('location-desc').value);
            form.append('photo', document.getElementById('location-photo').files[0]);
            
            create(form, 'location');
        });
    }
}