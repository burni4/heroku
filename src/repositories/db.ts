import {MongoClient} from "mongodb";

export type ProductType = {
    id: number
    title: string
}

const mongoURIAtlas: string = ""
const mongoURILocalhost: string = "mongodb://0.0.0.0:27017"

const mongoUri = process.env.mongoURI || mongoURIAtlas || mongoURILocalhost;

export const client = new MongoClient(mongoUri)

export const db = client.db("shop")
export const productsCollection = db.collection<ProductType>("products");

export async function runDb(){

    try {
        await client.connect()
        await client.db("products").command({ping: 1})
        console.log("Connected successfully to mongo server")
    }catch {
        console.log("Can't connect to mongo server!!!")
        await client.close()
    }
}