import axios from 'axios'

export default class seatService{
    

    async registerSeatInProgress(seatName){
        try{
            await axios.post('/api/seats/',{name: seatName});
        }catch(error){
            console.error(error);
        }
    }

    async isExistingSeat(seatName){
        try{
            let response = await axios.get(`/api/seats/isExists/${seatName}`);
            return response.data;
        }catch(error){
            console.error(error);
        }
    }

    async deleteReservation(seatName){
        try{
            await axios.delete('/api/seats/', {name: seatName});
        }catch(error){
            console.error(error);
        }
    }

    async sendReservation(reservation){
        try{
            let response = await axios.patch('/api/seats/finish-reservation', {names: reservation.seats, mail: reservation.mail});
            return response.data;
        }catch(error){
            console.error(error);
        }
    }

}