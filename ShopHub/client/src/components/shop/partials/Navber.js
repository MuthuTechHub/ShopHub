import React, { Fragment, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  return (
    <Fragment>
      {/* Navber Section */}
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-white border-b">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-4 lg:grid-cols-3">
          <div className="hidden lg:block col-span-1 flex text-gray-600 mt-1">
            <span
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer transition-all"
              onClick={(e) => history.push("/")}
            >
              Shop
            </span>
            {/* Blog and Contact us links removed from here */}
          </div>
          <div className="col-span-2 lg:hidden flex justify-items-stretch items-center">
            <svg
              onClick={(e) => navberToggleOpen()}
              className="col-span-1 lg:hidden w-8 h-8 cursor-pointer text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={(e) => history.push("/")}
              style={{ letterSpacing: "0.10rem" }}
              className="flex items-left text-center font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2"
            >
              ShopHub
            </span>
          </div>
          <div
            onClick={(e) => history.push("/")}
            style={{ letterSpacing: "0.70rem" }}
            className="hidden lg:block flex items-left col-span-1 text-center text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer"
          >
            ShopHub
          </div>
          <div className="flex items-right col-span-2 lg:col-span-1 flex justify-end items-center">
            {/* WishList Page Button */}
            <div
              onClick={(e) => history.push("/wish-list")}
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer transition-all"
              title="Wishlist"
            >
              <svg
                className={`${
                  location.pathname === "/wish-list"
                    ? "fill-current text-gray-800"
                    : ""
                } w-8 h-8 text-gray-600 cursor-pointer`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            {localStorage.getItem("jwt") ? (
              <Fragment>
                <div
                  className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative"
                  title="My Account"
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
                  <div className="userDropdown absolute right-0 mt-1 bg-white border shadow-2xl rounded-lg overflow-hidden transition-all">
                    {!isAdmin() ? (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-56 list-none">
                          <span
                            onClick={(e) => history.push("/user/orders")}
                            className="flex items-center space-x-3 py-3 px-6 hover:bg-gray-100 cursor-pointer border-b text-sm font-medium"
                          >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <span>My Orders</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/user/profile")}
                            className="flex items-center space-x-3 py-3 px-6 hover:bg-gray-100 cursor-pointer border-b text-sm font-medium"
                          >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>My Account</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/wish-list")}
                            className="flex items-center space-x-3 py-3 px-6 hover:bg-gray-100 cursor-pointer border-b text-sm font-medium"
                          >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>My Wishlist</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/user/setting")}
                            className="flex items-center space-x-3 py-3 px-6 hover:bg-gray-100 cursor-pointer border-b text-sm font-medium"
                          >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            </svg>
                            <span>Setting</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex items-center space-x-3 py-3 px-6 hover:bg-red-50 text-red-600 cursor-pointer text-sm font-bold"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-56 list-none shadow-2xl">
                          <span
                            onClick={(e) => history.push("/admin/dashboard")}
                            className="flex items-center space-x-3 py-3 px-6 hover:bg-gray-100 cursor-pointer border-b text-sm font-medium"
                          >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            </svg>
                            <span>Admin Panel</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex items-center space-x-3 py-3 px-6 hover:bg-red-50 text-red-600 cursor-pointer text-sm font-bold"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    )}
                  </div>
                </div>
              </Fragment>
            ) : (
              <div
                onClick={(e) => loginModalOpen()}
                className="cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-lg transition-all"
                title="Login"
              >
                <svg
                  className="w-8 h-8 text-gray-600 hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            )}
            <div
              onClick={(e) => cartModalOpen()}
              className="hover:bg-gray-200 px-2 py-2 rounded-lg relative cursor-pointer transition-all"
              title="Cart"
            >
              <svg
                className="w-8 h-8 text-gray-600 hover:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-yellow-700 rounded-full px-1.5 text-white text-[10px] font-bold">
                {data.cartProduct !== null ? data.cartProduct.length : 0}
              </span>
            </div>
          </div>
        </div>
      </nav>
      {/* End Navber Section */}
    </Fragment>
  );
};

export default Navber;