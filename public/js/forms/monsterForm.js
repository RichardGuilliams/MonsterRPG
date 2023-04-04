export const monsterForm = (create) => {
    const monsterForm = document.querySelector('.form--monster');

    if(monsterForm){
        monsterForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('monster-name').value);
            form.append('desc', document.getElementById('monster-desc').value);
            form.append('rank', document.getElementById('monster-rank').value);
            form.append('hp', document.getElementById('monster-hp').value);
            form.append('mp', document.getElementById('monster-mp').value);
            form.append('atk', document.getElementById('monster-atk').value);
            form.append('mAtk', document.getElementById('monster-mAtk').value);
            form.append('def', document.getElementById('monster-def').value);
            form.append('mDef', document.getElementById('monster-mDef').value);
            form.append('spd', document.getElementById('monster-spd').value);
            form.append('agl', document.getElementById('monster-agl').value);
            form.append('luk', document.getElementById('monster-luk').value);
            form.append('tamerType1', document.getElementById('monster-tamer-type1').value);
            form.append('tamerType2', document.getElementById('monster-tamer-type2').value);
            form.append('monsterType1', document.getElementById('monster-type1').value);
            form.append('monsterType2', document.getElementById('monster-type2').value);
            form.append('attribute1', document.getElementById('monster-attribute1').value);
            form.append('attribute2', document.getElementById('monster-attribute2').value);
            form.append('fusion1', document.getElementById('monster-fusion1').value);
            form.append('fusion2', document.getElementById('monster-fusion2').value);
            form.append('fusion3', document.getElementById('monster-fusion3').value);
            form.append('fusion4', document.getElementById('monster-fusion4').value);
            form.append('fusion5', document.getElementById('monster-fusion5').value);
            form.append('photo', document.getElementById('monster-photo').files[0]);
    
            create(form, 'monster');
        });
    }
}