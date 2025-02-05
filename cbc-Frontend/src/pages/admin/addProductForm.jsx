import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function AddProductForm() {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate()

    async function handleSubmit(){
        const altNames = alternativeNames.split(",")
        
        const promisesArray = []
    
        for(let i=0; i<imageFiles.length; i++){
          promisesArray[i] = uploadMediaToSupabase(imageFiles[i])
        }

        const imgUrls = await Promise.all(promisesArray)

        const product = {
          productId : productId,
          productName : productName,
          altNames : altNames,
          images : imgUrls,
          price : price,
          lastPrice : lastPrice,
          stock : stock,
          description : description
        }

    
    
    
    
    