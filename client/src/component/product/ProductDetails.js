import React, { useEffect, useState, useContext, useCallback } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import LoadingModal from "../Loading/loading";
import { ProductContext } from "../../context/product/ProductContext";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { CartContext } from "../../context/cart/CartContext";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/auth/AuthContext";
import "./product-detail.scss";
import Button from "../button/Button";
import axiosClient from "../../api/axiosClient";

import CategoryDetails from "../Home/CategoryDetails";

import ListButtonContact from "./ListButtonContact";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { addItemsToCart } = useContext(CartContext);
  let { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [openCartModel, setOpenCartModel] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    productState: { product },
    getOneProduct,
    createNewReviews,
  } = useContext(ProductContext);
  console.log(product);
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);
  let body;
  const fetchIncreaseView = useCallback(async () => {
    const res = await axiosClient.post(`/view/increaseView/${id}`);
  }, [id]);

  const ReviewReverse = () => {
    // Đảo ngược Reivew
    return product.reviews && product.reviews.sort(() => -1);
  };

  // Quantity of Stock
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  // Handler add to Cart
  // Add Item by id and Quantity
  const addToCartHandler = () => {
    addItemsToCart(id, quantity);
    openCartModel ? setOpenCartModel(false) : setOpenCartModel(true);
  };

  // Review
  const reviewSubmitHandler = () => {
    const myForm = {
      comment,
      rating,
      productId: product._id,
    };

    createNewReviews(myForm);
    setComment("");
    setRating(0);
    setOpen(false);
  };

  // Review Toggle Authencation.
  const submitReviewToggle = () => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
    open ? setOpen(false) : setOpen(true);
  };

  //Handler Submit Cart
  const cartSubmitHandler = () => {
    navigate("/cart", { replace: true });
  };

  const cartReviewToggle = () => {
    openCartModel ? setOpenCartModel(false) : setOpenCartModel(true);
  };

  // Await get Someone Item or Product
  useEffect(() => {
    // const timer = setTimeout(async () => {
    getOneProduct(id).then((res) => setLoading(false));
    fetchIncreaseView();
    // }, 1500);
    // return () => clearTimeout(timer);
  }, [id]);

  const getCategoryToFetch = (category) => {
    const newCategory = category.replaceAll(" ", "|");
    return newCategory;
  };
  getCategoryToFetch("hanh dong tam ly");
  if (isLoading) {
    body = <>{isLoading && <LoadingModal show={isLoading} />}</>;
  } else {
    const options = {
      size: 20,
      value: +product.ratings,
      edit: false,
      precision: 0.5,
    };
    body = (
      <>
        {product && (
          <>
            <div
              className="bannerdetail"
              style={{
                backgroundImage: `url(${product.poster_url})`,
              }}
            ></div>
          </>
        )}
        {/*  */}
        <div className="mb3 movie-content container">
          <div className="movie-content__poster">
            <div
              className="movie-content__poster__img"
              style={{
                backgroundImage: `url(${product.thumb_url})`,
              }}
            ></div>
          </div>

          <div className="movie-content__info">
            <h1 className="titledetail">{product.name}</h1>

            <div className="genres">
              <span className="genres__item">{product.category}</span>
            </div>

            <p className="overview">{product.content}</p>

            <div className="cast">
              <div className="section__header">
                <h5>Diễn Viên</h5>
              </div>
              <span>{product.actor}</span>
            </div>

            <div className="cast">
              <div className="section__header">
                <h5>Đạo Diễn</h5>
              </div>
              <span>{product.director}</span>
            </div>

            <div className="cast">
              <div className="section__header"></div>
              <span>
                <h5>Năm sản xuất:</h5> {product.year}
              </span>
            </div>
            {/* <ReactStars {...options} />
            <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span> */}
            {/* <Button
              disabled={product.Stock < 1 ? true : false}
              onClick={addToCartHandler}
            >
              ALove Movie
            </Button>

            <Button onClick={cartSubmitHandler} variant="primary">
              Go to Love List
            </Button> */}
          </div>
        </div>{" "}
        {isAuthenticated ? (
          <Button className="submitReview" onClick={submitReviewToggle}>
            Submit Review
          </Button>
        ) : (
          <Button className="submitReview" onClick={submitReviewToggle}>
            Login
          </Button>
        )}
        <div>
          <div
            style={{
              position: "relative",
              boxShadow: " 0 0 5px 2px #999",
              textAlign: "center",
            }}
          >
            <iframe
              border="red"
              width="100%"
              height="515"
              allowFullScreen={true}
              src={`${
                product.ispremium
                  ? user.rank === "premium"
                    ? product.link_embed
                    : ""
                  : product.link_embed
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; 
          clipboard-write; encrypted-media; 
          gyroscope; picture-in-picture"
            ></iframe>
            {product.ispremium && user.rank !== "premium" && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 10000,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <h2>Bạn phải trở thành Thành viên Premium mới xem được</h2>
                <Button onClick={() => navigate("/payment")}>
                  Đăng kí Premium{" "}
                </Button>
              </div>
            )}
          </div>
        </div>
        <ListButtonContact id={id} />
        <h3 className="reviewsHeading">REVIEWS</h3>
        <Modal
          aria-labelledby="simple-dialog-title"
          show={open}
          onClose={submitReviewToggle}
        >
          {" "}
          <Modal.Title className="submitTitle">Submit Review</Modal.Title>
          <Modal.Body className="submitDialog">
            <ReactStars
              onChange={(e) => setRating(e)}
              value={rating}
              precision={0.5}
              isHalf={true}
              size={30}
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={submitReviewToggle} variant="secondary">
              Cancel
            </Button>

            <Button onClick={reviewSubmitHandler} variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {ReviewReverse() && ReviewReverse()[0] ? (
          <div className="reviews">
            {ReviewReverse() &&
              ReviewReverse().map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
        {/* <ListContact /> */}
        hrhh
        <CategoryDetails
          filter={{
            filter: "category",
            value: getCategoryToFetch(product.category),
          }}
        />
        {/* <div className="ProductDetails">
          <div>
          

            <Carousel variant="dark" controls={false}>
              {product.images.map((item) => (
                <Carousel.Item>
                  <img alt="img" src={item.url} className="CarouselImage" />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />

              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>

            <div className="detailsBlock-3">
     
              <h1>{`${product.price}`} VNĐ</h1>

              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
            
                  <button onClick={decreaseQuantity}>-</button>
                  <span>{quantity}</span>
   
                  <button onClick={increaseQuantity}>+</button>
                </div>

                <button
                  disabled={product.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>

          

             
              <p>
                Status : &nbsp;
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description : <p>{product.content}</p>
            </div>


   
            {isAuthenticated ? (
       
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            ) : (
       
              <button className="submitReview" onClick={submitReviewToggle}>
                Login
              </button>
            )}
          </div>
        </div> */}
        {/* 
        <div>
          <iframe
            width="860"
            height="515"
            src={product.link_embed}
            title="YouTube video player"
            allow="accelerometer; autoplay; 
          clipboard-write; encrypted-media; 
          gyroscope; picture-in-picture"
          ></iframe>
        </div> */}
        {/* <h3 className="reviewsHeading">REVIEWS</h3> */}
        {/* <Modal
          aria-labelledby="simple-dialog-title"
          show={open}
          onClose={submitReviewToggle}
        >
          {" "}
          <Modal.Title className="submitTitle">Submit Review</Modal.Title>
          <Modal.Body className="submitDialog">

            <ReactStars
              onChange={(e) => setRating(e)}
              value={rating}
              precision={0.5}
              isHalf={true}
              size={30}
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={submitReviewToggle} variant="secondary">
              Cancel
            </Button>

            <Button onClick={reviewSubmitHandler} variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Modal> */}
        {/* <Modal
          aria-labelledby="simple-dialog-title"
          show={openCartModel}
          onClose={cartReviewToggle}
        >
          {" "}
          <Modal.Title className="submitTitle">Add to Cart Success</Modal.Title>
          <Modal.Body className="submitDialog">
            <span className="submitDialogTextArea">
              <p>Product Name: {product.name || ""}</p>

              <p>Quantity: {quantity}</p>

              <p>Price: {product.price * quantity || 0}</p>
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={cartReviewToggle} variant="secondary">
              Cancel
            </Button>

            <Button onClick={cartSubmitHandler} variant="primary">
              Go to Cart
            </Button>
          </Modal.Footer>
        </Modal> */}
        {/* {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )} */}
      </>
    );
  }

  return <>{body}</>;
};

export default ProductDetails;
