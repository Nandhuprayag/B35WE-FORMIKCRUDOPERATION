import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../Common/cartAPI";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const CartEditItems = () => 
{ 
    const {id}=useParams();
    console.log(id)

    const [cart,setCart]=useState(null)

    useEffect(()=>
    {
       axios.get(`${API}/FakeStore/${id}`)
       .then(res=> {
        console.log(res.data)
        setCart(res.data)
       })
    },[])

    return (<div>
        {cart ?<CartEditForm cart={cart}/>:"Loading ..."}
    </div>);
};


export default CartEditItems;



const CartEditForm=({cart})=>
{

    const [title,setTitle]=useState(cart.title);
    console.log(title);
    const [description,setDescription]=useState();
    const [image,setImage]=useState('');
    const [category,setCategory]=useState('');

    const navigate=useNavigate();
     
    const formValid=yup.object({
        title:yup.string().min(5,'Enter your Title as your Wish').max(60,'Sorry reached your maximum Limits '),
        Description:yup.string().max(1500,'Sorry reached your maximum Limits'),
        Image:yup.string().max(200,'use the Space for the Link'),
        category:yup.string().max(1500,'Sorry reached your maximum limits')
    });
    
    const formik=useFormik(
        {
            initialValues:{title:"",Description:'',image:"",category:'' },
            validationSchema:formValid,
            onSubmit:(values)=>{console.log(values)}
        }
    )

    return(
        <div className="Cart-Edit"> 
            
            <form className="cart-fields" onSubmit={formik.handleSubmit}>
                <TextField label="Title" variant="standard" id="title"
               value={title}
            name="title"
            type='text'
            placeholder="Enter Title" 
            // value={formik.values.title}
             onChange={formik.handleChange}/>

            {formik.errors.title}

            <TextField type="Description"  label="Description" variant="standard" 
            value={formik.values.Description} onChange={formik.handleChange}
            id='Description'
            name="Description"
            placeholder="Enter Description"
            /> {formik.errors.Description}
         <TextField  label="Image" variant="standard"
         id='image'
         name="image"
         type="text"
         value={formik.values.Image}
         onChange={formik.handleChange}
         placeholder="Paste link"
         /> {formik.errors.image}
          <TextField  label="Category" variant="standard" 
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          /> {formik.errors.category}

                <div className="cart-btn">
                <Button variant="contained" onClick={()=>{
                    const updateProduct={
                        title,description,category,image
                    };
                    axios.put(`${API}/FakeStore/${cart.id}`,{updateProduct})
                    .then((response)=> {
                            console.log(response.data);
                            navigate(`/products`)
                    })
                }}>Update Cart</Button>
              </div>
               
                </form>
        </div>
    )
}