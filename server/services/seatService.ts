import { PrismaClient, Prisma, Seat, reservationStatus } from "@prisma/client";

const prisma = new PrismaClient();

interface seatInputDTO{
    name: string
}

export default class seatService{
    private static prisma: PrismaClient = new PrismaClient();
    constructor(){}

    async getAllSeats(): Promise<Seat[]>{
        try{
            const seats : Seat[] = await prisma.seat.findMany();
            return seats;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch seats from db');
        }
    }



    async saveNewSeat(data: seatInputDTO){
        try{
            let isExistingSeat: Boolean = await prisma.seat.count({
                where:{
                    name: data.name,
                }}) !== 0;
            if (!isExistingSeat){
                let newSeat = await prisma.seat.create({data});
                return newSeat;
            } else throw new Error("Seat is already existing in the db");   
        } catch (error) {
            console.error(error);
            console.log("Failed to create element in the db");
        }
    }

    async deleteSeat(data: seatInputDTO){
        try{
            await prisma.seat.deleteMany({
                where: {
                    name: data.name,
                }
            })
        } catch (error) {
            console.error(error);
            console.log(`Failed to delete element in db with the following name ${data.name}`);
        }
    }
}