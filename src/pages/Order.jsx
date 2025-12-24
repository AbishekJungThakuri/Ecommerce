import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { clearCart } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";

const Order = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shipping = 50;
  const total = subtotal + shipping;

  // Formik & Yup setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must be numeric")
        .min(10, "Phone must be at least 10 digits")
        .required("Phone is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
    }),
    onSubmit: (values, { resetForm }) => {

      if(selectedPayment != ""){
            console.log("Order Placed:", { shippingInfo: values, cartItems });
            alert("Order Placed Successfully!");
            resetForm();
            dispatch(clearCart());
            navigate("/shop");
      } 
    },
  });


  const handlePlaceOrder = () => {
    setIsPaymentOpen(true); // open payment modal
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    setIsPaymentOpen(false);
    alert(`Payment method selected: ${method}`);
    // Here you can also "process" the payment or clear the cart
  };

  return (
    <div className={` mx-auto px-4 py-6 sm:py-8 md:py-20 bg-[#1a1a1a]`}>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-6">

         {/* Shipping Info Form  */}
        <div className="flex-1 bg-white p-4 rounded shadow max-h-[500px]">
          <h2 className="text-xl font-semibold mb-3">Shipping Information</h2>
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            {["name", "email", "phone", "address", "city", "state"].map(
              (field) => (
                <div key={field}>
                  <input
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    {...formik.getFieldProps(field)}
                    className={`border rounded-md p-3 w-full
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
              transition-shadow duration-200
              ${
                formik.touched[field] && formik.errors[field]
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors[field]}
                    </p>
                  )}
                </div>
              )
            )}

            <button
            onClick={handlePlaceOrder}
              type="submit"
              className="mt-4 w-full text-white p-3 rounded bg-[#e11f2c] transform transition hover:-translate-y-1 duration-300 cursor-pointer"
            >
              Place Order
            </button>
            <PaymentModal
               isOpen={isPaymentOpen}
               onClose={() => setIsPaymentOpen(false)}
              onSelectPayment={handlePaymentSelect}
             />
          </form>
        </div>


        {/* Order Summary */}
        <div className="flex-1 bg-white p-4 rounded shadow h-fit lg:max-h-[500px] lg:overflow-y-auto">
          <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p>{item.name}</p>
                    <div className="flex gap-2">
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      <p className="text-sm text-gray-500">
                        Size: {item.size.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
                <p>${item.price * item.qty}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 space-y-2">
            <p className="flex justify-between">
              Subtotal: <span>${subtotal}</span>
            </p>
            <p className="flex justify-between">
              Shipping: <span>${shipping}</span>
            </p>
            <p className="flex justify-between font-bold text-lg">
              Total: <span>${total}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
