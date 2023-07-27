import React from 'react';

const SuccessReserv = ({ room, checkInDate, checkOutDate }) => {
  return (
    <div>
      <h2>Reservation Successful!</h2>
      <p>You have successfully reserved {room.name}.</p>
      <p>Check-in Date: {checkInDate}</p>
      <p>Check-out Date: {checkOutDate}</p>
      {/* You can add more room details here if needed */}
    </div>
  );
};

export default SuccessReserv;
