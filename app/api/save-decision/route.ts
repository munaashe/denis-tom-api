

import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);


export async function POST(req: Request) {
    if (req.method === 'POST') {
        const { decision } = await req.json();

        if (!decision) {
            return NextResponse.json({ error: 'Decision data is required' }, { status: 400 });
        }

        try {
            await client.connect();

            const database = client.db('tom-api');

            // Choose a name for your collection
            const collection = database.collection('decision_collection');

            await collection.insertOne({ decision });

            return NextResponse.json({ message: 'Decision saved successfully!' }, { status: 201 });
        } catch (error) {
            console.error('Failed to save decision:', error);
            return NextResponse.json({ error: 'Failed to save decision' }, { status: 500 });
        } finally {
            await client.close();
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}