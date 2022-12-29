import React, { useContext, useEffect, useState } from 'react'
import MyButton from "../button/MyButton";
import { AiOutlineHeart,AiFillHeart } from 'react-icons/ai';
import { IoMdNotificationsOutline ,IoMdNotifications} from 'react-icons/io';
import axiosClient from '../../api/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../context/auth/AuthContext';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { ProductContext } from '../../context/product/ProductContext';

export default function ListButtonContact({id}) {
  const {
    authState: { isAuthenticated, user },
    logoutUserNow,
  } = useContext(AuthContext);
  const {
    productState: { product },

  } = useContext(ProductContext);
  const [status,setStatus] = useState(false)
  const [isFavorite,setIsFavorite] = useState(false)
  const [loadingButton,setLoadingButton] = useState(false) // tránh click like nhiều lần để phá web
    const fetchLike = async() => {
        const res = await axiosClient.get(`/view/fetchLike/${id}`)
        return res.data
    }
    const fetchSub = async() => {
      const res  = await axiosClient.get(`/favorite/fetchCountSub/${id}`)
      return res.data
    }
    const fetchFavorite = async() => {
      if (localStorage["auth-token"]) {
        setAuthToken(localStorage["auth-token"]);
      }

        try {
          const config = {
            headers: { "Content-Type": "application/json" },
          };
    
          const res = await axios.get(`http://localhost:4000/favorite/myFavorites`,config)
          console.log(res);
          const is = res.data.favorites[0].favoriteItems.some(e => e.product === id)
          setIsFavorite(is)
        } catch (error) {
          console.log(error);
        }

    }
    useEffect(() => {
      const localLike = JSON.parse(localStorage.getItem("listLike")) || []; // lấy list id đã like ở local
      const IsLike = localLike.some(e => e === id) // check xem có id trong đó ko
      setStatus(IsLike) // set status để biết đã like hay chưa
      fetchFavorite()
    },[id])
    const {data,isLoading ,refetch} = useQuery([id],fetchLike)
    const {data : dataSub,isLoading : isLoadingSub ,refetch : refetchSub} = useQuery([`/favorite/fetchCountSub/${id}`],fetchSub)
    console.log(dataSub);
    const increaseLike = async() => {
      setLoadingButton(true)

      if(!status){ // nếu chưa like thì tăng
        const res = await axiosClient.post(`/view/increaseLike/${id}?status=tang`)
        const localLike = JSON.parse(localStorage.getItem("listLike")) || []; // thêm id phim vào local
        localStorage.setItem("listLike",JSON.stringify([...localLike,id]))
        refetch() // fetch lại số like
        setStatus(!status)
        setLoadingButton(false)
      }
      else{ // giảm
        const res = await axiosClient.post(`/view/increaseLike/${id}?status=giam`)
        const localLike = JSON.parse(localStorage.getItem("listLike")); // xoá id phim ở local
        console.log(localLike);
        localStorage.setItem("listLike",JSON.stringify(localLike.filter(e => e !== id))) 
        refetch()
        setStatus(!status)
        setLoadingButton(false)

      }
       
      }
      const handleFavirate = async() => {
        if(isAuthenticated){
          if (localStorage["auth-token"]) {
            setAuthToken(localStorage["auth-token"]);
          }
          const config = {
            headers: { "Content-Type": "application/json" },
          };
          if(!isFavorite){
              try {
                const newFavorite = {name : product.name,image : product.images[0].url , product : id}
                const res = await axios.post(`http://localhost:4000/favorite/subscribe?status=subscribe`,newFavorite,config)
                refetchSub()
                setIsFavorite(true)
              } catch (error) {
                console.log(error);
              }
          }
          else{
            try {
              const removeFavorite = {name : product.name,image : product.images[0].url , product : id}
              const res = await axios.post(`http://localhost:4000/favorite/subscribe?status=UnSubscribe`,removeFavorite,config)
              refetchSub()
              setIsFavorite(false)
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
  return (
    <div style={{display : 'flex' , gap : '20px' , padding: '20px 100px'}}>
    <MyButton disabled={loadingButton} onClick={increaseLike} style={{background : '#C4535E'}}>
       {!status ? <span><AiOutlineHeart/> Thích ({isLoading ? "Loading..." : data.CountLike})</span> : 
       <span><AiFillHeart color='red' size={20}/>Đã Thích ({isLoading ? "Loading..." : data.CountLike})</span>}
     </MyButton>
     <MyButton onClick={handleFavirate}  id={isAuthenticated ? "" : "props-basic"} style={{background : '#406F6A'}}>
      {isFavorite ? 
       <span><IoMdNotifications size={20}/>Đã Theo dõi ({isLoadingSub ? "Loading..." : dataSub.countSubscribe}) </span> :  <span><IoMdNotificationsOutline/> Theo dõi ({isLoadingSub ? "Loading..." : dataSub.countSubscribe})</span>}
     </MyButton>
     <Tooltip anchorId="props-basic" content="bạn phải đăng nhập" />
   </div>
  )
}
