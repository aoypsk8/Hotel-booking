import AdminMenu from "../homeAdmin";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from 'xlsx';
import { GetAllEmployee } from "../../../api/employee/employeeAction";

const ReportEmployeeAdmin = () => {
    const dispatch = useDispatch();
    const [employeeData, setEmployeeData] = useState([]);
    const { employee } = useSelector((state) => state.employee);

    useEffect(() => {
        dispatch(GetAllEmployee());
        setEmployeeData(employee || []);
    }, [dispatch]);



    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const supplierArray = employee || [];
    const totalPages = Math.ceil(supplierArray.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = supplierArray.slice(indexOfFirstItem, indexOfLastItem);

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
        const ws = XLSX.utils.json_to_sheet(employeeData);
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
                    <p className=" mt-10 text-xl">ຈຳນວນພະນັກງານທັງໝົດ: {employeeData.length} ຄົນ</p>
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
                                <tr key={item.Emp_ID}>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Emp_ID}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Emp_FirstName}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Emp_LastName}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Phone_Number}</td>
                                    <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Emp_Address}</td>

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
                    {Math.min(indexOfLastItem, supplierArray.length)} of{" "}
                    {supplierArray.length}
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