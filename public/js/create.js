/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts'

export const create = async (data, type)=> {
    try{
        const url = (type) => {
            switch(type){
                case 'monster': return '/api/v1/monsters'
            }
        }

        const res = await axios({
            method: 'POST',
            url: url(type),
            data
        });

        if(res.data.status === 'success') {
            showAlert('success', `You created a new ${type}`)
            window.setTimeout(() => {
                location.assign(`/${type}s`)
            }, 1500)
        }

    }
    catch(err){
        showAlert('error', err.response.data.message);
    }
}

