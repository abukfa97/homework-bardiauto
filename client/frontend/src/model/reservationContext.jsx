import React, {createContext, useState } from "react";

const ReservationContext = createContext();

const ReservationProvider =  ({children}) => {
    const [reservation, setReservation] = useState({
        seatCounter: 0,
        seats: [],
        mail: ""
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

    const addSeat = (seatName) => {
        setReservation((prevReservation) => ({
            ...prevReservation,
            seats: [...prevReservation.seats, seatName]
        }));
    };

    const removeSeat = (seatNameToRemove) => {
        setReservation((prevReservation) => ({
            ...prevReservation,
            seats: prevReservation.seats.filter((seatName) => seatName !== seatNameToRemove)
        }));
    };

    const updateMail = (newMail) => {
        setReservation((prevReservation) => ({
            ...prevReservation,
            mail: newMail
        }));
    };

    return (
        <ReservationContext.Provider value={{reservation, increaseSeatCount, decreaseSeatCount, addSeat, removeSeat, updateMail}}>
            {children}
        </ReservationContext.Provider>
    )

    
}

export {ReservationContext, ReservationProvider}