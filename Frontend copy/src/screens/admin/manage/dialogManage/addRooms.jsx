import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Ensure you have sweetalert2 installed
import { GetAlltype } from '../../../../api/typeAPI/typeAction';
import { CreateRoom } from '../../../../api/rooms/roomAction';

const AddRoomDialog = ({ visible, hideDialog }) => {
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
    const [selectedTypeID, setSelectedTypeID] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('1'); // Default to 'Available'
    const [typeData, setTypeData] = useState([]);

    const dispatch = useDispatch();
    const { type } = useSelector((state) => state.type);

    useEffect(() => {
        dispatch(GetAlltype());
    }, [dispatch]);

    useEffect(() => {
        setTypeData(type || []);
    }, [type]);

    const handleTypeRoomChange = (e) => {
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
            if (!selectedRoomNumber || !selectedTypeID) {
                Swal.fire("Error", "Please fill in all fields", "error");
                return;
            }
            const newRoom = {
                Room_Number: selectedRoomNumber,
                Type_ID: selectedTypeID,
                Status: selectedStatus
            };
            dispatch(CreateRoom(newRoom)).then(() => {
                Swal.fire("Success", "Room created successfully", "success");
                hideDialog();
                // Clear the form fields
                setSelectedRoomNumber('');
                setSelectedTypeID('');
                setSelectedStatus('1');
            }).catch(error => {
                console.error('Error creating room:', error);
                Swal.fire("Error", "There was an error creating the room", "error");
            });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <Dialog
            header="Add Room"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            <div>
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
                        onChange={handleTypeRoomChange}
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
        </Dialog>
    );
};

export default AddRoomDialog;
