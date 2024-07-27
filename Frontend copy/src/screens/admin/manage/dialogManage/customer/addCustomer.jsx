import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { CreateCustomerA } from '../../../../../api/Customer/customerAAction';
import { useDispatch } from 'react-redux';

const AddCustomerDialog = ({ visible, hideDialog }) => {
    const dispatch = useDispatch();
    const [selectedName, setSelectedName] = useState('');
    const [selectedSurname, setSelectedSurname] = useState('');
    const [selectedphoneNumber, setSelectedphoneNumber] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassport, setSelectedPassport] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [selectedimage, setSelectedimage] = useState('');

    // Debugging: Log current state
    useEffect(() => {
    }, [selectedName, selectedSurname, selectedphoneNumber, selectedEmail, selectedimage]);
    const handleNameChange = (e) => setSelectedName(e.target.value);
    const handleSurnameChange = (e) => setSelectedSurname(e.target.value);
    const handlephoneNumberChange = (e) => setSelectedphoneNumber(e.target.value);
    const handleEmailChange = (e) => setSelectedEmail(e.target.value);
    const handlePassportChange = (e) => setSelectedPassport(e.target.value);
    const handlePasswordChange = (e) => setSelectedPassword(e.target.value);
    const handleImageChange = (e) => setSelectedimage(e.target.files[0]);


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('First_name', selectedName);
        formData.append('Last_name', selectedSurname);
        formData.append('Phone_Number', selectedphoneNumber);
        formData.append('Email', selectedEmail);
        formData.append('Passport', selectedPassport);
        formData.append('Password', selectedPassword);
        formData.append('image', selectedimage);

        // Dispatch the action with the formData
        dispatch(CreateCustomerA(formData)).then(() => {
            hideDialog();
        }).catch(error => {
            console.error('Error updating type:', error);
            hideDialog();
            // Optionally, handle the error or show a message to the user
        });

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
                    <p className='text-lg'>Passport</p>
                    <input
                        type="text"
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedPassport}
                        onChange={handlePassportChange}
                    />
                </div>
                <div className="flex justify-between items-center mt-2 px-10">
                    <p className='text-lg'>Password</p>
                    <input
                        type="text"
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedPassword}
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="flex justify-between items-center mt-2 px-10" >
                    <p className='text-lg'>ຮູບພາບ</p>
                    <input
                        type="file"
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleImageChange}
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
        </Dialog>
    );
};

export default AddCustomerDialog;
