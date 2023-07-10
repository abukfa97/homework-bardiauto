import Seat from "../components/Seat"
import SendForm from "../components/SendForm"

const MainPage = ({}) => {
  

    return (
        <>
            <div className="cinema-room">
                <Seat seatName="a1"/>
                <Seat seatName="a2"/>
                <Seat seatName="a3"/>
                <Seat seatName="a4"/>
                <Seat seatName="a5"/>
                <Seat seatName="a6"/>
                <Seat seatName="a7"/>
            </div>
            <SendForm/>
        </>
    )
}

export default MainPage