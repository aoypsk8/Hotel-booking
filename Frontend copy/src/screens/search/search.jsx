import React, { useEffect, useState } from "react";
import Aside from "../component/aside";
import FooterSide from "../component/footer";
import RoomCard from "../component/RoomCard";
import { useSelector } from "react-redux";

function Search() {
    const [typeData, setTypeData] = useState([]);
    const { search } = useSelector((state) => state.search);

    useEffect(() => {
        // Ensure search is an array before setting typeData
        if (Array.isArray(search)) {
            setTypeData(search);
        } else {
            setTypeData([]);
        }
    }, [search]);

    return (
        <div className="h-full bg-primaryColor font-sans">
            <div className="" id="home">
                <Aside />
                <div className="bg-[#D9D9D9] px-32 pb-28 w-full" id="rooms">
                    <h1 className="text-black text-3xl font-semibold  pt-5">ຫ້ອງພັກປະເພດຕ່າງໆ</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 mx-60">
                        {typeData.map((room) => (
                            <RoomCard 
                                key={room.Type_ID} 
                                room={room} 
                            />
                        ))}
                    </div>
                </div>
            </div>
            <FooterSide />
        </div>
    );
}

export default Search;
