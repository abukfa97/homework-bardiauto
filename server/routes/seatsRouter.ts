import express, {Router, Request, Response, response} from 'express';
import seatService from '../services/seatService';
import ReservationService from '../services/reservationService';
import mailDetails from '../model/mailDetailsInterface';
import { reservationDTO } from '../model/reservationDTO';
import seatInputDTO from '../model/seatInputDTO';


const router: Router = express.Router();
const service: seatService = seatService.getInstance();
const reservationService: ReservationService = ReservationService.getInstance();

router.get('/', async (req: Request, res: Response)=> {
    try{
        const seats = await service.getAllSeats();
        res.json(seats);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


router.get('/isExists/:name',async (req:Request,res:Response) => {
    const {name} = req.params;
    console.log(`'${name}'`);
    try{
        const isExist = await service.isExistingSeat({name});
        console.log(isExist);
        res.json(isExist);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})



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

router.patch('/finish-reservation',async (req:Request, res: Response) => {
    const dto: reservationDTO  = req.body
    const updatedItems = await service.setSeatsToReserved(dto);
    const response = {
        message: "Successful Reservation",
        updatedSeats: updatedItems,
    }
    let seatsToString: string = "";
    dto.names.forEach((seat)=> seatsToString += ` ${seat}`);
    const MAIL_SUBJECT: string = "successful reservation";
    const MAIL_MESSAGE: string = "successful reservation for the following seats" + seatsToString;
    let mailDetails: mailDetails = reservationService.createMailDetails(dto.mail, MAIL_SUBJECT, MAIL_MESSAGE);
    try{
        await reservationService.sendMail(mailDetails);
        res.json(response);
    }catch(error){
        console.error(error);
        console.log("Reservation process failed");
        res.status(500).json({error: "Internal Server Error"});
    }
        
    });

export default router;