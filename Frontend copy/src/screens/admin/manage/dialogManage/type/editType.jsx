import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { UpdateType } from '../../../../../api/typeAPI/typeAction';
function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
  }
const EditTypeDialog = ({ visible, hideDialog, data }) => {
    const dispatch = useDispatch();

    const [selectedTypename, setSelectedTypename] = useState('');
    const [selectedPriceDay, setSelectedPriceDay] = useState('');
    const [selectedPriceMonth, setSelectedPriceMonth] = useState('');
    const [selectedPriceYear, setSelectedPriceYear] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedDetail, setSelectedDetail] = useState('');
    const [selectedRemark, setSelectedRemark] = useState('');
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        if (data) {
            setSelectedTypename(data.Type_name || '');
            setSelectedPriceDay(data.PriceDay || '');
            setSelectedPriceMonth(data.PriceMonth || '');
            setSelectedPriceYear(data.PriceYear || '');
            setSelectedArea(data.Area || '');
            setSelectedDetail(data.detail || '');
            setSelectedRemark(data.remark || '');
            setImageFiles([
                data.img1 || '',
                data.img2 || '',
                data.img3 || '',
                data.img4 || '',
                data.img5 || '',
                data.img6 || '',
                data.img7 || ''
            ]);
        }
    }, [data]);

    const handleTypenameChange = (e) => setSelectedTypename(e.target.value);
    const handlePriceDayChange = (e) => setSelectedPriceDay(e.target.value);
    const handlePriceMonthChange = (e) => setSelectedPriceMonth(e.target.value);
    const handlePriceYearChange = (e) => setSelectedPriceYear(e.target.value);
    const handleAreaChange = (e) => setSelectedArea(e.target.value);
    const handleDetailChange = (e) => setSelectedDetail(e.target.value);
    const handleRemarkChange = (e) => setSelectedRemark(e.target.value);

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const updatedImageFiles = [...imageFiles];
            updatedImageFiles[index] = file;
            setImageFiles(updatedImageFiles);
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('Type_name', selectedTypename);
        formData.append('PriceDay', selectedPriceDay);
        formData.append('PriceMonth', selectedPriceMonth);
        formData.append('PriceYear', selectedPriceYear);
        formData.append('Area', selectedArea);
        formData.append('detail', selectedDetail);
        formData.append('remark', selectedRemark);

        // Append each image file to the form data
        imageFiles.forEach((file, index) => {
            if (file) {
                formData.append(`img${index + 1}`, file);
            }
        });

        // Dispatch the action with the formData
        dispatch(UpdateType(data.Type_ID, formData)).then(() => {
            hideDialog();
        }).catch(error => {
            console.error('Error updating type:', error);
            hideDialog();
            // Optionally, handle the error or show a message to the user
        });

    };

    return (
        <Dialog
            header="Update Room type"
            visible={visible}
            style={{ width: '50rem' }}
            modal
            onHide={hideDialog}
        >
            {data ? (
                <div>
                    {/* Existing Inputs */}
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລະຫັດປະເພດຫ້ອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={data.Type_ID || ''}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ຊື່ປະເພດຫ້ອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedTypename}
                            onChange={handleTypenameChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລາຄາ/ວັນ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedPriceDay}
                            onChange={handlePriceDayChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລາຄາ/ເດືອນ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedPriceMonth}
                            onChange={handlePriceMonthChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລາຄາ/ປີ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedPriceYear}
                            onChange={handlePriceYearChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ເນື້ອທີ່ຫ້ອງ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedArea}
                            onChange={handleAreaChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ລາຍລະອຽດ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedDetail}
                            onChange={handleDetailChange}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 px-10">
                        <p className='text-lg'>ຫມາຍເຫດ</p>
                        <input
                            type="text"
                            className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedRemark}
                            onChange={handleRemarkChange}
                        />
                    </div>

                    {/* Image Inputs */}
                    {[...Array(7)].map((_, index) => (
                        <div className="flex justify-between items-center mt-2 px-10" key={index}>
                            <p className='text-lg'>{`ຮູບພາບທີ່ ${index + 1}`}</p>
                            <input
                                type="file"
                                className="block w-[30rem] p-4 ps-7 text-xl text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => handleFileChange(e, index)}
                            />
                        </div>
                    ))}

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

export default EditTypeDialog;
