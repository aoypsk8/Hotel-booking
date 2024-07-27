import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Ensure you have sweetalert2 installed
import { GetAlltype } from '../../../../api/typeAPI/typeAction';
import { UpdateRoom } from '../../../../api/rooms/roomAction';

const EditRoomDialog = ({ visible, hideDialog, data }) => {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedTypeID, setSelectedTypeID] = useState('');
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [typeData, setTypeData] = useState([]);

    const dispatch = useDispatch();
    const { type } = useSelector((state) => state.type);

    useEffect(() => {
        if (data) {
            setSelectedRoom(data.Room_ID || '');
            setSelectedTypeID(data.Type_ID || '');
            setSelectedRoomNumber(data.Room_Number || '');
            setSelectedStatus(data.Status || '');
        }
    }, [data]);

    useEffect(() => {
        dispatch(GetAlltype());
    }, [dispatch]);

    useEffect(() => {
        setTypeData(type || []);
    }, [type]);

    // Log selectedStatus whenever it changes
    useEffect(() => {
        console.log(selectedStatus);
        console.log(selectedTypeID);
    }, [selectedStatus]);

    const handleTypeChange = (e) => {
        setSelectedTypeID(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleRoomNumberChange = (e) => {
        setSelectedRoomNumber(e.target.value);
    };

    const handleSave = async () => {
        try {
            const updatedRoom = {
                Type_ID: selectedTypeID,
                Room_Number: selectedRoomNumber,
                Status: selectedStatus || 1
            };
            console.log(updatedRoom);
            dispatch(UpdateRoom(updatedRoom, data.Room_ID)).then(() => {
                hideDialog();
            }).catch(error => {
                console.error('Error updating type:', error);
                hideDialog();
            });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <Dialog
            header="Edit Room"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            {data ? (
                <div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>Room ID</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Room_ID || ''}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>Room Number</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedRoomNumber}
                            onChange={handleRoomNumberChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>Room Type</p>
                        <select
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleTypeChange}
                            value={selectedTypeID}
                        >
                            <option value="">Select...</option>
                            {typeData.map((type) => (
                                <option key={type.Type_ID} value={type.Type_ID}>
                                    {type.Type_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>Status</p>
                        <select
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleStatusChange}
                            value={selectedStatus}
                        >
                            <option value="1">ວ່າງ</option>
                            <option value="0">ບໍ່ວ່າງ</option>
                        </select>
                    </div>
                    <div className="w-full flex justify-end items-center mt-10 mb-5">
                        <Button
                            type="button"
                            className="flex items-center justify-center w-56 h-12 bg-redBottle rounded-lg text-white font-semibold ml-3"
                            onClick={hideDialog}
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            type="button"
                            className="flex items-center justify-center w-56 h-12 bg-green rounded-lg text-white font-semibold ml-3"
                            onClick={handleSave}
                        >
                            <span>Save</span>
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
