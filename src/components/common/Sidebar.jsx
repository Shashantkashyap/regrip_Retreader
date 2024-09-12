import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Up from "../../assets/arrowUp.png";
import Down from "../../assets/arrowDown.png";
import { setActiveDropdownItem, setActiveMenuItem } from "../../redux/slices/menuSlice";


function Sidebar() {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const activeDropdownItem = useSelector((state) => state.menu.activeDropdownItem);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle menu item click
  const handleClick = (id) => {
    setOpenDropdownId(prev => (prev === id ? null : id));
    dispatch(setActiveMenuItem(id));
  };

  const menuItems = [
    { id: 1, name: 'Dashboard' },
    { id: 2, name: 'Inventory', dropdown: ['Regrip Inventory', 'Self Inventory'] },
    { id: 3, name: 'Purchases', dropdown: ['Add Purchase Invoice', 'View Purchase Register'] },
    { id: 4, name: 'Sales', dropdown: ['Add Sales Invoice', 'View Sales Register'] },
    { id: 5, name: 'Claims', dropdown: ['Pending Claims', 'Credit Notes'] },
    { id: 6, name: 'Job Work Order', dropdown: ['View Order'] },
    { id: 7, name: 'Requests', dropdown: ['Collection Requests', 'Dispatch Request'] },
    { id: 8, name: 'EPR', dropdown: ['Registration Details', 'Quarterly Returns'] },
    { id: 9, name: 'Add Parties', dropdown: ['Partners', 'Drivers', 'Shop Floor', 'Customers'] },
    { id: 10, name: 'Reports', dropdown: ['Report1', 'Report2', 'Report3', 'Report4'] },
  ];

  return (
    <div className="w-full h-full bg-white p-2 font-inter">
      {/* USER */}
      <div className="flex flex-row max-lg:flex-col gap-2 items-center mb-6">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg"
          alt="User Profile"
          className="w-16 h-16 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-lg text-[#313131]">Shashant</p>
          <p className="font-normal text-xs text-[#0E56AB] underline cursor-pointer">View profile</p>
        </div>
      </div>

      {/* MENU LIST */}
      <div className="flex flex-col gap-[5px] max-lg:gap-[8px] mt-8">
        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              className={`flex justify-between rounded-[8px] items-center gap-2 max-lg:gap-1 py-2 px-2 max-lg:px-0 cursor-pointer transition-all duration-300 ${
                activeMenuItem === item.id ? 'bg-[#e6f4ea]' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleClick(item.id)}
            >
              <div className="flex items-center gap-2 max-lg:ml-1 max-lg:gap-1">
                <p
                  className={`font-semibold text-[14px] max-lg:text-[13px] leading-[19.36px] ${
                    activeMenuItem === item.id ? 'text-[#65A143]' : 'text-[#555555]'
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {item.name}
                </p>
              </div>
              {item.dropdown && (
                <img
                  src={openDropdownId === item.id ? Up : Down}
                  alt="Toggle Dropdown"
                  className="w-4 h-4 ml-6 max-lg:ml-0 transition-transform duration-300"
                  style={{
                    transform: openDropdownId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              )}
            </div>

            {/* DROPDOWN */}
            {item.dropdown && (
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openDropdownId === item.id ? 'max-h-80' : 'max-h-0'
                }`}
              >
                <div className="ml-3 max-lg:ml-1 max-lg:text-[11px] flex flex-col gap-[7px] max-lg:gap-1 mt-2">
                  {item.dropdown.map((dropdownItem, index) => (
                    <p
                      key={index}
                      className={`text-[#777] text-[15px] max-lg:text-[11px] font-medium cursor-pointer hover:bg-gray-100 p-2 rounded transition-all ${
                        activeDropdownItem === dropdownItem ? 'bg-[#e6f4ea] text-[#65A143]' : ''
                      }`}
                      onClick={() => dispatch(setActiveDropdownItem(dropdownItem))}
                    >
                      {dropdownItem}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* LOGO SECTION */}
      <div className="flex flex-col gap-2 justify-center mt-6 ml-2">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0rPJyIpRjts29ak0KVD5FTwUSTvtepXjvPw&s"
            alt=""
            className="w-[140px] h-[68px]"
          />
        </div>
        <div>
          <p className="font-medium text-[12.01px] leading-[15.01px] text-[#666666]">Version 23 34 (2034234)</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
