import {MongoClient} from "mongodb";

const mongoUri = process.env.mongoURI || "";

export const client = new MongoClient(mongoUri)

export async function runDb(){

}