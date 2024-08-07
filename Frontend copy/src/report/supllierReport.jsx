// Home.js
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSupplier } from "../api/supplier/supplierAction";

function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`; // Format as HH:mm
};

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
};

function SupplierReport() {
  const dispatch = useDispatch();
  const [supplierData, setSupplierData] = useState([]);
  const { supplier } = useSelector((state) => state.supplier);

  useEffect(() => {
    dispatch(GetAllSupplier());
    setSupplierData(supplier || []);
  }, [dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const supplierArray = supplier || [];
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

  return (
    <div className="p-10 flex flex-col justify-between">
      <p className=" mb-6 text-5xl">ລາຍງານຜູ້ສະຫນອງທັງຫມົດ</p>
      <div className="w-full h-3/4  border border-lineColor py-3 rounded-md flex flex-col justify-between mt-3">
        <div className="flex justify-between items-center px-5 pb-5">
          <p className="text-xl w-1/3">ລາຍການຜູ້ສະຫນອງທັງຫມົດ</p>
          <div className=" border w-1/5 border-lineColor px-5 py-2 rounded-md flex items-center justify-between">
            <div className=" flex items-center">
              <LuCalendarSearch size={30} color="#625F5F" />
              <div className="w-full rounded text-start ml-2 text-unSelectText">
                19/02/2024
              </div>
            </div>
            <IoIosArrowDown size={25} color="#625F5F" />
          </div>
        </div>
        <div className="border border-lineColor w-full py-3  bg-head flex justify-between items-center px-5 ">
          <p className="text-base font-light flex justify-center items-center w-1/12 ">
            ລຳດັບ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ຊື່ລາຍການ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ເບີໂທ
          </p>

          <p className="text-base font-light flex justify-center items-center w-1/12">
            ບ້ານ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/12">
            ເມືອງ
          </p>
          <p className="text-base font-light flex justify-center items-center w-1/6">
            ແຂວງ
          </p>
        </div>
        {currentItems.map((item, index) => (
          <div
            className="w-full py-5 bg-white flex justify-between items-center px-5 border-b border-lineColor"
            key={index}
          >
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Sl_ID}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.First_names}
            </p>
            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Phone_Number}
            </p>

            <p className="text-base font-light flex justify-center items-center w-1/12">
              {item.Village}
            </p>
            <p className="text-xl font-light flex justify-center items-center w-1/12">
              {item.District}
            </p>

            <p className="text-base font-light flex justify-center items-center w-1/6">
              {item.Province}
            </p>
          </div>
        ))}
        <div className="w-full flex justify-between px-5 my-3">
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={prevPage}
          >
            <p className="text-base font-light text-center ">ກັບຄືນ</p>
          </div>
          <div className="text-base font-light">
            {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, supplierArray.length)} of{" "}
            {supplierArray.length}
          </div>
          <div
            className="w-1/12 border border-lineColor bg-white rounded-md items-center justify-center flex"
            onClick={nextPage}
          >
            <p className="text-base font-light text-center ">ຕໍ່ໄປ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierReport;
