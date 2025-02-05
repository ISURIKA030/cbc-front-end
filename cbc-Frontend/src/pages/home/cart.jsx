import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [labeledTotal, setLabeledTotal] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
      setCart(loadCart());
      console.log(loadCart());
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
          orderedItems: loadCart(),
        })
        .then((res) => {
          console.log(loadCart());
          console.log(res.data);
          if(res.data.total != null){
            setTotal(res.data.total);
            setLabeledTotal(res.data.total);
          }
        });
    }, []);

    function onOrderCheckOutClick() {
        navigate("/shipping" ,{
          state: {
            items : loadCart()
          }
        });    
      }
    