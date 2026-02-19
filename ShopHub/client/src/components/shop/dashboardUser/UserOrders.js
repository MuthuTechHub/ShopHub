import React, { Fragment, useEffect, useContext } from "react";
import moment from "moment";
import { fetchOrderByUser } from "./Action";
import Layout, { DashboardUserContext } from "./Layout";

const apiURL = process.env.REACT_APP_API_URL;

const TableHeader = () => {
  return (
    <Fragment>
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border text-sm uppercase">Products</th>
          <th className="px-4 py-2 border text-sm uppercase">Status</th>
          <th className="px-4 py-2 border text-sm uppercase">Total</th>
          <th className="px-4 py-2 border text-sm uppercase">Phone</th>
          <th className="px-4 py-2 border text-sm uppercase">Address</th>
          <th className="px-4 py-2 border text-sm uppercase">Transaction Id</th>
          <th className="px-4 py-2 border text-sm uppercase">Checkout</th>
          <th className="px-4 py-2 border text-sm uppercase">Processing</th>
        </tr>
      </thead>
    </Fragment>
  );
};

const TableBody = ({ order }) => {
  return (
    <Fragment>
      <tr className="border-b hover:bg-gray-50 transition-all">
        <td className="w-48 p-2 flex flex-col space-y-2 border-r">
          {order.allProduct.map((product, i) => {
            return (
              <span className="flex items-center space-x-2" key={i}>
                <img
                  className="w-10 h-10 object-cover rounded border shadow-sm"
                  /* Added Optional Chaining '?.' to prevent pImages crash */
                  src={`${apiURL}/uploads/products/${product.id?.pImages?.[0] || 'default.png'}`}
                  alt="product"
                />
                <div className="flex flex-col">
                   <span className="text-xs font-semibold text-gray-800">
                     {product.id?.pName || "Product Unavailable"}
                   </span>
                   <span className="text-[10px] text-blue-600">Qty: {product.quantitiy}x</span>
                </div>
              </span>
            );
          })}
        </td>
        <td className="p-2 text-center border-r">
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
            order.status === "Delivered" ? "bg-green-100 text-green-700" :
            order.status === "Cancelled" ? "bg-red-100 text-red-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {order.status}
          </span>
        </td>
        <td className="p-2 text-center font-bold text-gray-700 border-r">
          ₹{order.amount}.00
        </td>
        <td className="p-2 text-center text-xs border-r">{order.phone}</td>
        <td className="p-2 text-center text-xs border-r truncate max-w-[120px]" title={order.address}>
          {order.address}
        </td>
        <td className="p-2 text-center text-[10px] text-gray-500 border-r">
          {order.transactionId}
        </td>
        <td className="p-2 text-center text-[10px] text-gray-600 border-r">
          {moment(order.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center text-[10px] text-gray-600">
          {moment(order.updatedAt).format("lll")}
        </td>
      </tr>
    </Fragment>
  );
};

const OrdersComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const { OrderByUser: orders } = data;

  useEffect(() => {
    fetchOrderByUser(dispatch);
  }, [dispatch]);

  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-700"></div>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="border rounded-lg shadow-sm">
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700 flex justify-between items-center bg-gray-50">
            <span>My Orders</span>
            <span className="text-sm bg-yellow-700 text-white px-3 py-1 rounded-full">
               Total: {orders ? orders.length : 0}
            </span>
          </div>
          <hr />
          <div className="overflow-auto bg-white p-4">
            <table className="table-auto border w-full my-2">
              <TableHeader />
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((item, i) => {
                    return <TableBody key={i} order={item} />;
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-xl text-center font-semibold py-12 text-gray-400"
                    >
                      You haven't placed any orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserOrders = (props) => {
  return (
    <Fragment>
      <Layout children={<OrdersComponent />} />
    </Fragment>
  );
};

export default UserOrders;