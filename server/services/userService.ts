import { PrismaClient, Prisma, Seat } from "@prisma/client";

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
        const newSeat = prisma.seat.create({data});
        return newSeat;
    } catch (error) {
        console.error(error);
        console.log(`Failed to create element in db`);
    }
}

export {
    getAllSeats,
    saveNewSeat
};