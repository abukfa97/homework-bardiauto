import express, {Router, Request, Response, response} from 'express';
import {deleteSeat, getAllSeats, saveNewSeat} from '../services/userService';

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
        await deleteSeat({name});
        res.json({message: "Item deleted successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

export default router;