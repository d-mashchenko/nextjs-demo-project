import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://mashenko0208:j1IFOkhqrtB4zJMR@cluster0.pbexptj.mongodb.net/?retryWrites=true&w=majority'
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup added' });
  }
};

export default handler;
