import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

function MeetupList({ meetups }) {
  return (
    <ul className={classes.list}>
      {meetups.map((item) => (
        <MeetupItem
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          address={item.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
