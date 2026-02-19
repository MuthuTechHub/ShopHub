import React, { Fragment, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";

const Sidebar = (props) => {
  const { data } = useContext(DashboardUserContext);

  const history = useHistory();
  const location = useLocation();

  return (
    <Fragment>
      <div className="flex flex-col w-full space-y-4 md:w-3/12 font-medium">
        {/* User Profile Header */}
        <div
          style={{ background: "#303031" }}
          className="flex items-center space-x-2 rounded shadow p-2 text-gray-100"
        >
          <svg
            className="cursor-pointer w-16 h-16 text-gray-100"
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
          <div className="flex flex-col w-full">
            <span className="text-sm">Hello,</span>
            <span className="text-lg font-bold">
              {data.userDetails ? data.userDetails.name : "User"}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="shadow hidden md:block w-full bg-white rounded">
          {/* My Orders with List Icon */}
          <div
            onClick={(e) => history.push("/user/orders")}
            className={`${
              location.pathname === "/user/orders"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } flex items-center space-x-3 px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all`}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span>My Orders</span>
          </div>
          <hr />

          <div
            onClick={(e) => history.push("/user/profile")}
            className={`${
              location.pathname === "/user/profile"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } flex items-center space-x-3 px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all`}
          >
             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>My Accounts</span>
          </div>
          <hr />

          <div
            onClick={(e) => history.push("/wish-list")}
            className={`flex items-center space-x-3 px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all`}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>My Wishlist</span>
          </div>
          <hr />

          <div
            onClick={(e) => history.push("/user/setting")}
            className={`${
              location.pathname === "/user/setting"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } flex items-center space-x-3 px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all`}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Setting</span>
          </div>
          <hr />

          <div
            onClick={(e) => logout()}
            className="flex items-center space-x-3 px-4 py-4 hover:bg-gray-200 cursor-pointer transition-all text-red-600 font-bold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;