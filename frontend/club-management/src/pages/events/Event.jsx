import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard';
import { Table } from '@chakra-ui/react';

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
  const props = {
    logo: "",
    name: "name of person",
    status: "55",
    budget: "77",
    progression: "55",
    lastItem: "55",
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <Table>
      </Table>
     
      {eventData.map((evt) => (
        <EventCard key={evt.title} eventData={evt} />
      ))}
    </div>
  );
}

export default Event;