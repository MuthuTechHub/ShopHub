import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";
import { cartListProduct } from "../partials/FetchApi";
import { fetchData } from "./Action";
import axios from "axios";
import Swal from 'sweetalert2'; // Step 1: Import SweetAlert2

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
  }, [dispatch]);

  const handleDummyOrder = async () => {
    if (!state.address || !state.phone) {
      setState({ ...state, error: "Please provide address and phone number" });
      return;
    }

    let orderData = {
      allProduct: data.cartProduct,
      user: JSON.parse(localStorage.getItem("jwt")).user._id,
      amount: totalCost(),
      address: state.address,
      phone: state.phone,
    };

    try {
      dispatch({ type: "loading", payload: true });
      
      const res = await axios.post(`${apiURL}/api/order/create-order`, {
        ...orderData,
        transactionId: "TID-" + Math.floor(Math.random() * 1000000),
        paymentStatus: "Success"
      });

      if (res.data.success) {
        localStorage.removeItem("cart");
        setState({ ...state, success: res.data.success });

        // Step 2: Professional Success Popup
        Swal.fire({
          title: 'Order Placed Successfully!',
          text: 'Thank you for shopping with ShopHub.',
          icon: 'success',
          confirmButtonColor: '#1f2937',
          confirmButtonText: 'Back to Shop',
          allowOutsideClick: false,
          customClass: {
            popup: 'rounded-3xl'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/"; 
          }
        });
      }
    } catch (err) {
      console.log(err);
      setState({ ...state, error: "Something went wrong!" });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  // Step 3: Professional Loading Screen
  if (data.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900 mb-4"></div>
        <div className="text-2xl font-bold tracking-widest animate-pulse text-gray-800">
          PROCESSING ORDER...
        </div>
        <p className="text-gray-500 mt-2">Please do not refresh the page</p>
      </div>
    );
  }

  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl mx-2 font-bold mb-4">Checkout</div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct} />
          </div>

          <div className="w-full md:w-1/2 p-4 border rounded shadow-sm bg-white">
            <h2 className="text-xl mb-4 border-b pb-2 font-bold">Delivery Details</h2>
            {state.error && (
              <div className="bg-red-100 text-red-600 p-2 mb-2 rounded border border-red-200">{state.error}</div>
            )}
            
            <div className="flex flex-col py-2">
              <label className="pb-2 font-semibold text-gray-700">Delivery Address</label>
              <textarea
                value={state.address}
                onChange={(e) => setState({ ...state, address: e.target.value, error: false })}
                className="border px-4 py-2 rounded h-24 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                placeholder="Enter your full address with pincode..."
              />
            </div>

            <div className="flex flex-col py-2 mb-4">
              <label className="pb-2 font-semibold text-gray-700">Phone Number</label>
              <input
                value={state.phone}
                onChange={(e) => setState({ ...state, phone: e.target.value, error: false })}
                type="text"
                className="border px-4 py-2 rounded focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                placeholder="Enter 10 digit mobile number"
              />
            </div>

            <div className="bg-gray-50 p-4 mb-4 rounded-xl border border-dashed border-gray-300">
              <div className="flex justify-between font-bold text-xl">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{totalCost()}.00</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 uppercase tracking-tighter">Secure Checkout Powered by ShopHub</p>
            </div>

            <button
              onClick={handleDummyOrder}
              className="w-full px-4 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-all transform hover:scale-[1.01] active:scale-95 shadow-xl uppercase tracking-widest"
            >
              CONFIRM ORDER
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="flex flex-col mb-6">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="border-b py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  onClick={() => history.push(`/products/${product._id}`)}
                  className="cursor-pointer h-20 w-20 object-cover rounded-lg shadow-sm"
                  src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                  alt="product"
                />
                <div>
                  <div className="font-bold text-gray-800 truncate w-40">{product.pName}</div>
                  <div className="text-sm text-gray-500 font-medium">Quantity: {quantity(product._id)}</div>
                </div>
              </div>
              <div className="font-bold text-gray-800">
                ₹{subTotal(product._id, product.pPrice)}.00
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 font-medium text-gray-400">Your cart is empty</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;