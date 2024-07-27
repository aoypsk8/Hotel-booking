import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllEquipment } from '../../../../api/equipment/equipmentAction';
import Swal from 'sweetalert2';
import BillDialog from './BillDialog';
import { UpdateBookingCheckIn, UpdateBookingCheckOut } from '../../../../api/booking/bookingAction';

const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

const CheckOutDialog = ({ visible, hideDialog, data }) => {
    const dispatch = useDispatch();
    const [visibleBill, setVisibleBill] = useState(false);

    const [equipmentData, setEquipmentData] = useState([]);
    const { equipment } = useSelector((state) => state.equipment);

    useEffect(() => {
        dispatch(GetAllEquipment());
    }, [dispatch]);

    useEffect(() => {
        setEquipmentData(equipment || []);
    }, [equipment]);

    const [selectedEquipment, setSelectedEquipment] = useState([]); // Use array for multiple selections
    const handleEquipmentChange = (e) => {
        setSelectedEquipment(e.value); // e.value contains the selected values
    };
    const handleSave = () => {
        try {
            if (!data || !data.Booking_ID) {
                Swal.fire("Error", "No booking data available", "error");
                return;
            }
            const updatedBookingData = {
                Status: 4,
                equipmentIds: selectedEquipment // Send equipment IDs as an array
            };
            //equipmentIds
            dispatch(UpdateBookingCheckOut(data.Room_ID,data.Booking_ID, updatedBookingData))
                .then(() => {
                    Swal.fire("Success", "Booking updated successfully", "success");
                    setVisibleBill(true);
                })
                .catch(error => {
                    console.error('Error updating booking:', error);
                    Swal.fire("Error", "There was an error updating the booking", "error");
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
            header="ກວດສອບຂໍໍາມູນ"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            {data ? (
                <div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລະຫັດແຈ້ງເຂົ້າ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.Booking_ID}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ເບີຫ້ອງ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.Room_Number}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ວັນທີ່ແຈ້ງເຂົ້າ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={formatDate(data.Check_IN)}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ຊື່ ແລະ ນາມສະກຸນລູກຄ້າ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.First_name + ' ' + data.Last_name}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ເບີໂທລະສັບ</p>
                        <input
                            type="search"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            value={data.Phone_Number}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ອຸປະກອນທີ່ສໍາເລີຍ</p>
                        <MultiSelect
                            options={equipmentData}
                            optionLabel="EquipmentName"
                            value={selectedEquipment}
                            onChange={handleEquipmentChange}
                            className="block w-[30rem] p-4 text-xl text-black border border-bgHead rounded-lg bg-bgColor"
                            placeholder="Select equipment"
                        />
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
                            <span>ແຈ້ງອອກ</span>
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

export default CheckOutDialog;
