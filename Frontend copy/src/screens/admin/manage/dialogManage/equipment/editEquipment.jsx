import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { UpdateEquipment } from '../../../../../api/equipment/equipmentAction';
import { useDispatch } from 'react-redux';

const EditEquipmentDialog = ({ visible, hideDialog, data }) => {
    const dispatch = useDispatch();
    const [selectedName, setSelectedName] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    useEffect(() => {
        if (data) {
            setSelectedName(data.EquipmentName || '');
            setSelectedAmount(data.amount || '');
            setSelectedPrice(data.price || '');
        }
    }, [data]);

    // Debugging: Log current state
    useEffect(() => {
    }, [selectedName, selectedAmount, selectedPrice]);

    const handleNameChange = (e) => setSelectedName(e.target.value);
    const handleAmountChange = (e) => setSelectedAmount(e.target.value);
    const handlePriceChange = (e) => setSelectedPrice(e.target.value);


    const handleSubmit = () => {
        dispatch(UpdateEquipment(data.EquipmentID, selectedName,selectedAmount,selectedPrice)).then(() => {
            hideDialog();
        }).catch(error => {
            console.error('Error updating type:', error);
            hideDialog();
        });

    };
    return (
        <Dialog
            header="Update Equipment"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            {data ? (
                <div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລະຫັດອຸປະກອນ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.EquipmentID || ''}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ຊື່ອຸປະກອນ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedName}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'> ຈຳນວນ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedAmount}
                            onChange={handleAmountChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລາຄາ/ອັນ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedPrice}
                            onChange={handlePriceChange}
                        />
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
                            onClick={() => handleSubmit()}
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

export default EditEquipmentDialog;
