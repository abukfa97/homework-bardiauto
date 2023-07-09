import React, {createContext, useState } from "react";

const ReservationContext = createContext();

const ReservationProvider =  ({children}) => {
    const [reservation, setReservation] = useState({
        seatCounter: 0,
        seats: [],
        mail: "",
        date: new Date()
    });

    const increaseSeatCount = () => {
        setReservation((prevReservation) => ({
            ...prevReservation,
            seatCounter: prevReservation.seatCounter + 1
        }));
    };

    const decreaseSeatCount = () => {
        setReservation((prevReservation) => ({
            ...prevReservation,
            seatCounter: prevReservation.seatCounter - 1
        }));
    };
}