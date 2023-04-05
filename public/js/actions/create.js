/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts'

export const create = async (data, path)=> {
    try{
        // const url = (type) => {
        //     switch(type){
        //         case 'monster': return '/api/v1/monsters'
        //         case 'move': return '/api/v1/moves'
        //     }
        // }

        const res = await axios({
            method: 'POST',
            url: `/api/v1/${path}s`,
            data
        });

        if(res.data.status === 'success') {
            showAlert('success', `You created a new ${path}`)
            window.setTimeout(() => {
                location.assign(`/${path}s`)
            }, 1500)
        }

    }
    catch(err){
        showAlert('error', err.response.data.message);
    }
}

