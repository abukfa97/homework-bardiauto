# Cinema Reservation System For Bárdi Auto

---

[![abukfa97][abukfa97-linkedin-shield]][abukfa97-linkedin-url]

## Project about:


### Features:
 * User can reserve seats in the cinema room (max. two seats/ user).
 * Statuses:
   * Application shows the free seats with ***green color***.
   * Application shows reserved seats by others with ***red color***.
   * The seats what the user selected has blue color.
 * Verification mail:
   * The application send a verification HTML mail to the user when the reservation was successful.

 * The seat is unique in the db.
   * So two user can't reserve the same seat in different time.
 
### Future plans:
 * Implement the handling of the seat statuses with websocket.
   * It's going to avoid the same reservation case in same time.
 
 * Check the reservation date times in every minute and delete the unsuccessful reservations after two minutes.
   * I have some idea for it. (eg. cron).
 
 * Display the reservation statuses in real-time on frontend side
   * the websocket will helps in this.
 * Deploy the application
 

### Tech Stack

 * [![React][React.js]][React-url]
 * [![MySql][mysql]][mysql-url]
 * [![Express.js][express]][express-url]
 * [![Node.js][node]][nodejs-url]
 * [![PrismaORM][prisma]][prisma-url]

### Installation guide

1) Create a database with mySql
2) Fill out the .env file with db_username,related_password,db_name
3) Open the server folder and run ```npm install```
4) ```bash
   npx prisma migrate dev --name init_db
   ```
5) Run the server ```npm run dev``` -> the compiled files will be in the server/dist/ folder
6) Open the client/frontend folder and install dependencies -> ```npm install```
7) Run the frontend server ```npm run dev```

[abukfa97-linkedin-shield]: https://img.shields.io/badge/-Bükfa_Adrián-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[abukfa97-linkedin-url]: https://www.linkedin.com/in/adri%C3%A1n-b%C3%BCkfa-1a9800187/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[mysql]: https://img.shields.io/badge/MySql-grey?style=for-the-badge&logo=mysql&logoColor=61DAFB
[mysql-url]: https://dev.mysql.com/doc/

[express]: https://img.shields.io/badge/Express.js-20232A?style=for-the-badge&logo=express&logoColor=black
[express-url]: https://expressjs.com

[node]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org/en/doc

[prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[prisma-url]: https://prisma.io

**Made with :heart: in Budapest, 2023**