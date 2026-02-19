import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const AdminNavber = (props) => {
  const history = useHistory();

  /**
   * Handles user logout by clearing session data 
   * and redirecting to the home page.
   */
  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishList");
    window.location.href = "/";
  };

  return (
    <Fragment>
      <nav className="sticky z-10 flex items-center shadow-md justify-between px-4 py-4 md:px-8 top-0 w-full bg-white">
        
        {/* LEFT SECTION: Spacer for layout balance */}
        <div className="flex-1 hidden lg:block"></div>

        {/* CENTER SECTION: Brand Logo */}
        <div className="flex-1 flex justify-center items-center">
          <div className="hidden lg:block">
            <span
              onClick={(e) => history.push("/admin/dashboard")}
              style={{ letterSpacing: "0.70rem" }}
              className="font-bold uppercase text-gray-800 text-2xl cursor-pointer"
            >
              ShopHub
            </span>
          </div>
          <div className="lg:hidden">
            <span
              onClick={(e) => history.push("/admin/dashboard")}
              style={{ letterSpacing: "0.10rem" }}
              className="font-bold uppercase text-gray-800 text-2xl cursor-pointer"
            >
              ShopHub
            </span>
          </div>
        </div>

        {/* RIGHT SECTION: Admin Actions */}
        <div className="flex-1 flex justify-end items-center">
          <div
            className="userDropdownBtn hover:bg-gray-100 px-2 py-2 rounded-lg relative group"
            title="Account"
          >
            <svg
              className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div className="userDropdown absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg min-w-[160px] hidden group-hover:block z-50">
              <ul className="flex flex-col text-gray-700 py-1">
                <li
                  onClick={(e) => history.push("/")}
                  className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 cursor-pointer"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="text-sm font-medium">Shop</span>
                </li>
                <hr className="my-1 border-gray-100" />
                <li
                  onClick={(e) => logout()}
                  className="flex items-center space-x-2 py-2 px-4 hover:bg-red-50 text-red-600 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-bold text-sm">Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </nav>
    </Fragment>
  );
};

export default AdminNavber;