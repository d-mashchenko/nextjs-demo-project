import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import c from './MeetupDetailPage.module.scss';

const MeetupDetailPage = ({ id, image, title, address, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <section className={c.detail}>
        <img src={image} alt='city-image' />
        <h2>{title}</h2>
        <address>{address}</address>
        <p>{description}</p>
        <p>id is {id}</p>
      </section>
    </>
  );
};

export default MeetupDetailPage;

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://mashenko0208:j1IFOkhqrtB4zJMR@cluster0.pbexptj.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      id: selectedMeetup._id.toString(),
      title: selectedMeetup.title,
      address: selectedMeetup.address,
      image: selectedMeetup.image,
      description: selectedMeetup.description,
    },
  };
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://mashenko0208:j1IFOkhqrtB4zJMR@cluster0.pbexptj.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetupsIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetupsIds.map((item) => ({
      params: { meetupId: item._id.toString() },
    })),
  };
};
