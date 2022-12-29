import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { AuthContext } from "../../context/auth/AuthContext";

import LoadingModel from "../Loading/loading";

import MailOutlineIcon from "../../assets/mail.svg";
import LockOpenIcon from "../../assets/password.svg";
import FaceIcon from "../../assets/person-circle.svg";
import ImageCard from "../../assets/card-image.svg";
import { useForm } from "react-hook-form";

import "./Auth.css";
import Register from "./Register";

const Auth = () => {

  const navigate = useNavigate();

  const {
    authState: { message, isAuthenticated },
    loginUser,
    registerUser,
    setMessage,
  } = useContext(AuthContext);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(ImageCard);
  const [isLoading, setLoading] = useState(false);

  const loadingShow = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmitLogin = async(data) => {
    loadingShow();
    await loginUser(data);
  };

  //Register
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setFormRegister({ ...formRegister, avatar: reader.result });
        }
      };

      reader.readAsDataURL(e.target.files[0]);

      //Get catch value name from value.name from Form Register
    } else {
      setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    }
  };


  //Login
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, message]);


  // Get and catch value name from Form Login
  const handleOnChangeLogin = (e) =>
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });

  const submitLoginHandle = async (e) => {
    e.preventDefault();
    loadingShow();
    await loginUser(formLogin);
  };
console.log(errors);
  const registerSubmit = async (e) => {
    e.preventDefault();
    loadingShow();
    await registerUser(formRegister);
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      setMessage();
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      setMessage();
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      <LoadingModel show={isLoading} />
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>

            {/* Click change tab */}
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          {/* Login Form */}
          <form
            className="loginForm"
            ref={loginTab}
            onSubmit={handleSubmit(onSubmitLogin)}
          >

            {/* Response message from server */}
            <p style={{ color: "red", textAlign: "center" }}>{message}</p>


            {/* Email */}
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
            {/* Password */}
            <div className="loginPassword">
              <img src={LockOpenIcon} alt="s" className="svgImg" />
              <input
                type="password"
                placeholder="Password"
                // value={formLogin.password}
                name="password"
                {...register("password",{ required: true, minLength: 2 ,maxLength : 18 })}
                // onChange={handleOnChangeLogin}
              />
            </div>
            {errors.password && errors.password.type === 'required' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Vui lòng nhập password</span>}
            {errors.password && errors.password.type === 'minLength' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Mật khẩu phải lớn hơn 2 ký tự</span>}
            {errors.password && errors.password.type === 'maxLength' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Mật khẩu phải bé hơn 18 ký tự</span>}
            {/* Forget Password */}
            <Link to="/password/forgot">Forget Password ?</Link>

            {/* Button Submit */}
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          


          {/* <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={handleSubmit(registerSubmit)}
          >
            <p style={{ color: "red", textAlign: "center" }}>{message}</p>
            <div className="signUpName">
              <img src={FaceIcon} alt="s" className="svgImg" />

              <input
                type="text"
                placeholder="Name"
                required
                name="name"
               {...register("name",{required : true , maxLength : 20  , minLength : 2})}
              />
            </div>


            <div className="loginEmail">
              <img src={MailOutlineIcon} alt="s" className="svgImg" />
              <input
                placeholder="Email"
                name="email"
                {...register("emailRegister",{ pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i , required : true })}
                // value={formLogin.email}
                // onChange={handleOnChangeLogin}
              />
              
            </div>
            {errors.emailRegister && errors.emailRegister.type === 'required' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>Vui lòng nhập email</span>}
            { errors.emailRegister &&  errors.emailRegister.type === 'pattern' && <span style={{alignSelf : 'flex-start',color : 'red' ,fontSize : '12px'}}>email không đúng định dạng</span>}

            <div className="signUpPassword">
              <img src={LockOpenIcon} alt="s" className="svgImg" />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                onChange={registerDataChange}
                value={formRegister.password}
              />
            </div>


            <div id="registerImage">
              <img alt="Avatar Preview" src={avatarPreview} />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>

            <input type="submit" value="Register" className="signUpBtn" />
          </form> */}
          <Register registerUser={registerUser} loadingShow={loadingShow} registerTab={registerTab} message={message} />
        </div>
      </div>
    </>
  );
};

export default Auth;
