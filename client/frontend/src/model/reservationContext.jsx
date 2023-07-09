import React, {createContext, useState } from "react";

const ReservationContext = createContext();

const ReservationProvider =  ({children}) => {
    const [reservation, setReservation] = useState({
        seatCounter: 0,
        seats: [],
        mail: "",
        date: new Date()
    })

    const increaseSeatCount = () => {
        setReservation({...reservation, seatCounter: seatCounter+1});
    }
}