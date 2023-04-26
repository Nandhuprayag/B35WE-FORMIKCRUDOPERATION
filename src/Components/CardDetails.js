import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../Common/cartAPI";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



export const CardDetails = () => 
{
    const [list,setList]=useState({}); 

    const {id}=useParams();
    console.log(Number(id))
   
    useEffect(()=>
    {
         axios.get(`${API}/FakeStore/${id}`)
         .then((response)=>
         {
            setList(response.data)
            console.log(response.data)
         })
    },[]);
    const navigate=useNavigate();

    const style={
        color:'green',fontSize:'2em',backgroundColor:'grey'
    }
    return(
        <div className="Card-Details">
            <div className="card-poster">
                    <img src={list.image} alt={list.title}/>
            </div>
            <div className="Cart-SPecs">
          <h4 >{list.title} - {id}</h4>
          <h4>{list.category}</h4>
          <p>{list.description}</p>
          <div>
          <h5 id='cart-price' style={style}>${list.price}</h5>

          </div>
            </div>
            <div>
                <Button variant="outlined" startIcon={<ArrowBackIosIcon />} 
                onClick={()=> navigate(`/products`)}
                >Back</Button>
            </div>
        </div>
    );
};
