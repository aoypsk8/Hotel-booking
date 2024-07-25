import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const AddCustomerDialog = ({ visible, hideDialog }) => {
    const [selectedName, setSelectedName] = useState('');
    const [selectedSurname, setSelectedSurname] = useState('');
    const [selectedphoneNumber, setSelectedphoneNumber] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedimage, setSelectedimage] = useState('');

    // Debugging: Log current state
    useEffect(() => {
    }, [selectedName, selectedSurname, selectedphoneNumber, selectedEmail, selectedimage]);

    const handleNameChange = (e) => {
        setSelectedName(e.target.value);
    };

    const handleSurnameChange = (e) => {
        setSelectedSurname(e.target.value);
    };

    const handlephoneNumberChange = (e) => {
        setSelectedphoneNumber(e.target.value);
    };
    const handleEmailChange = (e) => {
        setSelectedEmail(e.target.value);
    };

    return (
        <Dialog
            header="Add Customer"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            <div>
                
                <div className="flex justify-between items-center mt-2 px-10">
                    <p className='text-lg'>ຊື່</p>
                    <input
                        type="text"
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedName}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="flex justify-between items-center mt-2 px-10">
                    <p className='text-lg'>ນາມສະກຸນ</p>
                    <input
                        type="text"
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedSurname}
                        onChange={handleSurnameChange}
                    />
                </div>
                <div className="flex justify-between items-center mt-2 px-10">
                    <p className='text-lg'>ເບີໂທ</p>
                    <input
                        type="text"
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedphoneNumber}
                        onChange={handlephoneNumberChange}
                    />
                </div>
                <div className="flex justify-between items-center mt-2 px-10">
                    <p className='text-lg'>Email</p>
                    <input
                        type="email"
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedEmail}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="flex justify-between items-center mt-2 px-10">
                    <p className='text-lg'>ຮູບພາບ</p>
                    <input
                        readOnly
                        type="text"
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"

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
                    >
                        <span>ບັນທືກ</span>
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default AddCustomerDialog;