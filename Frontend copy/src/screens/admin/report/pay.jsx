import AdminMenu from "../homeAdmin";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from "react-redux";
import { GetAllPay } from "../../../api/booking/bookingAction";

function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
}

const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

const ReportPayAdmin = () => {
    const dispatch = useDispatch();
    const [payData, setPayData] = useState([]);
    const [searchDate, setSearchDate] = useState(''); // State for search date
    const { pay } = useSelector((state) => state.pay);

    useEffect(() => {
        dispatch(GetAllPay());
    }, [dispatch]);

    useEffect(() => {
        setPayData(pay || []);
    }, [pay]);

    // Filter data based on searchDate
    const filteredData = payData.filter(item => {
        if (!searchDate) return true;
        const itemDate = formatDate(item.Check_IN);
        return itemDate.includes(searchDate);
    });

    // Calculate total amount
    const totalAmount = filteredData.reduce((total, item) => total + item.total, 0);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Handle next and previous page
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
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'CheckIn');
        XLSX.writeFile(wb, 'CheckIn_data.xlsx');
    };

    return (
        <>
            <AdminMenu />
            <div className="flex flex-col justify-center items-center">
                <p className="px-36 mt-10 text-2xl">ຂໍ້ມູນການຈ່າຍເງີນ</p>
                <div className="flex justify-between items-center w-full px-36">
                    <input
                        type="text"
                        placeholder="ຄົ້ນຫາວັນທີ່ (DD-MM-YYYY)"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="px-4 py-2 border border-btnn rounded"
                    />
                    <button
                        onClick={exportToExcel}
                        className="px-4 py-2 bg-blue-500 text-black rounded mt-5 border border-black items-center flex justify-center"
                    >
                        Export to Excel
                    </button>
                </div>
                <div className="w-full flex justify-end px-5 mr-56 mt-5">
                    <div className="text-base font-light">
                        ຍອດລວມ: {formatNumber(totalAmount)} ກີບ
                    </div>
                </div>
                <form className="w-full px-36 mt-5">
                    <table className="w-full mt-10">
                        <thead>
                            <tr>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລະຫັດ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີຫ້ອງ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ປະເພດຫ້ອງ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່ແລະນາມສະກຸນ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຈຳນວນເງີນ</th>
                                <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ວັນທີ່ຊຳລະ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {currentItems.map((item) => (
                                <tr key={item.Booking_ID}>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Booking_ID}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Room_Number}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Type_name}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.name + item.surname}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{formatNumber(item.total)} ກີບ</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{formatDate(item.Check_IN)}</td>
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
                        {indexOfFirstItem + 1} -{" "}
                        {Math.min(indexOfLastItem, filteredData.length)} of{" "}
                        {filteredData.length}
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

export default ReportPayAdmin;
