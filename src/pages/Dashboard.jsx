import React, { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";


import { useSelector } from "react-redux";
import DashboardCOmponent from "../components/dashboardComponent/DashboardCOmponent";

function Dashboard() {
  const [fullScreen, setFullScreen] = useState(
    window.innerWidth >= 1150 ? 1 : 0
  );
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const activeDropdownItem = useSelector((state) => state.menu.activeDropdownItem);

  // Update fullScreen state based on window width
  useEffect(() => {
    const handleResize = () => {
      setFullScreen(window.innerWidth >= 1150 ? 1 : 0);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex gap-1 overflow-auto">
      {/* Sidebar or SidebarIcons based on state */}
      {fullScreen === 1 ? (
        <div className={`w-[13%] p-1 py-9 ${fullScreen === 0 ? "hidden" : ""}`}>
          <Sidebar />
        </div>
      ) : (
        <div
          className={`w-[7%] min-w-[70px] p-4 py-9 ${
            fullScreen === 1 ? "hidden" : ""
          }`}
        >
          <div></div>
        </div>
      )}

      {/* Toggle button
      <div className="relative mt-[37px]  w-[3%] min-w-[20px]">
        <img
          src={fullScreen === 1 ? arrow : fullArrow}
          alt="Toggle Sidebar"
          onClick={() => setFullScreen((prev) => (prev === 1 ? 0 : 1))}
          className="cursor-pointer w-[35px] h-[35px]"
        />
      </div> */}

      {/* Main content area */}
      <div
        className={`flex-1 ${
          fullScreen === 1 ? "w-[84%]" : "w-full"
        } mt-8 mr-3 rounded-[50px]  bg-[#F7F7F7]`}
        style={{
          boxShadow: "0px 0px 39px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {activeMenuItem == 1 && (
          <div className="mx-auto bg-white rounded-[50px] overflow-x-auto">
            <DashboardCOmponent/>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Dashboard;
