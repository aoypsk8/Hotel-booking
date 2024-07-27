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

const BillDialog = ({ visible, hideDialog, data, hideCheckInDialog }) => {
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
            {data ? (<div className="shadow-xl p-2 rounded-xl" ref={componentRef}>
                <div className=" p-5">
                    <div className="flex justify-between">
                        <div className="flex items-center justify-start hover:cursor-pointer" >
                            <img src={fLogo} alt="" className="h-16" />
                            <img src={sLogo} alt="" className="h-16" />
                        </div>
                        <div className="">
                            <p className='text-xl font-bold '>ໃບເກັບເງີນ</p>
                            <p className='text-xl  '>ວັນທີ່ {formatDate(data.Check_IN)} </p>
                            <p className='text-xl  '>ເລກທີ່# {data.Booking_ID} </p>
                        </div>
                    </div>
                    <p className='text-xl font-bold mt-5'>ຂໍ້ມູນລູກຄ້າ</p>
                    <p className='mt-2'>ຊື່ ແລະ ນາມສະກຸນ : {data.First_name + data.Last_name}</p>
                    <p className='mt-2'>Email : {data.Email} </p>
                    <p className='mt-2'>ເບິໂທ : {data.Phone_Number}</p>

                    <p className='text-xl font-bold mt-5 '>ລາຍລະອຽດ</p>
                    <div className="flex justify-between">
                        <div className="mt-2 flex flex-col justify-center items-center">
                            <p className=' mt-2 flex flex-col justify-center items-center font-bold'>ປະເພດຫ້ອງ</p>
                            <p className=' mt-2 flex flex-col justify-center items-center'>{data.Type_name}</p>
                        </div>
                        <div className="mt-2 flex flex-col justify-center items-center">
                            <p className=' mt-2 flex flex-col justify-center items-center font-bold'>ປະເພດເຂົ້າພັກ</p>
                            <p className=' mt-2 flex flex-col justify-center items-center'>{data.Type_Booking === 1 ? "ເປັນມື້" : data.Type_Booking === 2 ? "ເປັນເດືອນ" : "ເປັນປີ"}</p>
                        </div>
                        <div className="mt-2 flex flex-col justify-center items-center">
                            <p className=' mt-2 flex flex-col justify-center items-center font-bold'>ໄລຍະເວລາ (ມື້)</p>
                            <p className=' mt-2 flex flex-col justify-center items-center'>{data.daysBooked}</p>
                        </div>
                        <div className="mt-2 flex flex-col justify-center items-center">
                            <p className=' mt-2 flex flex-col justify-center items-center font-bold'>ຍອດລວມ</p>
                            <p className=' mt-2 flex flex-col justify-center items-center font-bold text-xl'>{formatNumber(data.total)} KIP</p>
                        </div>
                    </div>

                    <p className=' flex flex-col justify-center items-center  mt-10'>ຕິດຕໍ່ພວກເຮົາໄດ້ທີ່ : </p>
                    <p className=' flex flex-col justify-center items-center  '>Email : Anyiestate2020@gmail.com  </p>
                    <p className=' flex flex-col justify-center items-center  '>ເບິໂທ :+856 20 596 601 11 </p>
                    <p className=' flex flex-col justify-center items-center  '>ທີ່ຢູ່ :ບ້ານ ສີດຳດວນ ເມືອງ ຈັນທະບູລີ ແຂວງນະຄອນຫຼວງວຽງຈັນ </p>
                </div>
            </div>
            ) : (
                <p>No data available</p>
            )}
            <div className="mt-4 flex justify-end">
                <Button label="Print" icon="pi pi-print" className="p-button-secondary" onClick={handlePrint} />
            </div>

        </Dialog>
    );
};

export default BillDialog;
