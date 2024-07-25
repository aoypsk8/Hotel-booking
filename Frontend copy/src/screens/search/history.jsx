import React, { useState } from "react";
import Aside from "../component/aside";
import FooterSide from "../component/footer";
function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
  }
  
function History() {
    const hisData = [
        {
            id: 1,
            check_in: "2024-07-15T15:00:00",
            check_out: "2024-07-20T11:00:00",
            date: "2024-07-15 to 2024-07-20",
            total: 500000
        },
        {
            id: 2,
            check_in: "2024-07-18T14:00:00",
            check_out: "2024-07-22T10:00:00",
            date: "2024-07-18 to 2024-07-22",
            total: 3000000
        },
        {
            id: 3,
            check_in: "2024-07-20T16:00:00",
            check_out: "2024-07-25T12:00:00",
            date: "2024-07-20 to 2024-07-25",
            total: 2000000
        },
        {
            id: 4,
            check_in: "2024-07-22T15:00:00",
            check_out: "2024-07-30T11:00:00",
            date: "2024-07-22 to 2024-07-30",
            total: 7000000
        },
        {
            id: 5,
            check_in: "2024-07-25T14:00:00",
            check_out: "2024-08-01T10:00:00",
            date: "2024-07-25 to 2024-08-01",
            total: 100000000
        }
    ];

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
                                <div class="text-lg text-black p-4 rounded">ຈາກວັນທີ່</div>
                                <div class="text-lg text-black p-4 rounded">ຫາວັນທີ່</div>
                                <div class="text-lg text-black p-4 rounded">ວັນທີ່ເວລາຈອງ</div>
                                <div class="text-lg text-black p-4 rounded">ລວມຍອດເງິນ</div>
                            </div>
                            <div className="w-full h-[0.5px] bg-unSelectText opacity-50"></div>
                            {hisData.map((item) => (
                                <div className="">
                                    <div class="grid grid-cols-5 gap-4">
                                        <div class="text-lg text-black py-4">{item.id}</div>
                                        <div class="text-lg text-black py-4">{item.check_in}</div>
                                        <div class="text-lg text-black py-4">{item.check_out}</div>
                                        <div class="text-lg text-black py-4">{item.date}</div>
                                        <div class="text-lg text-black py-4">{formatNumber(item.total)} KIP</div>
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