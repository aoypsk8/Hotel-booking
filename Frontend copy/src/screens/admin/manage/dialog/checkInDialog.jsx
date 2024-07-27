import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import BillDialog from './BillDialog';
import { UpdateBooking, UpdateBookingCheckIn } from '../../../../api/booking/bookingAction';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
// Example data (replace this with your actual data source)
const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
}

const CheckInDialog = ({ visible, hideDialog, data }) => {
    const dispatch = useDispatch();
    // Dialog state and data
    const [visibleBill, setVisibleBill] = useState(false);

    const showDialog = () => {
        try {
            dispatch(UpdateBookingCheckIn(data.Booking_ID, 3)).then(() => {
                Swal.fire("Success", "Check-In successfully", "success");
                setVisibleBill(true);
            }).catch(error => {
                console.error('Error creating room:', error);
                Swal.fire("Error", "There was an error Check-In", "error");
            });


        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const hideDialogBill = () => {
        setVisibleBill(false);
    };
    return (
        <Dialog
            header="ກວດສອບການຈອງ"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            {data ? (
                <div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ລະຫັດການຈອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Booking_ID}
                            readOnly

                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ເບີຫ້ອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Room_Number}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ປະເພດຫ້ອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Type_name}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ປະເພດການຈອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Type_Booking === 1 ? "ເປັນມື້" : data.Type_Booking === 2 ? "ເປັນເດືອນ" : "ເປັນປີ"}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ວັນທີ່ແຈ້ງເຂົ້າ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formatDate(data.Check_IN)}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ວັນທີ່ແຈ້ງອອກ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formatDate(data.Check_OUT)}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ວັນທີ່ຈອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formatDate(data.Create_Date)}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ຈຳນວນມື້ທີ່ຈອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.daysBooked}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ຊື່ຜູ້ໃຊ້</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.First_name + data.Last_name}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ເບິໂທ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Phone_Number}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>Email</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Email}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ລາຄາລວມ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formatNumber(data.total)}
                            readOnly
                        />
                    </div>

                    <div className="w-full flex justify-end items-center mt-10 mb-5">
                        <button
                            type="button"
                            className="flex items-center justify-center w-56 h-12 bg-redBottle rounded-lg text-white font-semibold ml-3"
                            onClick={hideDialog}
                        >
                            {/* <TiPlus className="text-xl mr-2" /> */}
                            <span>ຍົກເລີກ</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center w-56 h-12 bg-green rounded-lg text-white font-semibold ml-3"
                            onClick={showDialog}
                        >
                            {/* <TiPlus className="text-xl mr-2" /> */}
                            <span>ແຈ້ງເຂົ້າ</span>
                        </button>
                    </div>

                </div>
            ) : (
                <p>No data available</p>
            )}


            <BillDialog visible={visibleBill} hideDialog={hideDialogBill} data={data} hideCheckInDialog={hideDialog} />
        </Dialog>
    );
};

export default CheckInDialog;
