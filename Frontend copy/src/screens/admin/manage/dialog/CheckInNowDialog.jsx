import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import BillDialog from './BillDialog';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllRoomWhereType } from '../../../../api/rooms/roomAction';
import Swal from 'sweetalert2';
import { UpdateBooking } from '../../../../api/booking/bookingAction';

const formatDate = (isoDateString) => {
    if (!isoDateString) return ''; // Return an empty string if date is not provided
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

const CheckInNowDialog = ({ visible, hideDialog, data }) => {
    const [visibleBill, setVisibleBill] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(1);
    const [roomData, setRoomData] = useState([]);
    const [selectedRoomID, setSelectedRoomID] = useState('');
    const dispatch = useDispatch();
    const { room } = useSelector((state) => state.room);

    useEffect(() => {
        if (data && data.Type_ID) {
            dispatch(GetAllRoomWhereType(data.Type_ID));
        }
    }, [dispatch, data]);

    useEffect(() => {
        setRoomData(room || []);
    }, [room]);

    const handleRoomChange = (e) => {
        setSelectedRoomID(e.target.value);
    };

    const handleSave = async () => {
        try {
            if (!data || !data.Booking_ID) {
                Swal.fire("Error", "No booking data available", "error");
                return;
            }

            const status = selectedStatus == 1 ? 2 : 0;
            dispatch(UpdateBooking(data.Booking_ID, selectedRoomID, status))
                .then(() => {
                    Swal.fire("Success", "Room updated successfully", "success");
                    hideDialog();
                })
                .catch(error => {
                    console.error('Error updating room:', error);
                    Swal.fire("Error", "There was an error updating the room", "error");
                });
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
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
                        <p className='text-lg'>ລະຫັດການຈອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.Booking_ID || ''}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ປະເພດຫ້ອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.Type_name || ''}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ຊື່ແລະນາມສະກຸນ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={(data.First_name || '') + ' ' + (data.Last_name || '')}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ປະເພດການຈອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={
                                data.Type_Booking === 1
                                    ? "ເປັນມື້"
                                    : data.Type_Booking === 2
                                        ? "ເປັນເດືອນ"
                                        : "ເປັນປີ"
                            }
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ມື້ເຂົ້າພັກ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={formatDate(data.Check_IN)}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ວັນທີຈອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={formatDate(data.Create_Date)}
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
                            <option value="1">ອະນຸມັດ</option>
                            <option value="0">ຍົກເລີກ</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ເລືອກຫ້ອງພັກໃຫ້ລູກຄ້າ</p>
                        <select
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            onChange={handleRoomChange}
                            value={selectedRoomID}
                        >
                            <option value="">Select...</option>
                            {roomData.map((type) => (
                                <option key={type.Room_ID} value={type.Room_ID}>
                                    {type.Room_Number}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full flex justify-end items-center mt-10 mb-5">
                        <button
                            type="button"
                            className="flex items-center justify-center w-56 h-12 bg-redBottle rounded-lg text-white font-semibold ml-3"
                            onClick={hideDialog}
                        >
                            <span>ຍົກເລີກ</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center w-56 h-12 bg-green rounded-lg text-white font-semibold ml-3"
                            onClick={handleSave}
                        >
                            <span>ຢືນຢັນ</span>
                        </button>
                    </div>
                </div>
            ) : (
                <p>No data available</p>
            )}
            <BillDialog visible={visibleBill} hideDialog={() => setVisibleBill(false)} />
        </Dialog>
    );
};

export default CheckInNowDialog;
