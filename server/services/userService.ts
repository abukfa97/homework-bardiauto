import { PrismaClient, Prisma, Seat, reservationStatus } from "@prisma/client";

const prisma = new PrismaClient();


async function getAllSeats() : Promise<Seat[]> {
    try{
        const seats : Seat[] = await prisma.seat.findMany();
        return seats;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch seats from db');
    }
}

interface seatInputDTO{
    name: string
}

async function saveNewSeat(data: seatInputDTO) {
    try{
        let x: Boolean = await prisma.seat.count({
            where:{
                name: data.name,
            }}) === 0;
        if(x) {
            let newSeat = await prisma.seat.create({data});
            return newSeat;
        } else throw new Error("Seat is already existing in the db");
    } catch (error) {
        console.error(error);
        console.log(`Failed to create element in db`);
    }
}

export {
    getAllSeats,
    saveNewSeat
};