import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import BillDialog from './BillDialog';

const CheckInDialog = ({ visible, hideDialog, data }) => {
    // Dialog state and data
    const [visibleBill, setVisibleBill] = useState(false);

    const showDialog = () => {
        setVisibleBill(true);
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
                            value={data.id}
                            readOnly

                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ເບີຫ້ອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.roomNumber}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ປະເພດຫ້ອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.roomType}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ປະເພດການຈອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.roomBooking}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ຈຳນວນ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.amount}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ວັນທີ່ແຈ້ງເຂົ້າ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.checkInDate}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ວັນທີ່ແຈ້ງອອກ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.checkOutDate}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ວັນທີ່ຈອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.dataBooking}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ຊື່ຜູ້ໃຊ້</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.name}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ເບິໂທ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.phoneNumer}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>Email</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.email}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className=' text-lg '>ລາຄາລວມ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.total}
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


            <BillDialog visible={visibleBill} hideDialog={hideDialogBill} />
        </Dialog>
    );
};

export default CheckInDialog;
