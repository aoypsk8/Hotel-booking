import AdminMenu from "../homeAdmin";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import * as XLSX from 'xlsx';

const initialData = [
    { id: "1", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "2", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "3", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "4", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "5", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "6", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "7", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "8", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "9", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "10", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "11", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "12", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "13", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "14", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
    { id: "15", name: "1Bed", surname: "15x41", phoneNumber: "20 52768832", address: "Vientaine,Laos", image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg" },
];

const ReportEmployeeAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const totalPages = Math.ceil(initialData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = initialData.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(initialData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Employee');
        XLSX.writeFile(wb, 'Employee_data.xlsx');
    };

    return (
        <>
            <AdminMenu />
            <div className="flex flex-col justify-center items-center">
                <p className="px-36 mt-10 text-2xl">ຂໍ້ມູນພະນັກງານ</p>
                <div className="flex justify-between items-center w-full px-36">
                    <p className=" mt-10 text-xl">ຈຳນວນພະນັກງານທັງໝົດ: {initialData.length} ຄົນ</p>
                    <button
                        onClick={exportToExcel}
                        className="px-4 py-2 bg-blue-500 text-black rounded mt-5 border border-black items-center flex justify-center"
                    >
                        Export to Excel
                    </button>
                </div>

                <form className="w-full px-36 mt-5">
                    <table className="w-full mt-10">
                        <thead>
                            <tr>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລະຫັດ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ນາມສະກຸນ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີໂທ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ທີ່ຢູ່ປັດຈຸບັນ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.id}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.name}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.surname}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.phoneNumber}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.address}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
                <div className="w-full flex justify-center px-5 mt-5">
                    <div
                        className="items-center justify-center flex cursor-pointer"
                        onClick={prevPage}
                    >
                        <IoIosArrowBack />
                    </div>
                    <div className="text-base font-light mx-5">
                        {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, initialData.length)} of {initialData.length}
                    </div>
                    <div
                        className="items-center justify-center flex cursor-pointer"
                        onClick={nextPage}
                    >
                        <IoIosArrowForward />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportEmployeeAdmin;