import React, { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ProduserContext } from "../../context/produser/ProduserContext";
import AccountTreeIcon from "../../assets/bezier2.svg";
import DescriptionIcon from "../../assets/card-heading.svg";
import StorageIcon from "../../assets/bag-heart.svg";
import SpellcheckIcon from "../../assets/wordpress.svg";
import AttachMoneyIcon from "../../assets/cash.svg";
import LoadingModel from "../Loading/loading";
import { CATEGORIES } from "../../consts/category";
import { COUNTRY } from "../../consts/country";

import SideBar from "../Admin/SideBar";

const UpdateProduserad = () => {
  const {
    produserState: { produser },
    getOneProduser,
    updateProduserad,
  } = useContext(ProduserContext);
  const navigate = useNavigate();
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { produserId } = useParams();

  const [formUpdate, setFormUpdate] = useState({
    name: produser.name || "",
    // price: produser.price || "",
    content: produser.content || "",
    category: produser.category || "",
    stock: produser.stock || "",
    images: produser.images || [],
    isUpdateImages: false,
    ispremium: produser.ispremium || false,
    link_embed: produser.link_embed || "",
    time: produser.time || "",
    quality: produser.quality || "",
    lang: produser.lang || "",
    year: produser.year || 2012,
    country: produser.country || "",
    actor: produser.actor || " ",
    director: produser.director || " ",
    approve: produser.approve || " ",
  });
  const handleOnChangeUpdate = (e) =>
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });

  useEffect(() => {
    const timer = setTimeout(() => {
      getOneProduser(produserId);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [produserId]);

  useEffect(() => {
    setFormUpdate({
      name: produser.name || "",
      // price: produser.price || "",
      content: produser.content || "",
      category: produser.category || "",
      stock: produser.stock || 0,
      images: produser.images || [],
      ispremium: produser.ispremium || "",
      link_embed: produser.link_embed || "",
      time: produser.time || "",
      quality: produser.quality || "",
      lang: produser.lang || "",
      year: produser.year || 2012,
      country: produser.country || "",
      actor: produser.actor || " ",
      director: produser.director || " ",
      approve: produser.approve || " ",
    });
    setOldImages(produser.images || []);
  }, [getOneProduser]);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };
  const updateProduserSubmitHandler = (e) => {
    e.preventDefault();
    loadingShow();
    updateProduserad(formUpdate, produserId);
    navigate("/admin/produser/list", { replace: true });
  };

  const updateProduserImagesChange = (e) => {
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
            onSubmit={updateProduserSubmitHandler}
          >
            <h1>Update Produser</h1>
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
                placeholder="Produser Time"
                required
                value={formUpdate.time || " "}
                onChange={handleOnChangeUpdate}
                name="time"
              />
            </div>

            {/* Price */}
            {/* <div>
              <img src={AttachMoneyIcon} alt="s" className="svgImg" />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={handleOnChangeUpdate}
                value={formUpdate.price || ""}
                name="price"
              />
            </div> */}

            {/* Quality */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Produser Quality"
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

            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <select
                name="approve"
                value={formUpdate.approve || ""}
                onChange={handleOnChangeUpdate}
              >
                <option value="1">Approve</option>
                <option value="0">Not Reached</option>
              </select>
            </div>

            {/* Year */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="number"
                placeholder="Produser Year"
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
                placeholder="Produser Description"
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
                placeholder="Quốc Gia"
                onChange={handleOnChangeUpdate}
              >
                <option>Quốc Gia</option>
                <option value="">{produser.country}</option>
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
                placeholder="Produser Actor"
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
                placeholder="Produser Director"
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
            {/* <div>
              <img src={StorageIcon} alt="s" className="svgImg" />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={handleOnChangeUpdate}
                value={formUpdate.stock}
                name="stock"
              />
            </div> */}

            {/* Image */}
            <div id="createProduserFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProduserImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Produser Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Produser Preview" />
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

export default UpdateProduserad;
