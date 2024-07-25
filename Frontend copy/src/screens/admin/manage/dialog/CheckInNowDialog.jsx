import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import BillDialog from './BillDialog';

const CheckInNowDialog = ({ visible, hideDialog, data }) => {
    const [visibleBill, setVisibleBill] = useState(false);

    const showDialog = () => setVisibleBill(true);
    const hideDialogBill = () => setVisibleBill(false);

    const [selectedStatus, setSelectedStatus] = useState(""); // New state for status filter
    const [selectedRoom, setSelectedRoom] = useState(""); // New state for status filter

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
                        <p className='text-lg'>ລະຫັດການຈອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.id}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ປະເພດຫ້ອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.roomType}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ຊື່ແລະນາມສະກຸນ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.name}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ປະເພດການຈອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.bookingType}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ມື້ເຂົ້າພັກ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.checkInDate}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ວັນທີຈອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.bookingDate}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ສະຖານະ</p>
                        <select
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            value={selectedStatus}
                        >
                            <option value="2">ອະນຸມັດ</option>
                            <option value="3">ຍົກເລີກ</option>
                        </select>
                      
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ເລືອກຫ້ອງພັກໃຫ້ລູກຄ້າ</p>
                        <select
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            onChange={(e) => setSelectedRoom(e.target.value)}
                            value={selectedRoom}
                        >
                            <option >A12</option>
                            <option >A31</option>
                        </select>
                      
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
                        >
                            {/* <TiPlus className="text-xl mr-2" /> */}
                            <span>ຢືນຢັນ</span>
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

export default CheckInNowDialog;
