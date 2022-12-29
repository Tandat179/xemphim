import React, { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ProductContext } from "../../context/product/ProductContext";
import AccountTreeIcon from "../../assets/bezier2.svg";
import DescriptionIcon from "../../assets/card-heading.svg";
import StorageIcon from "../../assets/bag-heart.svg";
import SpellcheckIcon from "../../assets/wordpress.svg";
import AttachMoneyIcon from "../../assets/cash.svg";
import LoadingModel from "../Loading/loading";
import { CATEGORIES } from "../../consts/category";
import { COUNTRY } from "../../consts/country";

import SideBar from "./SideBar";

const UpdateProduct = () => {
  const {
    productState: { product },
    getOneProduct,
    updateProduct,
  } = useContext(ProductContext);
  const navigate = useNavigate();
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { productId } = useParams();

  const [formUpdate, setFormUpdate] = useState({
    name: product.name || "",
    price: product.price || "",
    content: product.content || "",
    category: product.category || "",
    stock: product.stock || "",
    images: product.images || [],
    isUpdateImages: false,
    ispremium: product.ispremium || false,
    link_embed: product.link_embed || "",
    time: product.time || "",
    quality: product.quality || "",
    lang: product.lang || "",
    year: product.year || 2012,
    country: product.country || "",
    actor: product.actor || " ",
    director: product.director || " ",
  });
  const handleOnChangeUpdate = (e) =>
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });

  useEffect(() => {
    const timer = setTimeout(() => {
      getOneProduct(productId);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [productId]);

  useEffect(() => {
    setFormUpdate({
      name: product.name || "",
      price: product.price || "",
      content: product.content || "",
      category: product.category || "",
      stock: product.stock || 0,
      images: product.images || [],
      ispremium: product.ispremium || "",
      link_embed: product.link_embed || "",
      time: product.time || "",
      quality: product.quality || "",
      lang: product.lang || "",
      year: product.year || 2012,
      country: product.country || "",
      actor: product.actor || " ",
      director: product.director || " ",
    });
    setOldImages(product.images || []);
  }, [getOneProduct]);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    loadingShow();
    updateProduct(formUpdate, productId);
    navigate("/admin/products", { replace: true });
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setFormUpdate({ ...formUpdate, images: [], isUpdateImages: true });
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setFormUpdate((old) => {
            return {
              ...old,
              images: [...old.images, reader.result],
            };
          });
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>
            {/* Name */}

            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Name"
                required
                value={formUpdate.name || " "}
                onChange={handleOnChangeUpdate}
                name="name"
              />
            </div>

            {/* Source */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Link"
                required
                value={formUpdate.link_embed || " "}
                onChange={handleOnChangeUpdate}
                name="link_embed"
              />
            </div>

            {/* Time */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Product Time"
                required
                value={formUpdate.time || " "}
                onChange={handleOnChangeUpdate}
                name="time"
              />
            </div>

            {/* Price */}
            <div>
              <img src={AttachMoneyIcon} alt="s" className="svgImg" />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={handleOnChangeUpdate}
                value={formUpdate.price || ""}
                name="price"
              />
            </div>

            {/* Quality */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Product Quality"
                required
                value={formUpdate.quality || " "}
                onChange={handleOnChangeUpdate}
                name="quality"
              />
            </div>

            {/* Category */}
            {/* <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />
              <select
                name="category"
                value={formUpdate.category || ""}
                onChange={handleOnChangeUpdate}
              >
                <option value="">Choose Category</option>
                {CATEGORIES.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Language */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <select
                name="lang"
                value={formUpdate.lang || ""}
                onChange={handleOnChangeUpdate}
              >
                <option value="Vietsubs ">VietSubs</option>
                <option value="Thuyết Minh">Thuyết Minh</option>
              </select>
            </div>

            {/* Year */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="number"
                placeholder="Product Year"
                required
                value={formUpdate.year || " "}
                onChange={handleOnChangeUpdate}
                name="year"
              />
            </div>

            {/* Content */}
            <div>
              <img src={DescriptionIcon} alt="s" className="svgImg" />

              <textarea
                placeholder="Product Description"
                value={formUpdate.content || ""}
                onChange={handleOnChangeUpdate}
                cols="30"
                rows="1"
                name="content"
              ></textarea>
            </div>

            {/* Country */}
            <div>
              <select
                name="country"
                value={formUpdate.country || ""}
                onChange={handleOnChangeUpdate}
              >
                <option value="">{product.country}</option>
                {COUNTRY.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Actor */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Product Actor"
                required
                value={formUpdate.actor || " "}
                onChange={handleOnChangeUpdate}
                name="actor"
              />
            </div>

            {/* Director */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Product Director"
                required
                value={formUpdate.director || " "}
                onChange={handleOnChangeUpdate}
                name="director"
              />
            </div>

            {/* Category */}
            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />
              <select
                name="category"
                value={formUpdate.category || ""}
                onChange={handleOnChangeUpdate}
              >
                <option value="">Choose Category</option>
                {CATEGORIES.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            {/* Premium */}
            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />
              <select
                name="ispremium"
                value={formUpdate.ispremium || ""}
                onChange={handleOnChangeUpdate}
              >
                <option value="1">true</option>
                <option value="0">false</option>
              </select>
            </div>

            {/* Stock */}
            <div>
              <img src={StorageIcon} alt="s" className="svgImg" />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={handleOnChangeUpdate}
                value={formUpdate.stock}
                name="stock"
              />
            </div>

            {/* Image */}
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button id="createProductBtn" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
