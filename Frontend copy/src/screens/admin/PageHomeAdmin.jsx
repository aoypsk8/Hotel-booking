import AdminMenu from "./homeAdmin";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { Ripple } from 'primereact/ripple'; // PrimeReact Ripple effect
const PageHomeAdmin = ({onSendData}) => {
    useEffect(() => {
        const data = {
          message: 'Hello from PageHomeAdmin',
        };
        onSendData(data);
      }, [onSendData]);

    const navigate = useNavigate(); // Initialize the navigate function

    const items = [
        {
            label: "Service and Operation",
            items: [
                {
                    label: "ແຈ້ງເຂົ້າ",
                    icon: "pi pi-arrow-circle-down",
                    route: "/admin/checkIN",
                },
                {
                    label: "ແຈ້ງອອກ",
                    icon: "pi pi-arrow-circle-up",
                    route: "/admin/return",
                },
                {
                    label: "ຂໍ້ມູນລູກຄ້າ",
                    icon: "pi pi-user",
                    route: "/admin/manage/customer",
                },
            ],
        },
        {
            label: "Report",
            items: [
                {
                    label: "ລາຍງານການຈອງ",
                    icon: "pi pi-chart-pie",
                    route: "/admin/report/checkInNow",
                },
                {
                    label: "ລາຍງານແຈ້ງເຂົ້າ",
                    icon: "pi pi-chart-pie",
                    route: "/admin/report/return",
                },
                {
                    label: "ລາຍງານແຈ້ງອອກ",
                    icon: "pi pi-chart-pie",
                    route: "/admin/report/out",
                },
            ],
        },
    ];

    const handleCommand = (route) => {
        if (route) {
            navigate(route);
        }
    };
    return (
        <>
            <AdminMenu />
            <div className="admin-menu mx-auto my-10 flex flex-col items-center w-full lg:w-800px px-72">
                {items.map((item, mainIndex) => (
                    <div key={mainIndex} className="w-full px-4">
                        <h3>{item.label}</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-3 ">
                            {item.items.map((subItem, subIndex) => (
                                <div
                                    key={subIndex}
                                    onClick={() => handleCommand(subItem.route)}
                                    role="button"
                                    className="relative py-4 px-6 flex flex-col gap-3 select-none border-solid border-1px border-w-blue/50  
                                    hover:bg-w-blue/5 hover:shadow-lg hover:-translate-y-2 transition-translate duration-0.5s active:translate-y-0
                                    rounded-xl border border-primaryColor"
                                >
                                    <i className={`pi ${subItem.icon} text-w-blue`} style={{ fontSize: '42px' }} />
                                    <span>{subItem.label}</span>
                                    <Ripple />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}


export default PageHomeAdmin;