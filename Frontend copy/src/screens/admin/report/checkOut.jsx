import AdminMenu from "../homeAdmin";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import * as XLSX from 'xlsx';

// Example data (replace this with your actual data source)
const initialData = [
    { id: "1", roomNumber: "123A", name: "John Doe Phono", phoneNumber: "2052768832" },
    { id: "2", roomNumber: "123B", name: "Jane Doe Phono", phoneNumber: "2052768832" },
    { id: "3", roomNumber: "123C", name: "Alice Phono", phoneNumber: "2052768832" },
    { id: "4", roomNumber: "123D", name: "Bob Phono", phoneNumber: "2052768832" },
    { id: "5", roomNumber: "123E", name: "Charlie Phono", phoneNumber: "2052768832" },
    { id: "6", roomNumber: "123F", name: "David Phono", phoneNumber: "2052768832" },
    { id: "7", roomNumber: "123G", name: "Eve Phono", phoneNumber: "2052768832" },
    { id: "8", roomNumber: "123H", name: "Frank Phono", phoneNumber: "2052768832" },
    { id: "9", roomNumber: "123H", name: "Frank Phono", phoneNumber: "2052768832" },
    { id: "10", roomNumber: "123H", name: "Frank Phono", phoneNumber: "2052768832" },
    { id: "11", roomNumber: "123H", name: "Frank Phono", phoneNumber: "2052768832" },
    { id: "12", roomNumber: "123H", name: "Frank Phono", phoneNumber: "2052768832" },
    { id: "13", roomNumber: "123H", name: "Frank Phono", phoneNumber: "2052768832" },
    { id: "14", roomNumber: "123H", name: "Frank Phono", phoneNumber: "2052768832" },
    { id: "15", roomNumber: "123H", name: "Frank Phono", phoneNumber: "2052768832" },
];

const ReportCheckOutAdmin = () => {
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
        XLSX.utils.book_append_sheet(wb, ws, 'Checkout');
        XLSX.writeFile(wb, 'Checkout_data.xlsx');
    };

    return (
        <>
            <AdminMenu />
            <div className="flex flex-col justify-center items-center">
                <p className="px-36 mt-10 text-2xl">ຂໍ້ມູນການແຈ້ງອອກ</p>
                <div className="flex justify-between items-center w-full px-36">
                    <p className=" mt-10 text-xl">ຈຳນວນການແຈ້ງອອກທັງໝົດ: {initialData.length} ຄົນ</p>
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
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລະຫັດແຈ້ງເຂົ້ສ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີຫ້ອງ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່ແລະນາມສະກຸນ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີໂທລູກຄ້າ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.id}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.roomNumber}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.name}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.phoneNumber}</td>

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

export default ReportCheckOutAdmin;