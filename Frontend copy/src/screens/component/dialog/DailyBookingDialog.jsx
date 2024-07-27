import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { CreateBooking } from '../../../api/booking/bookingAction';

const DailyBookingDialog = ({ visible, hideDialog, data, Cus_ID }) => {
  console.log(Cus_ID);
  const dispatch = useDispatch();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // Get today's date and reset the time to midnight
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleConfirm = () => {
    const formattedCheckInDate = formatDate(checkInDate);
    const formattedCheckOutDate = formatDate(checkOutDate);
    console.log(data);

    // CreateBooking                       //day = 1        //month = 2   //year = 3
    dispatch(CreateBooking(data.Type_ID, Cus_ID, 1, formattedCheckInDate, formattedCheckOutDate, 1)).then(() => {
      hideDialog();
    }).catch(error => {
      console.error('Error updating type:', error);
      hideDialog();
      // Optionally, handle the error or show a message to the user
    });
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
