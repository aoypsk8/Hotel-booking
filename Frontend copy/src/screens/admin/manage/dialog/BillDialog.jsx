import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const BillDialog = ({ visible, hideDialog }) => {
    return (
        <Dialog
            header="Bill"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            <div className="flex justify-between items-center mt-2 px-10">
                <p className=' text-lg '>ລະຫັດການຈອງ</p>
                <input
                    type="search"
                    className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    readOnly

                />
            </div>
            

            <div className="w-full flex justify-end items-center mt-10 mb-5">
                <button
                    type="button"
                    className="flex items-center justify-center w-56 h-12 bg-redBottle rounded-lg text-white font-semibold ml-3"
                    onClick={hideDialog}
                >
                    {/* <TiPlus className="text-xl mr-2" /> */}
                    <span>ຍົກເລີກ</span>
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center w-56 h-12 bg-green rounded-lg text-white font-semibold ml-3"
                >
                    {/* <TiPlus className="text-xl mr-2" /> */}
                    <span>ແຈ້ງເຂົ້າ</span>
                </button>
            </div>
        </Dialog>
    );
};

export default BillDialog;
