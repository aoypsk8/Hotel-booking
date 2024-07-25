import React, { useEffect, useState } from "react";
import fLogo from "../../assets/fLogo.png";
import sLogo from "../../assets/sLogo.png";
import acc from "../../assets/icons/account_circle.svg";
import his from "../../assets/icons/history.svg";
import log from "../../assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";
import { Element, scroller } from 'react-scroll';
import { getUserData, logoutUser } from "../../api/authAction";
import { useDispatch } from "react-redux";
function Aside({ homePage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const user = getUserData();
  const [auth, setAuth] = useState(false);
  const [reload, setReload] = useState(false);
  const [userData, setUserData] = useState(false);
  useEffect(() => {
    // Smooth scroll to hash
    const hash = window.location.hash.substring(1);
    if (hash) {
      scroller.scrollTo(hash, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
    if (user != null) {
      setAuth(true);
      setUserData(user);
    } else {
      setAuth(false);
    }
  }, [click, reload]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        console.log("Fetched user data:", user);
        setUserData(user);

        if (user && user.details && user.details.Cus_Profile) {
          setImagePreview(user.details.Cus_Profile);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className=" font-sans w-full  ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center justify-start hover:cursor-pointer" onClick={() => navigate("/")}>
            <img src={fLogo} alt="" className="h-16" />
            <img src={sLogo} alt="" className="h-16" />
          </div>
          <div className="hidden sm:flex sm:items-center">
            {homePage ? (
              <>
                <a href="#home" className="text-xl px-5 text-white hover:cursor-pointer hover:text-black" onClick={() => setClick(!click)}>ຫນ້າຫຼັກ</a>
                <a href="#rooms" className="text-xl px-5 text-white hover:cursor-pointer hover:text-black" onClick={() => setClick(!click)}>ຫ້ອງທັງຫມົດ</a>
                <a href="#about" className="text-xl px-5 text-white hover:cursor-pointer hover:text-black" onClick={() => setClick(!click)}>ກ່ຽວກັບພວກເຮົາ</a>
                <a href="#contact" className="text-xl px-5 text-white hover:cursor-pointer hover:text-black" onClick={() => setClick(!click)}>ຕິດຕໍ່ພວກເຮົາ</a>
              </>
            ) : (
              <>
                <a href="/" className="text-xl px-5 text-white hover:cursor-pointer hover:text-black" onClick={() => setClick(!click)}>ຫນ້າຫຼັກ</a>
                <a href="/" className="text-xl px-5 text-white hover:cursor-pointer hover:text-black" onClick={() => setClick(!click)}>ຫ້ອງທັງຫມົດ</a>
                <a href="/" className="text-xl px-5 text-white hover:cursor-pointer hover:text-black" onClick={() => setClick(!click)}>ກ່ຽວກັບພວກເຮົາ</a>
                <a href="/" className="text-xl px-5 text-white hover:cursor-pointer hover:text-black" onClick={() => setClick(!click)}>ຕິດຕໍ່ພວກເຮົາ</a>
              </>
            )}
          </div>

          <div className="hidden sm:flex sm:items-center">
            {auth == false ? (
              <>
                <a
                  href="#"
                  className="text-white text-xl font-semibold mr-4 border px-4 py-2 rounded-lg hover:cursor-pointer hover:text-black"
                  onClick={() => navigate("/login")}
                >
                  ເຂົ້າສູ່ລະບົບ
                </a>
                <a
                  href="#"
                  className="text-white text-xl font-semibold border px-4 py-2 rounded-lg hover:cursor-pointer hover:text-black"
                  onClick={() => navigate("/register")}
                >
                  ລົງທະບຽນ
                </a>
              </>
            ) : (
              <div className="relative">
                <div
                  className="flex items-center hover:cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="w-20 h-20 bg-white rounded-full">
                    <img src={userData.details.Cus_Profile} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="text-white text-xl font-semibold">{userData.details.First_name}</p>
                    <p className="text-white text-sm">{userData.type}</p>
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                    <a
                      href="#"
                      className="block px-4 py-2 text-black hover:bg-btnn opacity-50 flex  items-center"
                      onClick={() => navigate("/profile")}
                    >
                      <img src={acc} alt="" />
                      <p>Profile</p>
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-black hover:bg-btnn opacity-50 flex  items-center"
                      onClick={() => navigate("/history")}
                    >
                      <img src={his} alt="" />
                      <p>History</p>

                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-black hover:bg-btnn opacity-50 flex  items-center"
                      onClick={() => {
                        dispatch(logoutUser());
                        setReload(!reload);
                      }}
                    >
                      <img src={log} alt="" />
                      <p>Logout</p>

                    </a>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="flex flex-col items-center">
              {/* to="/target-file#content" */}
              <a href="#home" className="text-xl px-5 py-2 text-white hover:cursor-pointer hover:text-black">ຫນ້າຫຼັກ</a>
              <a href="#rooms" className="text-xl px-5 py-2 text-white hover:cursor-pointer hover:text-black">ຫ້ອງທັງຫມົດ</a>
              <a href="#about" className="text-xl px-5 py-2 text-white hover:cursor-pointer hover:text-black">ກ່ຽວກັບພວກເຮົາ</a>
              <a href="#contact" className="text-xl px-5 py-2 text-white hover:cursor-pointer hover:text-black">ຕິດຕໍ່ພວກເຮົາ</a>
              {auth == false ? (
                <>
                  <a
                    href="#"
                    className="text-white text-xl font-semibold my-2 border px-4 py-2 rounded-lg hover:cursor-pointer hover:text-black"
                    onClick={() => navigate("/login")}
                  >
                    ເຂົ້າສູ່ລະບົບ
                  </a>
                  <a
                    href="#"
                    className="text-white text-xl font-semibold my-2 border px-4 py-2 rounded-lg hover:cursor-pointer hover:text-black"
                    onClick={() => navigate("/register")}
                  >
                    ລົງທະບຽນ
                  </a></>
              ) : (
                <div className="flex items-center hover:cursor-pointer">
                  <div className="w-20 h-20 bg-white rounded-full "></div>
                  <div className="ml-3">
                    <p className="text-white text-xl font-semibold">{userData}</p>
                    <p className="text-white text-sm">KHAM HOU</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Aside;
