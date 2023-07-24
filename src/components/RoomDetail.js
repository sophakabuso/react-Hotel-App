
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase/firebaseConfig';

function RoomDetail() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomRef = firestore.collection('rooms').doc(roomId);
        const roomSnapshot = await roomRef.get();

        if (roomSnapshot.exists) {
          setRoom(roomSnapshot.data());
        } else {
          console.log('Room not found');
        }
      } catch (error) {
        console.log('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Room Detail</h1>
      <h2>{room.name}</h2>
      <img src={room.image} alt={room.name} />
      <p>{room.features}</p>
      <p>Price: ${room.price}</p>
    </div>
  );
}

export default RoomDetail;
