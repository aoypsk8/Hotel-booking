import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTypeDetail, clearTypeDetail } from "../../slice/typeSliceDetail";

function RoomCard({ room }) {
    const dispatch = useDispatch();
    // Helper function to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    const navigate = useNavigate();
    return (
        <div key={room.Room_ID} className="bg-white border border-btnn rounded-lg shadow dark:subTextColor p-4 flex flex-col justify-between " onClick={() => {
            dispatch(clearTypeDetail());
            dispatch(addTypeDetail(room));
            navigate('/cardDetail');
        }}>
            <div className="">
                <img className="rounded-t-lg h-64 w-full object-cover" src={room.img1} alt={room.Type_name} />
                <div className="flex justify-between p-3 border-b border-gray-200">
                    <p className="text-black text-xl font-semibold">{room.Type_name}</p>
                    {room.NumberOfRooms != null ? room.NumberOfRooms === 0 ? <p className="text-subTextColor text-lg">ຫ້ອງເຕັມ</p> : <p className="text-subTextColor text-lg"> ວ່າງ ({room.NumberOfRooms}) ຫ້ອງ</p> : ""}
                </div>
                <p className="px-3 py-2 text-gray-700">{truncateText(room.detail, 130)}</p>
            </div>
            <div className="pt-5 pb-1 flex justify-end">
                <a href="#" class="w-full flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-black bg-blue-700 rounded-lg hover:bg-btnn focus:ring-4 focus:outline-none focus:ring-btnn dark:bg-btnn dark:hover:bg-btnn dark:focus:ring-btnn">
                    ລາຍລະອຽດເພີ່ມເຕີມ
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default RoomCard;