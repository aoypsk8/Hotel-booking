import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import MonthlyBookingDialog from './dialog/MonthlyBookingDialog';
import YearlyBookinDialog from './dialog/YearlyBookinDialog';
import DailyBookingDialog from './dialog/DailyBookingDialog';

const BookingDialog = ({ visible, hideDialog, data ,Cus_ID}) => {
    const [daylyDialogVisible, setDalyDialogVisible] = useState(false);
    const [monthlyDialogVisible, setMonthlyDialogVisible] = useState(false);
    const [yearDialogVisible, setYearDialogVisible] = useState(false);


    const handleDailyBooking = () => {
        setDalyDialogVisible(true);
    };

    const handleMonthlyBooking = () => {
        setMonthlyDialogVisible(true);
    };
    const handleYearlyBooking = () => {
        setYearDialogVisible(true);
    };

    const handleMonthlyDialogClose = () => {
        setMonthlyDialogVisible(false);
        hideDialog(); 
    };
    const handleYearDialogClose = () => {
        setYearDialogVisible(false);
        hideDialog(); 
    };
    const handleDayDialogClose = () => {
        setDalyDialogVisible(false);
        hideDialog(); 
    };
    return (
        <>
            <Dialog
                header="ຕ້ອງການຈອງຫ້ອງ ຫຼື ບໍ່"
                visible={visible}
                style={{ width: '30rem' }}
                modal
                onHide={hideDialog}
            >
                <div className="flex flex-col align-items-center items-center mb-5">
                    <h3 className=''>ກະລຸນາເລືອກປະເພດການຈອງ</h3>
                </div>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-2">
                    <Button
                        type="button"
                        severity="success"
                        label="ຈອງເປັນຄືນ"
                        onClick={handleDailyBooking}
                        className="w-full bg-scueecssColor p-2 text-black rounded-lg"
                    />
                    <Button
                        type="button"
                        severity="success"
                        label="ຈອງເປັນເດືອນ"
                        onClick={handleMonthlyBooking}
                        className="w-full bg-scueecssColor p-2 text-black rounded-lg"
                    />
                    <Button
                        type="button"
                        severity="success"
                        label="ຈອງເປັນປີ"
                        onClick={handleYearlyBooking}
                        className="w-full bg-scueecssColor p-2 text-black rounded-lg"
                    />
                </section>
            </Dialog>

            <MonthlyBookingDialog
                data={data}
                Cus_ID={Cus_ID}
                visible={monthlyDialogVisible}
                hideDialog={handleMonthlyDialogClose}
            />
            <YearlyBookinDialog
                data={data}
                visible={yearDialogVisible}
                hideDialog={handleYearDialogClose}
                Cus_ID={Cus_ID}
            />
            <DailyBookingDialog
                data={data}
                Cus_ID={Cus_ID}
                visible={daylyDialogVisible}
                hideDialog={handleDayDialogClose}
            />
        </>
    );
};

export default BookingDialog;
