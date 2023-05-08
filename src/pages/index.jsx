import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '@/components/meetups/MeetupList';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta name='description' content='A list of react meetups' />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://mashenko0208:j1IFOkhqrtB4zJMR@cluster0.pbexptj.mongodb.net/?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((item) => ({
        title: item.title,
        address: item.address,
        image: item.image,
        id: item._id.toString(),
      })),
    },
    revalidate: 10,
  };
};
export default HomePage;
