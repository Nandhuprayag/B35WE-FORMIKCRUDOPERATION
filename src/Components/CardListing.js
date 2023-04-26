import axios from 'axios';
import { useEffect, useState } from 'react';
import {API} from "../Common/cartAPI";
import { Card } from './Card';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom';

const CardListing = () => 
{
  const [data,setData]=useState([]);
  
  const getAllproducts=()=>
  {
    axios.get(`${API}/FakeStore`)
    .then(response =>{ console.log(response.data)
     setData(response.data)
   })
    .catch((err)=>console.log(`err : ${err}`))
  }

   useEffect(()=>getAllproducts(),[])

   const navigate=useNavigate()

  return(
    <div className='card-listing'>
      {data.map((items,index)=>
      (
        <Card cart={items} key={index} id={items.id}
         deleteCart={
          <IconButton aria-label="delete" color='error' size='medium' onClick={() => {
            axios.delete(`${API}/FakeStore/${items.id}`)
            .then((res)=> getAllproducts(res.data))

          }}><DeleteIcon color='error'/></IconButton>
         }
         editCart={
          <IconButton aria-label="edit" color='warning' 
           onClick={()=> navigate(`/products/edit/${items.id}`)}
          ><ModeEditIcon size='medium'/></IconButton>
         }
        />
      ))}
    </div>
  );
};


export default CardListing;

