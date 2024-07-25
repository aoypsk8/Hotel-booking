import AdminMenu from "../homeAdmin";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import * as XLSX from 'xlsx';

// Example data (replace this with your actual data source)
// Example data (replace this with your actual data source)
const initialData = [
    { id: "1", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "2", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "3", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "4", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "5", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "6", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "7", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "8", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "9", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "10", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "11", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "12", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "13", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "14", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "15", roomType: "A", roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024", dataBooking: "03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
];
const ReportCheckInAdmin = () => {
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
        XLSX.utils.book_append_sheet(wb, ws, 'CheckIn');
        XLSX.writeFile(wb, 'CheckIn_data.xlsx');
    };

    return (
        <>
            <AdminMenu />
            <div className="flex flex-col justify-center items-center">
                <p className="px-36 mt-10 text-2xl">ຂໍ້ມູນການແຈ້ງເຂົ້າ</p>
                <div className="flex justify-between items-center w-full px-36">
                    <p className=" mt-10 text-xl">ຈຳນວນການແຈ້ງເຂົ້າທັງໝົດ: {initialData.length} ຄົນ</p>
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
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລະຫັດການຈອງ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີຫ້ອງ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ປະເພດຫ້ອງ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່ແລະນາມສະກຸນ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ປະເພດການຈອງ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ມື້ເຂົ້າພັກ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold ">ວັນທີຈອງ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.id}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.roomNumber}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.roomType}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.name}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.bookingType}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.checkInDate}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.bookingDate}</td>

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

export default ReportCheckInAdmin;