import React, { useState, useEffect, useContext } from 'react';
import seatService from '../../services/seatServices';
import {ReservationContext} from '../model/reservationContext'


const Seat = ({ seatName }) => {

    const service = new seatService();
    const { reservation, increaseSeatCount, decreaseSeatCount, addSeat, removeSeat} = useContext(ReservationContext);

    
    let STATUS_COLORS = {
        FREE: "green",
        IN_PROGRESS: "blue",
        RESERVED: "red"
    }
    
    let [getColor, setColor] = useState(STATUS_COLORS.FREE);

    async function handleOnClick(e){
        console.log(e.target.innerText);
        let isExist = await service.isExistingSeat(e.target.textContent);
        if (isExist){
            if(reservation.seats.includes(e.target.textContent)) {
                await service.deleteReservation(e.target.textContent);
                removeSeat(e.target.textContent);
                setColor(STATUS_COLORS.FREE); 
            }else{
                setColor(STATUS_COLORS.RESERVED);
                e.target.disable;
            }
        }else{
            if(isExist){
                setColor(STATUS_COLORS.RESERVED);
            }else{
                if(reservation.seats.includes(e.target.textContent)){
                    setColor(STATUS_COLORS.FREE);
                    await service.deleteReservation(e.target.textContent)
                    removeSeat(e.target.textContent);
                    decreaseSeatCount();
                }else{ 
                    if(reservation.seats.length !== 2 && getColor !== STATUS_COLORS.RESERVED){
                        setColor(STATUS_COLORS.IN_PROGRESS);
                        await service.registerSeatInProgress(e.target.textContent);
                        increaseSeatCount();
                        addSeat(e.target.textContent);
                    }
                }
            }
        }
    }




   return (
    <div className="seat" style={{backgroundColor: `${getColor}`}} onClick={async(e) => await handleOnClick(e)}>
       {seatName} 
    </div>
   )
}

export default Seat;