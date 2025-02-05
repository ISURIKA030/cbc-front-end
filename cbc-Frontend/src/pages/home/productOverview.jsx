import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../components/imgeSlider";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //not-foud, found
    const navigate = useNavigate();
    useEffect(() => {
      console.log(productId);
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
        .then((res) => {
          console.log(res.data);
  
          //if null
          if (res.data == null) {
            setStatus("not-found");
          }
  
          if (res.data != null) {
            setProduct(res.data);
            setStatus("found");
          }
        });
    }, []);
  