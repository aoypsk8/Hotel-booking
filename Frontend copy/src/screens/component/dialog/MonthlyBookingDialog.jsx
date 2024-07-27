import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { CreateBooking } from '../../../api/booking/bookingAction';

const MonthlyBookingDialog = ({ visible, hideDialog, data, Cus_ID }) => {
  console.log(Cus_ID);
  const dispatch = useDispatch();
  const [months, setMonths] = useState(null); // Use null instead of an empty string for Dropdown
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // Get today's date and reset the time to midnight
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);


  // Options for the Dropdown component
  const monthOptions = [
    { label: '1 ເດືອນ', value: 1 },
    { label: '2 ເດືອນ', value: 2 },
    { label: '3 ເດືອນ', value: 3 },
    { label: '4 ເດືອນ', value: 4 },
    { label: '5 ເດືອນ', value: 5 },
    { label: '6 ເດືອນ', value: 6 },
    { label: '7 ເດືອນ', value: 7 },
    { label: '8 ເດືອນ', value: 8 },
    { label: '9 ເດືອນ', value: 9 },
    { label: '10 ເດືອນ', value: 10 },
  ];
  // Function to calculate checkout date
  const calculateCheckOutDate = () => {
    if (checkInDate && months) {
      const newCheckOutDate = new Date(checkInDate);
      newCheckOutDate.setMonth(newCheckOutDate.getMonth() + months);
      setCheckOutDate(newCheckOutDate);
    }
  };

  // Update checkout date when months or checkInDate changes
  useEffect(() => {
    calculateCheckOutDate();
  }, [months, checkInDate]);

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
    dispatch(CreateBooking(data.Type_ID, Cus_ID, 2, formattedCheckInDate, formattedCheckOutDate, 1)).then(() => {
      hideDialog();
    }).catch(error => {
      console.error('Error updating type:', error);
      hideDialog();
      // Optionally, handle the error or show a message to the user
    });
  };

  return (
    <Dialog
      header="ຈອງເປັນເດືອນ"
      visible={visible}
      style={{ width: '30rem' }}
      modal
      onHide={hideDialog}
    >
      <div className="flex flex-col mb-4">
        <label htmlFor="months" className="mb-2">ເລືອກຈຳນວນເດືອນ:</label>
        <Dropdown
          id="months"
          value={months}
          options={monthOptions}
          onChange={(e) => setMonths(e.value)}
          placeholder="ເລືອກຈຳນວນເດືອນ"
          className="mb-4 w-full"
        />
        <label htmlFor="checkInDate" className="mb-2">ເລືອກວັນເຂົ້າ:</label>
        <Calendar
          id="checkInDate"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.value)}
          showIcon
          minDate={minDate}  // Set the minimum selectable date to today
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

export default MonthlyBookingDialog;
