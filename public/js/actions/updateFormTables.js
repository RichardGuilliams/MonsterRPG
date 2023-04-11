import { getData } from './getData'

export const updateFormTables = (table, count) => {  
    if(count === 1) {
        let id = table.firstElementChild.childElementCount; 
        let html = `
            <tr> 
                <td>
                    <select class="form__input" id="category-${id}" value="category-${id}" name="category-${id}" required="false">
                        <option value="Item">Item</option>
                        <option value="Weapon">Weapon</option>
                        <option value="Armor">Armor</option>
                        <option value="Charm">Charm</option>
                        <option value="Collar">Collar</option>
                    </select>
                </td>
                <td>
                    <select class="form__input" id="item-${id}" value="item-${id}" name="item-${id}" required="false">
                    </select>
                </td>
                <td>
                    <div class="group">
                        <label class="form__label" for="item-rarity-${id}"></label>
                        <input class="form__input" id="item-rarity-${id}" value="0" name="item-rarity-${id}" placeholder="" type="number" required="false">
                    </div>
                </td>
            </tr>
        `
        return table.firstElementChild.lastElementChild.insertAdjacentHTML('afterend', html)
    }
    else if (table.firstElementChild.childElementCount > 1){
        return  table.firstElementChild.lastElementChild.remove();

    }
};

export const updateTableData = async (table) => {
   const data = await getData('item');
   let options = [`<option>None</option>`];
   data.data.data.map( option => {
    return options.push(`<option>${option.name}</option>`)
   })

   console.log(options);
   
   console.log(table.children[1].firstElementChild.innerHTML = options);
}

