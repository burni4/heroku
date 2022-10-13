import express, { Request, Response } from "express"
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser()
const products = [{id : 0,title: 'tomato'},{id : 1,title: 'potato'}];
const addresses = [{id : 0, value: 'Minks'},{id:1, title: 'Kiev'}]

app.use(parserMiddleware);

app.get("/", (req: Request, res: Response) => {

    const allMethods = '/showtime /products /addresses';

    res.send(allMethods);
})

app.get("/showtime", (req: Request, res: Response) => {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const MM = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const hh = today.getHours();
    const mm = today.getMinutes();
    const ss = today.getSeconds();

    res.send(MM + '/' + dd + '/' + yyyy + ' ' + hh + ':'+ mm +':' + ss);
})

app.get('/products', (req: Request, res: Response) => {
    if(req.query.title){
        let searchString = req.query.title.toString();
        res.send(products.filter(p=>p.title.indexOf(searchString) > -1));
    }else{
        res.send(products);
    }

})

app.post('/products', (req: Request, res: Response) => {

    const newProduct = {id: +(new Date()), title: req.body.title};

    products.push(newProduct);

    res.status(201).send(newProduct);

})

app.get('/products/:id', (req: Request, res: Response) => {

    let product = products.find(pr => pr.id === +req.params.id)
    if (product){
        res.send(product);
    }else{
        res.send(404);
    }

})
app.put('/products/:id', (req: Request, res: Response) => {

    let product = products.find(pr => pr.id === +req.params.id)

    if (product){
        product.title = req.body.title;
        res.send(product);
    }else{
        res.send(404);
    }

})
app.delete('/products/:id', (req: Request, res: Response) => {

    for (let i =  0; i < products.length; i++){
        if(products[i].id === +req.params.id){
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
})

app.get('/addresses/:id', (req: Request, res: Response) => {

    let address = addresses.find(ad => ad.id === +req.params.id)
    if (address){
        res.send(address);
    }else{
        res.send(404);
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})