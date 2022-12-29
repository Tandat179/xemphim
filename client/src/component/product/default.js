import React, { useEffect, useState, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import LoadingModal from "../Loading/loading";
import { ProductContext } from "../../context/product/ProductContext";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { CartContext } from "../../context/cart/CartContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/auth/AuthContext";
import { v4 } from "uuid";

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

  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  let body;

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
    const timer = setTimeout(async () => {  
      await getOneProduct(id);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [id]);

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
        <div className="ProductDetails">
          <div>
            {/*  Carousel  */}
            <Carousel variant="dark" controls={false}>
              {product.images.map((item) => (
                <Carousel.Item key={v4()}>
                  <img alt="img" src={item.url} className="CarouselImage" />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div>
            {/* Product of One Item  */}
            <div className="detailsBlock-1">
              {/* Name Item */}
              <h2>{product.name}</h2>
              {/* <p>Product Film # {product._id}</p> */}
            </div>
            {/* Rate */}
            <div className="detailsBlock-2">
              <ReactStars {...options} />

              {/* How many Review  */}
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>

            <div className="detailsBlock-3">
              {/* Product Price One Item */}
              <h1>{`${product.price}`} VNĐ</h1>

              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  {/* Button Decrease */}
                  <button onClick={decreaseQuantity}>-</button>
                  <span>{quantity}</span>

                  {/* Button Increase */}
                  <button onClick={increaseQuantity}>+</button>
                </div>

                {/* Button Add to Cart  */}
                <button
                  disabled={product.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>

              {/* Status Item */}

              {/* If Stock of Item <= 0  => Out of Stock = Red  : >=1 Green */}
              <p>
                Status : &nbsp;
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            {/* Decription of Item */}
            <div className="detailsBlock-4">
              Description : <p>{product.content}</p>
            </div>

            {/* Check Authencation if User wanna Review */}
            {isAuthenticated ? (
              //if user authencated.
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            ) : (
              //if user Don't authencated.
              <button className="submitReview" onClick={submitReviewToggle}>
                Login
              </button>
            )}
          </div>
        </div>

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
        </div>

        {/* Review */}
        <h3 className="reviewsHeading">REVIEWS</h3>
        <Modal
          aria-labelledby="simple-dialog-title"
          show={open}
          onClose={submitReviewToggle}
        >
          {" "}
          {/* Submit Review */}
          <Modal.Title className="submitTitle">Submit Review</Modal.Title>
          <Modal.Body className="submitDialog">
            {/* Rating */}
            <ReactStars
              onChange={(e) => setRating(e)}
              value={rating}
              precision={0.5}
              isHalf={true}
              size={30}
            />

            {/* Textfield of Review by User */}
            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </Modal.Body>
          {/* Footer */}
          <Modal.Footer>
            {/* Button Cancel */}
            <Button onClick={submitReviewToggle} variant="secondary">
              Cancel
            </Button>

            {/* Button Submit */}
            <Button onClick={reviewSubmitHandler} variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Cart */}
        <Modal
          aria-labelledby="simple-dialog-title"
          show={openCartModel}
          onClose={cartReviewToggle}
        >
          {" "}
          {/* Add to Cart  */}
          <Modal.Title className="submitTitle">Add to Cart Success</Modal.Title>
          <Modal.Body className="submitDialog">
            <span className="submitDialogTextArea">
              {/* Product Name : '' */}
              <p>Product Name: {product.name || ""}</p>
              {/* Quantity */}
              <p>Quantity: {quantity}</p>
              {/* Total Price of Item */}
              <p>Price: {product.price * quantity || 0}</p>
            </span>
          </Modal.Body>
          <Modal.Footer>
            {/* Cancel */}
            <Button onClick={cartReviewToggle} variant="secondary">
              Cancel
            </Button>
            {/* To Cart After User Submit Quantity or something ? User Submit Or Cancel To Cart */}
            <Button onClick={cartSubmitHandler} variant="primary">
              Go to Cart
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Review */}
        {/* Show Review of Item || " " */}
        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {/* Render Review by Map from Array */}
            {product.reviews &&
              product.reviews.map((review) => (
                // Card Review Form with Id and Content Review
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          // If don't have Review, Server Respone to Client "No review Yet"
          <p className="noReviews">No Reviews Yet</p>
        )}
      </>
    );
  }

  return <>{body}</>;
};

export default ProductDetails;
