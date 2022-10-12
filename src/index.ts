import express, { Request, Response } from "express";
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const MM = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const hh = today.getHours();
    const mm = today.getMinutes();
    const ss = today.getSeconds();

    res.send(MM + '/' + dd + '/' + yyyy + ' ' + hh + ':'+ mm +':' + ss);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})