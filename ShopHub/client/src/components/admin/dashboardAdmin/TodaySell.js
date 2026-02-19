import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DashboardContext } from "./";
import { todayAllOrders } from "./Action";

const apiURL = process.env.REACT_APP_API_URL;

const SellTable = () => {
  const history = useHistory();
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    todayAllOrders(dispatch);
  }, [dispatch]);

  const ordersList = () => {
    let newList = [];
    if (data?.totalOrders?.Orders !== undefined) {
      data.totalOrders.Orders.forEach(function (elem) {
        if (moment(elem.createdAt).format("LL") === moment().format("LL")) {
          newList = [...newList, elem];
        }
      });
    }
    return newList;
  };

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <div className="text-2xl font-semibold mb-6 text-center">
          Today's Orders{" "}
          {data?.totalOrders?.Orders !== undefined ? ordersList().length : 0}
        </div>
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-sm">Products</th>
              <th className="px-4 py-2 border text-sm">Image</th>
              <th className="px-4 py-2 border text-sm">Status</th>
              <th className="px-4 py-2 border text-sm">Order Address</th>
              <th className="px-4 py-2 border text-sm">Ordered at</th>
            </tr>
          </thead>
          <tbody>
            {data?.totalOrders?.Orders !== undefined && ordersList().length > 0 ? (
              ordersList().map((item, key) => {
                return <TodayOrderTable order={item} key={key} />;
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-xl text-center font-semibold py-8 text-gray-400"
                >
                  No orders found today
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total{" "}
          {data?.totalOrders?.Orders !== undefined ? ordersList().length : 0}{" "}
          orders found
        </div>
        <div className="flex justify-center mt-4">
          <span
            onClick={(e) => history.push("/admin/dashboard/orders")}
            style={{ background: "#303031" }}
            className="cursor-pointer px-4 py-2 text-white rounded-full text-sm hover:opacity-90"
          >
            View All
          </span>
        </div>
      </div>
    </Fragment>
  );
};

const TodayOrderTable = ({ order }) => {
  return (
    <Fragment>
      <tr>
        <td className="w-48 hover:bg-gray-50 p-2 flex flex-col space-y-1 border-b">
          {order.allProduct.map((item, index) => {
            return (
              <div key={index} className="flex space-x-2 text-xs">
                {/* Added Optional Chaining '?.' to prevent pName crash */}
                <span className="font-medium text-gray-700">{item.id?.pName || "Product Deleted"}</span>
                <span className="text-blue-600">{item.quantitiy}x</span>
              </div>
            );
          })}
        </td>
        <td className="p-2 text-left border-b">
          <div className="flex space-x-1">
            {order.allProduct.map((item, index) => {
              return (
                <img
                  key={index}
                  className="w-10 h-10 object-cover rounded border"
                  src={`${apiURL}/uploads/products/${item.id?.pImages?.[0] || "default.png"}`}
                  alt="Product"
                />
              );
            })}
          </div>
        </td>
        <td className="p-2 text-center border-b">
          <span className={`block rounded-full text-center text-[10px] px-2 py-1 font-bold uppercase ${
            order.status === "Delivered" ? "bg-green-100 text-green-700" :
            order.status === "Cancelled" ? "bg-red-100 text-red-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {order.status}
          </span>
        </td>
        <td className="p-2 text-center text-xs text-gray-600 border-b">{order.address}</td>
        <td className="p-2 text-center text-xs text-gray-500 border-b">
          {moment(order.createdAt).format("lll")}
        </td>
      </tr>
    </Fragment>
  );
};

const TodaySell = (props) => {
  return (
    <div className="m-4">
      <SellTable />
    </div>
  );
};

export default TodaySell;