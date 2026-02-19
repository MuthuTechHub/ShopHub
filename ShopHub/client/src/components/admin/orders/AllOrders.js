import React, { Fragment, useContext, useEffect } from "react";
import moment from "moment";

import { OrderContext } from "./index";
import { fetchData, editOrderReq, deleteOrderReq } from "./Actions";

const apiURL = process.env.REACT_APP_API_URL;

const AllCategory = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const { orders, loading } = data;

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border text-sm uppercase">Products</th>
              <th className="px-4 py-2 border text-sm uppercase">Status</th>
              <th className="px-4 py-2 border text-sm uppercase">Total</th>
              <th className="px-4 py-2 border text-sm uppercase">Transaction Id</th>
              <th className="px-4 py-2 border text-sm uppercase">Customer</th>
              <th className="px-4 py-2 border text-sm uppercase">Email</th>
              <th className="px-4 py-2 border text-sm uppercase">Phone</th>
              <th className="px-4 py-2 border text-sm uppercase">Address</th>
              <th className="px-4 py-2 border text-sm uppercase">Date</th>
              <th className="px-4 py-2 border text-sm uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((item, i) => {
                return (
                  <CategoryTable
                    key={i}
                    order={item}
                    editOrder={(oId, type, status) =>
                      editOrderReq(oId, type, status, dispatch)
                    }
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-xl text-center font-semibold py-8 text-gray-400"
                >
                  No orders found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2 font-medium">
          Total {orders ? orders.length : 0} orders found
        </div>
      </div>
    </Fragment>
  );
};

const CategoryTable = ({ order, editOrder }) => {
  const { dispatch } = useContext(OrderContext);

  return (
    <Fragment>
      <tr className="border-b hover:bg-gray-50 transition-all">
        <td className="w-48 p-2 flex flex-col space-y-2">
          {order.allProduct.map((product, i) => {
            return (
              <span className="flex items-center space-x-2" key={i}>
                <img
                  className="w-10 h-10 object-cover rounded border shadow-sm"
                  src={`${apiURL}/uploads/products/${product.id?.pImages?.[0] || 'default.png'}`}
                  alt="Product"
                />
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-gray-800">{product.id?.pName || "Product Unavailable"}</span>
                   <span className="text-[10px] text-blue-600">Quantity: {product.quantitiy}x</span>
                </div>
              </span>
            );
          })}
        </td>
        <td className="p-2 text-center">
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${
            order.status === "Delivered" ? "bg-green-100 text-green-700" :
            order.status === "Cancelled" ? "bg-red-100 text-red-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {order.status}
          </span>
        </td>
        <td className="p-2 text-center font-semibold text-gray-700">
          ₹{order.amount}.00
        </td>
        <td className="p-2 text-center text-xs text-gray-500">
          {order.transactionId}
        </td>
        <td className="p-2 text-center text-xs font-medium">{order.user?.name || "Deleted User"}</td>
        <td className="p-2 text-center text-[10px] text-gray-500">
          {order.user?.email || "N/A"}
        </td>
        <td className="p-2 text-center text-xs">{order.phone}</td>
        <td className="p-2 text-center text-[10px] max-w-[100px] truncate" title={order.address}>
          {order.address}
        </td>
        <td className="p-2 text-center text-[10px] text-gray-500 italic">
          {moment(order.createdAt).format("lll")}
        </td>
        <td className="p-2">
          <div className="flex items-center justify-center space-x-1">
            <button
              onClick={() => editOrder(order._id, true, order.status)}
              className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
              title="Edit Status"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => deleteOrderReq(order._id, dispatch)}
              className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
              title="Delete Order"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllCategory;