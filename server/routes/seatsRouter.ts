import express, {Router, Request, Response, response} from 'express';
import seatService from '../services/seatService';
import ReservationService from '../services/reservationService';
import mailDetails from '../model/mailDetailsInterface';
import { reservationStatus } from '@prisma/client';
import { getMail } from '../mailTemplate/successfulReservation';


const router: Router = express.Router();
const service: seatService = new seatService();

router.get('/', async (req: Request, res: Response)=> {
    try{
        const seats = await service.getAllSeats();
        res.json(seats);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/', async (req: Request, res: Response)=> {
    const {name} = req.body;
    try{
        let seat = await service.saveNewSeat({name});
        if(!seat) throw new Error("Seat is already existing");
        res.status(200).json(seat);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.delete('/',async (req: Request,res: Response) => {
    const {name} = req.body;
    try {
        await service.deleteSeat({name});
        res.json({message: "Item deleted successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default router;