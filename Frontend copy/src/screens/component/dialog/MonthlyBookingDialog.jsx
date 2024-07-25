import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const MonthlyBookingDialog = ({ visible, hideDialog }) => {
  const [months, setMonths] = useState(null); // Use null instead of an empty string for Dropdown
  const [checkInDate, setCheckInDate] = useState(null);

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

  const handleConfirm = () => {
    // Your logic for handling the booking details
    hideDialog();
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