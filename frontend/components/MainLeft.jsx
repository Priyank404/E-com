
import Sort from './Sort'
import { useNavigate, Link, useLocation} from 'react-router-dom';
import axios from 'axios';



const MainLeft = ({showSort=false,isAdmin=false}) => {
    const navigate = useNavigate();

    
    

  const handleLogout = async () => {
   try {
    const res = await axios.post('http://localhost:3000/users/logout', {}, {
      withCredentials: true // required to send the cookie
    });
    
    // Redirect to login page
    navigate('/');
  } catch (err) {
    console.log('Logout failed', err);
  }
};

  const handleDeleteAll = async () => {
    try {
      const res = await axios.post('http://localhost:3000/products/delete/all', {
        withCredentials: true // required to send the cookie
      });
      
      // Redirect to login page
      navigate('/owner', { state: { message: 'All products deleted successfully!' } });
    } catch (err) {
      console.log('error in deleting product', err);
    }
  };

  return (

    <>
      
        <div className='m-4 flex  h-screen  flex-col'>
            {showSort && <Sort />}

            {isAdmin && (
              
                <div className='flex  flex-col h-screen text-lg font-semibold tracking-tight'>
                    <div className='h-[40vh] pt-5 flex flex-col'>
                      <a href="#">All Product</a>
                      <Link to='/product/create'>Create New Product</Link>
                    </div>

                    <div className='h-[40vh]  flex justify-end flex-col'>
                      <a className='text-red-500 cursor-pointer' onClick={handleDeleteAll}>Delete all product</a>
                      <a className='text-red-500 cursor-pointer'  onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            
            )||(
             <div className='flex  flex-col h-screen text-lg font-md tracking-tight'>
                    <div className='h-[40vh] pt-20 flex flex-col gap-3'>
                      <a href="#">New Collection</a>
                    <a href="#">All Product</a>
                    <a href="#">Discounted Products</a>
                    </div>

                    <div className='h-[40vh]  flex justify-end flex-col'>
                      
                      <a className='text-red-500 cursor-pointer'  onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            )}


 
        </div>
    </>
  )
}

export default MainLeft