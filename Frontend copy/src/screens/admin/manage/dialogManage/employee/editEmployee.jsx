import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { UpdateEmployee } from '../../../../../api/employee/employeeAction';

const EditEmployeeDialog = ({ visible, hideDialog, data }) => {
    const dispatch = useDispatch();
    const [selectedName, setSelectedName] = useState('');
    const [selectedSurname, setSelectedSurname] = useState('');
    const [selectedphoneNumber, setSelectedphoneNumber] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [selectedimage, setSelectedimage] = useState('');

    useEffect(() => {
        if (data) {
            setSelectedName(data.Emp_FirstName || '');
            setSelectedSurname(data.Emp_LastName || '');
            setSelectedphoneNumber(data.Phone_Number || '');
            setSelectedAddress(data.Emp_Address || '');
            setSelectedPassword(data.Password || '');
            setSelectedimage(data.Emp_Profile || '');
            // setSelectedimage(data.area || '');
        }
    }, [data]);

    // Debugging: Log current state
    useEffect(() => {
    }, [selectedName, selectedSurname, selectedphoneNumber, selectedAddress, selectedimage]);

    const handleNameChange = (e) => setSelectedName(e.target.value);
    const handleSurnameChange = (e) => setSelectedSurname(e.target.value);
    const handlephoneNumberChange = (e) => setSelectedphoneNumber(e.target.value);
    const handleAddressChange = (e) => setSelectedAddress(e.target.value);
    const handlePasswordChange = (e) => setSelectedPassword(e.target.value);
    const handleImageChange = (e) => setSelectedimage(e.target.files[0]);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('Emp_FirstName', selectedName);
        formData.append('Emp_LastName', selectedSurname);
        formData.append('Phone_Number', selectedphoneNumber);
        formData.append('Emp_Address', selectedAddress);
        formData.append('Password', selectedPassword);
        formData.append('image', selectedimage);
        dispatch(UpdateEmployee(data.Emp_ID, formData)).then(() => {
            hideDialog();
        }).catch(error => {
            console.error('Error updating type:', error);
            hideDialog();
        });
    };
    return (
        <Dialog
            header="Update Employee"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            {data ? (
                <div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລະຫັດພະນັກງານ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Emp_ID || ''}
                            readOnly
                        />
                    </div>
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
                        <p className='text-lg'>ທີ່ຢູ່ປັດຈຸບັນ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedAddress}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລະຫັດ</p>
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
            ) : (
                <p>No data available</p>
            )}
        </Dialog>
    );
};

export default EditEmployeeDialog;
