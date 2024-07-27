import React, { useEffect, useState } from "react";
import Aside from "../component/aside";
import FooterSide from "../component/footer";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../api/authAction";
import { GetAllHistory } from "../../api/booking/bookingAction";
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


function History() {
    const dispatch = useDispatch();
    const [hisData, setHisData] = useState([]);
    const [userData, setUserData] = useState(null);
    const { history } = useSelector((state) => state.history);

    useEffect(() => {
        setHisData(history || []);
        const user = getUserData();
        if (user) {
            setUserData(user);
            dispatch(GetAllHistory(user.details.Cus_ID));
            console.log(hisData);
        }
    }, [dispatch]);



    return (
        <div className="h-full bg-primaryColor font-sans">
            {/* Side */}
            <Aside />
            <div className="bg-[#D9D9D9]" id="home">
                {/* content detail */}
                <div className="w-full  px-[300px] py-20">
                    <div className="w-full bg-white p-10 rounded-3xl ">
                        <div className="w-full flex justify-center">
                            <p className="text-xl">ປະຫວັດການຈອງ</p>
                        </div>
                        <div class="container mx-auto p-4">
                            <div class="grid grid-cols-5 gap-4">
                                <div class="text-lg text-black p-4 rounded">ລຳດັບ</div>
                                <div class="text-lg text-black p-4 rounded">ວັນເຂົ້າພັກ</div>
                                <div class="text-lg text-black p-4 rounded">ວັນອອກ</div>
                                <div class="text-lg text-black p-4 rounded">ວັນທີ່ຈອງ</div>
                                <div class="text-lg text-black p-4 rounded">ສະຖານະ</div>
                            </div>
                            <div className="w-full h-[0.5px] bg-unSelectText opacity-50"></div>
                            {hisData.map((item) => (
                                <div className="">
                                    <div class="grid grid-cols-5 gap-4">
                                        <div class="text-lg text-black py-4">{item.Booking_ID}</div>
                                        <div class="text-lg text-black py-4">{formatDate(item.Check_IN)}</div>
                                        <div class="text-lg text-black py-4">{formatDate(item.Check_OUT)}</div>
                                        <div class="text-lg text-black py-4">{formatDate(item.Check_OUT)}</div>
                                        <div className={`text-lg py-4 ${item.Status === 1 ? "text-yellowBottle" : item.Status === 2 ? "text-blueBottle" : item.Status === 3 ? "text-blueBottle" : item.Status === 4 ? "text-greenBottle" : "text-redBottle"}`}>
                                            {item.Status === 1 ? "ກຳລັງລໍຖ້າການຢືນຢັນ" : item.Status === 2 ? "ລໍຖ້າແຈ້ງເຂົ້າ" : item.Status === 3 ? "ລໍຖ້າແຈ້ງອອກ" : item.Status === 4 ? "ສຳເລັດ" : "ຍົກເລິກ"}
                                        </div>
                                    </div>
                                    <div className="w-full h-[0.5px] bg-unSelectText opacity-10"></div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

            </div>

            {/* footer */}
            <FooterSide />

        </div>
    );
}

export default History;