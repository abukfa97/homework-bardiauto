import React, { useState, useEffect, useContext } from 'react';
import seatService from '../../services/seatServices';
import {ReservationContext} from '../model/reservationContext'

const SendForm = ({}) => {

    let {reservation, updateMail} = useContext(ReservationContext);
    let service = new seatService();
    let [messageToUser, setMessage] = useState("");

    const onChangeHandler = (e) => {
        updateMail(e.target.value);
    }

    const btnClickHandler = async (e) => {
        if(reservation.mail !== ""){
            let response = await service.sendReservation(reservation);
            setMessage(response.message);
        }
    }

    if(reservation.seats.length > 0){
        return(
            <div class="email-container">
                <h3>{messageToUser}</h3>
                <label htmlFor="emailInput">Email</label>
                <input id='emailInput' type="email" onChange={(e) => onChangeHandler(e)} required/>
                <button onClick={(e) => btnClickHandler(e)}>SEND RESERVATION</button>
            </div>
        )
    }
}
export default SendForm;