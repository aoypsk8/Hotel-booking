import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const EditRoomDialog = ({ visible, hideDialog, data }) => {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        if (data) {
            setSelectedRoom(data.Room_ID || '');
            setSelectedRoomNumber(data.Room_Number || '');
            setSelectedStatus(data.Status || ''); // Ensure default value
        }
    }, [data]);

    // Debugging: Log current state
    useEffect(() => {
        console.log('selectedRoom:', selectedRoom);
        console.log('selectedStatus:', selectedStatus);
    }, [selectedRoom, selectedStatus,selectedRoomNumber]);

    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };
    const handleRoomNumberhange = (e) => {
        setSelectedRoomNumber(e.target.value);
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
                        <p className='text-lg'>ລະຫັດຫ້ອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Room_ID || ''}
                            readOnly
                        />
                    </div>
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
                        <p className='text-lg'>ປະເພດຫ້ອງ</p>
                        <select
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleRoomChange}
                            value={selectedRoom}
                        >
                            <option value="">Select...</option>
                            <option value="A12">A12</option>
                            <option value="A31">A31</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ສະຖານະ</p>
                        <select
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleStatusChange}
                            value={selectedStatus}
                        >
                            <option value="available">ວ່າງ</option>
                            <option value="not_available">ບໍ່ວ່າງ</option>
                        </select>
                    </div>
                    <div className="w-full flex justify-end items-center mt-10 mb-5">
                        <Button
                            type="button"
                            className="flex items-center justify-center w-56 h-12 bg-redBottle rounded-lg text-white font-semibold ml-3"
                            onClick={hideDialog}
                        >
                            <span>ຍົກເລີກ</span>
                        </Button>
                        <Button
                            type="button"
                            className="flex items-center justify-center w-56 h-12 bg-green rounded-lg text-white font-semibold ml-3"
                        >
                            <span>ບັນທືກ</span>
                        </Button>
                    </div>
                </div>
            ) : (
                <p>No data available</p>
            )}
        </Dialog>
    );
};

export default EditRoomDialog;
