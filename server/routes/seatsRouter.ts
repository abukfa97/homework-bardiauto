import express, {Router, Request, Response, response} from 'express';
import {getAllSeats, saveNewSeat} from '../services/userService';
import { Seat } from '@prisma/client';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response)=> {
    try{
        const seats : Seat[] = await getAllSeats();
        res.json(seats);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/', async (req: Request, res: Response)=> {
    try{
        const {name} = req.body();
        const newSeat = await saveNewSeat({name});
        response.json(newSeat);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});