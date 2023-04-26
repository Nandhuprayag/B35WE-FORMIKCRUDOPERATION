import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

export const Card = ({cart,id,deleteCart,editCart}) => 
{
  const navigate=useNavigate();
  return(
    <div className="Cart-Items"> 
    <div className="CartImage-Top">
          <img id='img' src={cart.image} alt={cart.title}/>
    </div>
    <div className="Cart-specs">
          <h4 id='cart-title'>{cart.title} - {id}</h4>
          <h5 id='cart-price'>${cart.price}</h5>
    </div>
    <div className='cart-btn'>
      <IconButton size='medium' aria-label='visible' 
      onClick={()=> navigate(`/products/${id}`)}
      ><VisibilityIcon color='primary' /></IconButton>
      {deleteCart}
      {editCart}
    </div>
    </div>
  );
};
