import React, { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BannerContext } from "../../context/banner/BannerContext";
import AccountTreeIcon from "../../assets/bezier2.svg";
import DescriptionIcon from "../../assets/card-heading.svg";
import StorageIcon from "../../assets/bag-heart.svg";
import SpellcheckIcon from "../../assets/wordpress.svg";
import AttachMoneyIcon from "../../assets/cash.svg";
import LoadingModel from "../Loading/loading";
import { CATEGORIES } from "../../consts/category";
import { COUNTRY } from "../../consts/country";

import SideBar from "./SideBar";

const UpdateBanner = () => {
  const {
    bannerState: { banner },
    getOneBanner,
    updateBanner,
  } = useContext(BannerContext);
  const navigate = useNavigate();
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { bannerId } = useParams();

  const [formUpdate, setFormUpdate] = useState({
    name: banner.name || "",
    price: banner.price || "",
    content: banner.content || "",
    category: banner.category || "",
    stock: banner.stock || "",
    images: banner.images || [],
    isUpdateImages: false,
    ispremium: banner.ispremium || false,
    link_embed: banner.link_embed || "",
    time: banner.time || "",
    quality: banner.quality || "",
    lang: banner.lang || "",
    year: banner.year || 2012,
    country: banner.country || "",
    actor: banner.actor || " ",
    director: banner.director || " ",
  });
  const handleOnChangeUpdate = (e) =>
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });

  useEffect(() => {
    const timer = setTimeout(() => {
      getOneBanner(bannerId);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [bannerId]);

  useEffect(() => {
    setFormUpdate({
      name: banner.name || "",
      price: banner.price || "",
      content: banner.content || "",
      category: banner.category || "",
      stock: banner.stock || 0,
      images: banner.images || [],
      ispremium: banner.ispremium || "",
      link_embed: banner.link_embed || "",
      time: banner.time || "",
      quality: banner.quality || "",
      lang: banner.lang || "",
      year: banner.year || 2012,
      country: banner.country || "",
      actor: banner.actor || " ",
      director: banner.director || " ",
    });
    setOldImages(banner.images || []);
  }, [getOneBanner]);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };
  const updateBannerSubmitHandler = (e) => {
    e.preventDefault();
    loadingShow();
    updateBanner(formUpdate, bannerId);
    navigate("/admin/banners", { replace: true });
  };

  const updateBannerImagesChange = (e) => {
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
            onSubmit={updateBannerSubmitHandler}
          >
            <h1>Update Banner</h1>
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
                placeholder="Banner Time"
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
                placeholder="Banner Quality"
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
                placeholder="Banner Year"
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
                placeholder="Banner Description"
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
                <option value="">{banner.country}</option>
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
                placeholder="Banner Actor"
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
                placeholder="Banner Director"
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
            <div id="createBannerFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateBannerImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Banner Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Banner Preview" />
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

export default UpdateBanner;
