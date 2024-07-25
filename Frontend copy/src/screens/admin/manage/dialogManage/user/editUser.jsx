import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const EditUserDialog = ({ visible, hideDialog, data }) => {

    const [selectedUsername, setSelectedUsername] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };
    useEffect(() => {
        if (data) {
            setSelectedUsername(data.username || '');
            setSelectedPassword(data.password || '');
        }
    }, [data]);

    // Debugging: Log current state
    useEffect(() => {
    }, [selectedUsername, selectedPassword]);

    const handleUserChange = (e) => {
        setSelectedUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setSelectedPassword(e.target.value);
    };
    return (
        <Dialog
            header="Update User"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            {data ? (
                <div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>Username</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedUsername}
                            onChange={handleUserChange}
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
                    <div className="flex justify-between items-center mt-2 px-10">
                    <p className=' text-lg '>Role</p>
                    <select
                        className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setSelectedRole(e.target.value)}
                        value={selectedRole}
                    >
                        <option >Admin</option>
                        <option >Employee</option>
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

export default EditUserDialog;
