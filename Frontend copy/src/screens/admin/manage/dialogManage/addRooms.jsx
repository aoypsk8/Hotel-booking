import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const AddRoomDialog = ({ visible, hideDialog }) => {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(true);
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
    const handleRoomNumberhange = (e) => {
        setSelectedRoomNumber(e.target.value);
    };
    return (
        <Dialog
            header="ເພິ່ມຂໍ້ມູນຫ້ອງ"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            <div>
                <div className="flex justify-between items-center mt-2 px-10">
                    <p className='text-lg'>ເບີຫ້ອງ</p>
                    <input
                        type="text"
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedRoomNumber}
                        onChange={handleRoomNumberhange}
                    />
                </div>
                <div className="flex justify-between items-center mt-2 px-10">
                    <p className=' text-lg '>ປະເພດຫ້ອງ</p>
                    <select
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        value={selectedRoom}
                    >
                        <option >A12</option>
                        <option >A31</option>
                    </select>
                </div>
                <div className="flex justify-between items-center mt-2 px-10">
                    <p className=' text-lg '>ສະຖານະ</p>
                    <select
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        value={selectedStatus}
                    >
                        <option >ວ່າງ</option>
                        <option >ບໍ່ວ່າງ</option>
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
                        <span>ແຈ້ງເຂົ້າ</span>
                    </button>
                </div>

            </div>
        </Dialog>
    );
};

export default AddRoomDialog;
