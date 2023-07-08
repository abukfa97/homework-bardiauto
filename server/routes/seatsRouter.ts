import express, {Router, Request, Response, response} from 'express';
import {getAllSeats, saveNewSeat} from '../services/userService';
import { Seat, reservationStatus } from '@prisma/client';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response)=> {
    try{
        const seats = await getAllSeats();
        res.json(seats);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/', async (req: Request, res: Response)=> {
    const {name} = req.body;
    try{
        let seat = await saveNewSeat({name});
        res.status(200).json(seat);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default router;