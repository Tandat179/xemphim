import React, { useContext, useEffect, useState } from 'react'
import './paymentCss.css'
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function PaymentPage() {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const {
        authState: { isAuthenticated, user },
        logoutUserNow,
        setUser
      } = useContext(AuthContext);
      useEffect(() => {
        if(!isAuthenticated){
            navigate("/")
        }
      },[isAuthenticated])
      const updateRankUser = async () => {
        setLoading(true)
        try {
          const config = { headers: { "Context-Type": "application/json" } };
          
          const response = await axios.post(
            `http://localhost:4000/auth/updateRankUser?id=${user._id}`,
            config
          );
            // Check Token
          if(response.data.success){
            toast.success('Đăng kí thành viên Premium thành công');
            setUser(response.data)
                setTimeout(() => {
                    navigate(-1)
                }, 1000);
              
          }
        } catch (e) {
            console.log(e);
        }
        setLoading(false)
      };
  return (
   <div className='cha'>
         <Toaster />
     <div className="card">
    <div className="card-header">
        <img src="https://img.freepik.com/free-vector/people-watching-movie-home_23-2148566416.jpg?w=2000" alt=""/>
    </div>
    <div className="card-body">
        <div className="card-title">Order Summary</div>
        <div className="card-text">You can now watch millions of film anywhere you like!</div>
        <div className="card-plan">
            <div className="card-plan-img"><img style={{width : '50%' , borderRadius : '50%' , heigth : '100%'}} src="https://cdn.dribbble.com/userupload/4150478/file/original-6d61a13e32199b9fda2f3bbdf803b823.png?compress=1&resize=2048x1536" alt=""/></div>
            <div className="card-plan-text">
                <div className="card-plan-title">Annual Plan</div>
                <div className="card-plan-price">$59.99/year</div>
            </div>
            {/* <div className="card-plan-link"><a href="#!">Change</a></div> */}
        </div>
        <div className="card-payment-button">
        {loading ?   <button onClick={updateRankUser}>...Loading</button> :  <button onClick={updateRankUser}>Proceed to Payment</button>}
           
          
        </div>
        <div className="card-cancel-button">
            <button>Cancel Order</button>
        </div>
    </div>
</div>
   </div>
  )
}
