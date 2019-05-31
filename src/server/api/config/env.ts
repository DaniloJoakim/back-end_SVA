import dotenv from 'dotenv';

const res = dotenv.config();

if(res.error){
    throw res.error;
}
