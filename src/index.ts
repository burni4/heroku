import express, { Request, Response } from "express";
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {

    // com

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    res.send(mm + '/' + dd + '/' + yyyy);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})