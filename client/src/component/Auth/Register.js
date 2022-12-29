import { useState } from "react";

import MailOutlineIcon from "../../assets/mail.svg";
import LockOpenIcon from "../../assets/password.svg";
import FaceIcon from "../../assets/person-circle.svg";
import ImageCard from "../../assets/card-image.svg";
import { useForm } from "react-hook-form";

import "./Auth.css";

export default function Register({registerTab,message,loadingShow,registerUser}) {
  const [image,setImage] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(ImageCard);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    console.log(errors);
    const registerSubmit = async (data) => {
          loadingShow();
      await registerUser({...data,avatar : image});
      
    
    
    }
    const registerDataChange = (e) => {
      if (e.target.name === "avatar") {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            console.log(reader.result);
            setAvatarPreview(reader.result);
            setImage(reader.result)
          }
        };
  
        reader.readAsDataURL(e.target.files[0]);
  
        //Get catch value name from value.name from Form Register
      } else {
        setImage(e.target.value)
      }
    };
  return (
    <form
    className="signUpForm"
    ref={registerTab}
    encType="multipart/form-data"
    onSubmit={handleSubmit(registerSubmit)}
  >
    {/* Message from Server */}
    <p style={{ color: "red", textAlign: "center" }}>{message}</p>
    <div className="signUpName">
      <img src={FaceIcon} alt="s" className="svgImg" />

      {/* Input Name */}
      <input
        type="text"
        placeholder="Name"
        name="name"
       {...register("name",{required : true , maxLength : 18  , minLength : 2})}
      />
    </div>
    {errors.name && errors.name.type === 'required' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Vui lòng nhập Tên</span>}
            {errors.name && errors.name.type === 'minLength' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Tên phải lớn hơn 2 ký tự</span>}
            {errors.name && errors.name.type === 'maxLength' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Tên phải bé hơn 18 ký tự</span>}

    {/* Input Mail */}
    <div className="loginEmail">
      <img src={MailOutlineIcon} alt="s" className="svgImg" />
      <input
        placeholder="Email"
        name="email"
        {...register("email",{ pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i , required : true })}
        // value={formLogin.email}
        // onChange={handleOnChangeLogin}
      />
      
    </div>
    {errors.email && errors.email.type === 'required' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Vui lòng nhập email</span>}
    { errors.email &&  errors.email.type === 'pattern' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>email không đúng định dạng</span>}

    {/* Input Password */}
    <div className="signUpPassword">
      <img src={LockOpenIcon} alt="s" className="svgImg" />
      <input
        type="password"
        placeholder="Password"
        name="password"
        {...register("password",{ required: true, minLength: 2 ,maxLength : 18 })}
      />
    </div>
    {errors.password && errors.password.type === 'required' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Vui lòng nhập password</span>}
            {errors.password && errors.password.type === 'minLength' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Mật khẩu phải lớn hơn 2 ký tự</span>}
            {errors.password && errors.password.type === 'maxLength' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Mật khẩu phải bé hơn 18 ký tự</span>}

    {/* Input Avatar */}
    <div id="registerImage">
      <img alt="Avatar Preview" src={avatarPreview} />
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={registerDataChange}
        // {...register("password",{ required: true, minLength: 2 ,maxLength : 18 })}
      />
    </div>
    {/* {state && !image && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>vui lòng chọn avatar</span>} */}

    {/* Submit */}
    <input type="submit" value="Register" className="signUpBtn" />
  </form>
  )
}
