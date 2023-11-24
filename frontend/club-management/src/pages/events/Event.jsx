import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard';

function Event() {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/events');
        setEventData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventData();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {eventData.map((evt) => (
        <EventCard key={evt.title} eventData={evt} />
      ))}
    </div>
  );
}

export default Event;