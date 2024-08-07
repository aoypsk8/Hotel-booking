import AdminMenu from "../homeAdmin";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import ReloadButton from "../../component/reload";
import ic_edit from "../../../assets/icons/editI.svg";
import ic_delete from "../../../assets/icons/deleteI.svg";
import Swal from "sweetalert2";
import AddTypeDialog from "./dialogManage/type/addType";
import EditTypeDialog from "./dialogManage/type/editType";
import EditUserDialog from "./dialogManage/user/editUser";
import AddUserDialog from "./dialogManage/user/addUser";

const initialData = [
    { id: "1", username: "1Bed",role:"admin",password:"123456" },
    { id: "2", username: "1Bed",role:"admin",password:"123456" },
    { id: "3", username: "1Bed",role:"admin",password:"123456" },
    { id: "4", username: "1Bed",role:"admin",password:"123456" },
    { id: "5", username: "1Bed",role:"admin",password:"123456" },
    { id: "6", username: "1Bed",role:"admin",password:"123456" },
    { id: "7", username: "1Bed",role:"admin",password:"123456" },
    { id: "8", username: "1Bed",role:"admin",password:"123456" },
    { id: "9", username: "1Bed",role:"admin",password:"123456" },
    { id: "10", username: "1Bed",role:"admin",password:"123456" },
    { id: "11", username: "1Bed",role:"admin",password:"123456" },
    { id: "12", username: "1Bed",role:"admin",password:"123456" },
    { id: "13", username: "1Bed",role:"admin",password:"123456" },
    { id: "14", username: "1Bed",role:"admin",password:"123456" },
    { id: "15", username: "1Bed",role:"admin",password:"123456" },
];

const ManageUsersAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSaleData, setFilteredSaleData] = useState(initialData);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    useEffect(() => {
        const results = initialData.filter(item =>
            item.id.includes(searchQuery) ||
            item.username.includes(searchQuery) ||
            item.role.includes(searchQuery)
        );
        setFilteredSaleData(results);
    }, [searchQuery]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const totalPages = Math.ceil(filteredSaleData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSaleData.slice(indexOfFirstItem, indexOfLastItem);

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

    //add
    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };
    const hideDialog = () => {
        setVisible(false);
    };

    //edit
    const [selectedItem, setSelectedItem] = useState(null);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const showDialogEdit = (item) => {
        setSelectedItem(item);
        setVisibleEdit(true);
    };
    const hideDialogEdit = () => {
        setVisibleEdit(false);
        setSelectedItem(null);
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: "ທ່ານຕ້ອງການລົບ?",
            text: "ທ່ານຕ້ອງການລົບບໍ່!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ລົບ ! ",
            cancelButtonText: "ຍົກເລີກ",
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Perform the delete action here
            }
        });
    };

    return (
        <>
            <AdminMenu />
            <p className="px-36 mt-10">ຂໍ້ມູນລູກຄ້າ</p>
            <form className="w-full px-36 mt-5">
                <div className="flex justify-between">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-bgHead dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            className="block w-full p-4 ps-10 text-sm text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="ຄົ້ນຫາ"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex">
                        <ReloadButton onClick={() => setLoading(true)} loading={loading} />
                        <button
                            type="button"
                            className="flex items-center justify-center w-32 h-12 bg-green rounded-lg text-white font-semibold ml-3"
                            onClick={showDialog}
                        >
                            <TiPlus className="text-xl mr-2" />
                            <span>New</span>
                        </button>
                    </div>
                </div>
                <table className="w-full mt-10">
                    <thead>
                        <tr>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">No</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">Username</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">Role</th>
                          
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">Operation</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.id}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.username}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.role}</td>
                                <td className="border border-btnn border-opacity-50 py-2 text-center font-light flex justify-center">
                                    <div
                                        className="flex items-center justify-center w-16 h-7 bg-white rounded-lg text-primaryColor text-sm ml-3 border border-opacity-20 hover:cursor-pointer"
                                        onClick={() => showDialogEdit(item)}
                                    >
                                        <img src={ic_edit} alt="" className="w-5 h-5" />
                                        ແກ້ໄຂ
                                    </div>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center w-16 h-7 bg-white rounded-lg text-redBottle text-sm ml-3 border border-opacity-20"
                                        onClick={() => handleDelete(item)}
                                    >
                                        <img src={ic_delete} alt="" className="w-5 h-5" />
                                        ລົບ
                                    </button>
                                </td>
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
                    {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredSaleData.length)} of {filteredSaleData.length}
                </div>
                <div
                    className="items-center justify-center flex cursor-pointer"
                    onClick={nextPage}
                >
                    <IoIosArrowForward />
                </div>
            </div>
            <AddUserDialog visible={visible} hideDialog={hideDialog} />
            <EditUserDialog visible={visibleEdit} hideDialog={hideDialogEdit} data={selectedItem}/>
        </>
    );
};

export default ManageUsersAdmin;