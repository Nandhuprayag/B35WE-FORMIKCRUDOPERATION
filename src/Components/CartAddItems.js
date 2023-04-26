import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import {API} from '../Common/cartAPI';
import { useFormik } from "formik";
import * as yup from 'yup';

export const CartAddItems = () => 
{
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState();
    const [image,setImage]=useState('');
    const [category,setCategory]=useState('');

    const navigate=useNavigate();
    
    const style={
        color:'black'
    }

    const formValid=yup.object({
        title:yup.string().min(5,'Too Short!').max(60,'Too Long! '),
        Description:yup.string().max(1500,'Sorry reached your maximum Limits'),
        Image:yup.string().max(200,'Too Short'),
        category:yup.string().max(1500,'Sorry reached your maximum limits')
    })
    
    const formik=useFormik(
        {
            initialValues:{title:"",Description:'',image:"",category:'' },
            validationSchema:formValid,
            onSubmit:(values)=>{console.log(values)}
        }
    )
    return(
        <div className="Add-CartItems">
            <div >
                <form className="cart-fields" onSubmit={formik.handleSubmit}>
            
            <TextField label="Title" variant="standard" id="title"
            
            style={style}
            name="title"
            type='text'
            placeholder="Enter Title" 
            value={formik.values.title} onChange={formik.handleChange}/>
           {formik.errors.title}

         <TextField type="Description"  label="Description" variant="standard" 
            value={formik.values.Description} onChange={formik.handleChange}
            id='Description'
            name="Description"
            placeholder="Enter Description"
            />
         <TextField  label="Image" variant="standard"
         id='image'
         name="image"
         type="text"
         value={formik.values.Image}
         onChange={formik.handleChange}
         placeholder="Paste link"
         />
          <TextField  label="Category" variant="standard" 
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          />

                <div className="cart-btn">
                <Button variant="contained" onClick={()=>{
                    const newProduct={
                        title,description,category,image
                    };
                    axios.post(`${API}/FakeStore`,{newProduct})
                    .then((response)=> {
                            console.log(response.data);
                            navigate(`/products`)
                    })
                }}>Save Cart</Button>
              </div>
               
                </form>
            {/* <input 
            id="title"
            name="title"
            type='text'
            placeholder="Enter Title" 
            value={formik.values.title} onChange={formik.handleChange}/> */}
            
         

            </div>
           
              

        </div>
    );
};
