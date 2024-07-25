import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const DailyBookingDialog = ({ visible, hideDialog }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // Get today's date and reset the time to midnight
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const handleConfirm = () => {
    // Your logic for handling the daily booking details
    hideDialog();
  };

  const handleCheckInDateChange = (e) => {
    const date = e.value;
    setCheckInDate(date);
    
    // Set check-out date to one day after the check-in date
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      setCheckOutDate(nextDay);
    } else {
      setCheckOutDate(null);
    }
  };

  return (
    <Dialog
      header="ຈອງເປັນຄືນ"
      visible={visible}
      style={{ width: '30rem' }}
      modal
      onHide={hideDialog}
    >
      <div className="flex flex-col mb-4">
        <label htmlFor="checkInDate" className="mb-2">ເລືອກວັນເຂົ້າ:</label>
        <Calendar
          id="checkInDate"
          value={checkInDate}
          onChange={handleCheckInDateChange}
          showIcon
          minDate={minDate}
          className="mb-4 w-full"
        />
        <label htmlFor="checkOutDate" className="mb-2">ເລືອກວັນເຂົ້າສົດ:</label>
        <Calendar
          id="checkOutDate"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.value)}
          showIcon
          minDate={checkInDate ? checkInDate : minDate}
          className="mb-4 w-full"
        />
      </div>
      <Button
        label="ຢືນຢັນ"
        onClick={handleConfirm}
        className="w-full bg-scueecssColor p-2 text-black rounded-lg"
      />
    </Dialog>
  );
};

export default DailyBookingDialog;
