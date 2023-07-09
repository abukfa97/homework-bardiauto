import { PrismaClient, Prisma, Seat, reservationStatus } from "@prisma/client";
import { reservationDTO } from "../model/reservationDTO";
import seatInputDTO from "../model/seatInputDTO";

export default class seatService{
    private static prisma: PrismaClient = new PrismaClient();
    private static seatService: seatService;
    constructor(){}

    static getInstance(){
        if(!this.seatService){
            this.seatService = new seatService();
        }
        return this.seatService;
    }

    async getAllSeats(): Promise<Seat[]>{
        try{
            const seats : Seat[] = await seatService.prisma.seat.findMany();
            return seats;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch seats from db');
        }
    }

    async isExistingSeat(data: seatInputDTO){
        let isExistingSeat: Boolean = await seatService.prisma.seat.count({
            where:{
                name: data.name,
            }}) !== 0;
        return isExistingSeat;    
    }

    async saveNewSeat(data: seatInputDTO){
        try{
            let newSeat = await seatService.prisma.seat.create({data});
            return newSeat;
        } catch (error) {
            console.error(error);
            console.log("Failed to create element in the db");
        }
    }

    async deleteSeat(data: seatInputDTO){
        try{
            await seatService.prisma.seat.deleteMany({
                where: {
                    name: data.name,
                }
            })
        } catch (error) {
            console.error(error);
            console.log(`Failed to delete element in db with the following name ${data.name}`);
        }
    }

    async setSeatsToReserved(data: reservationDTO){
        try{
            let result: Seat[] = [];
            data.names.forEach(async (seatName) => {
                result.push(
                    await seatService.prisma.seat.update({
                    where: {
                        name: seatName
                    },
                    data: {
                        reservationStatus: reservationStatus.RESERVED,
                        reservationMail: data.mail,
                        reservationEnds: new Date(),
                    }
                }));
            });
            return result;
        }catch(error){
            console.error(error);
            console.log('Failed to update seat(s) in database!');
        } 
    }
}