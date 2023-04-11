import axios from 'axios';
import { showAlert } from './alerts'

export const getData = async (path)=> {
    try{
        const res = await axios({
            method: 'GET',
            url: `/api/v1/${path}s`
        });

        if(res.data.status === 'success') {
            showAlert('success', `You retrieved some data`);
            return res.data
        }

    }
    catch(err){
        showAlert('error', err.response.data.message);
    }
}

