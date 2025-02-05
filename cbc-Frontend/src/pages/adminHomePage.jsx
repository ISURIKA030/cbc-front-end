import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { BsGraphUp, BsBoxSeam, BsCart4, BsPeopleFill } from "react-icons/bs";
import AdminProductsPage from "./admin/adminProductsPage";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProductForm";
import AdminOrdersPage from "./admin/adminOrderPage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminHomePage() {
    const [user,setUser] = useState(null)
    const navigate = useNavigate();
    useEffect(()=>{
      const token = localStorage.getItem("token");
      if (!token) {      
        navigate("/login")
        return;
      }
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res)=>{
          console.log(res.data)
          if(res.data.type!="admin"){
            toast.error("Unauthorized access")
            navigate("/login")
          }else{
            setUser(res.data)
          }
  
        }).catch((err)=>{
          console.error(err)
          toast.error("Failed to fetch user data")
          navigate("/login")
        })
      
    },[])

    