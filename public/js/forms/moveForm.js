export const moveForm = (create) => {
    const moveForm = document.querySelector('.form--move');

    if(moveForm){
        moveForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('move-name').value);
            form.append('desc', document.getElementById('move-desc').value);
            form.append('rank', document.getElementById('move-rank').value);
            form.append('moveType1', document.getElementById('move-type1').value);
            form.append('moveType2', document.getElementById('move-type2').value);
            form.append('attribute1', document.getElementById('move-attribute1').value);
            form.append('attribute2', document.getElementById('move-attribute2').value);
            form.append('effect', document.getElementById('move-effect').value);
            form.append('target', document.getElementById('move-target').value);
            form.append('targetStat', document.getElementById('move-target-stat').value);
            form.append('power', document.getElementById('move-power').value);
            form.append('accuracy', document.getElementById('move-accuracy').value);
            form.append('modifier', document.getElementById('move-modifier').value);
            form.append('photo', document.getElementById('move-photo').files[0]);

            
            create(form, 'move');
        });
    }
}