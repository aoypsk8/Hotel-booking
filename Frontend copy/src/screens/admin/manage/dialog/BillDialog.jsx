import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useReactToPrint } from 'react-to-print';
import fLogo from "../../../../assets/fLogo.png";
import sLogo from "../../../../assets/sLogo.png";
import './print.css';

const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
}

const BillDialog = ({ visible, hideDialog, data, hideCheckInDialog, selectedEquipment }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => {
            hideDialog();
            hideCheckInDialog(); // Close CheckInDialog after printing
        }
    });

    return (
        <Dialog
            header="Bill"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            {data ? (
                <div className="shadow-xl p-2 rounded-xl" ref={componentRef}>
                    <div className="p-5">
                        <div className="flex justify-between">
                            <div className="flex items-center justify-start hover:cursor-pointer">
                                <img src={fLogo} alt="" className="h-16" />
                            </div>
                            <div className="flex flex-col items-center justify-center mt-2">
                                <h1 className="font-bold text-xl">ໃບບິນຊຳລະເງິນ</h1>
                                <h1 className="font-bold text-xl">Bill</h1>
                            </div>
                            <div className="flex items-center justify-end hover:cursor-pointer">
                                <img src={sLogo} alt="" className="h-16" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div className="flex flex-col">
                                <p className="font-semibold">ລະຫັດແຈ້ງເຂົ້າ:</p>
                                <p>{data.Booking_ID}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold">ວັນທີ່ແຈ້ງເຂົ້າ:</p>
                                <p>{formatDate(data.Check_IN)}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold">ເບີຫ້ອງ:</p>
                                <p>{data.Room_Number}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold">ຊື່ລູກຄ້າ:</p>
                                <p>{data.First_name} {data.Last_name}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold">ເບີໂທລະສັບ:</p>
                                <p>{data.Phone_Number}</p>
                            </div>
                            {selectedEquipment ? (<div className="flex flex-col">
                                <p className="font-semibold">ອຸປະກອນທີ່ເສຍຫາຍ:</p>
                                <ul>
                                    {selectedEquipment.map((equipment, index) => (
                                        <li key={index}>{equipment.EquipmentName}</li>
                                    ))}
                                </ul>
                            </div>) : ""}

                        </div>
                    </div>
                </div>
            ) : (
                <p>No data available</p>
            )}
            <div className="w-full flex justify-end items-center mt-10 mb-5">
                <Button
                    type="button"
                    className="flex items-center justify-center w-56 h-12 bg-green rounded-lg text-white font-semibold ml-3"
                    onClick={handlePrint}
                >
                    Print
                </Button>
            </div>
        </Dialog>
    );
};

export default BillDialog;
