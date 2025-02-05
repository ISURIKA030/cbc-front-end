import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../../components/cartCard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShippingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.items;
    const [total, setTotal] = useState(0);
    const [labeledTotal, setLabeledTotal] = useState(0);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
  
    useEffect(() => {
      if (!cart) {
        toast.error("No items received");
        navigate("/cart");
        return;
      }
  
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
          orderedItems: cart,
        })
        .then((res) => {
          if (res.data.total != null) {
            setTotal(res.data.total);
            setLabeledTotal(res.data.labeledTotal);
          }
        })
        .catch((err) => {
          toast.error("Failed to fetch order quote. Please try again.");
          console.error(err);
        });
    }, [cart, navigate]);

    function validateInputs() {
        if (!name.trim()) {
          toast.error("Please enter your name.");
          return false;
        }
        if (!address.trim()) {
          toast.error("Please enter your address.");
          return false;
        }
        if (!phone.trim() || !/^\d{10}$/.test(phone)) {
          toast.error("Please enter a valid 10-digit phone number.");
          return false;
        }
        return true;
      }

      function createOrder() {
        if (!validateInputs()) return;
    
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to place an order.");
          return;
        }

        axios
        .post(
          import.meta.env.VITE_BACKEND_URL + "/api/orders",
          {
            orderedItems: cart,
            name,
            address,
            phone,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )

        .then((res) => {
            toast.success("Order placed successfully!");
            navigate("/orders");
          })
          .catch((err) => {
            toast.error("Failed to place order. Please try again.");
            console.error(err);
          });
      }
    
      if (!cart) {
        return null;
      }
