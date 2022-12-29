import React, { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./newProduct.css";
import { ProduserContext } from "../../context/produser/ProduserContext";

import AccountTreeIcon from "../../assets/bezier2.svg";
import DescriptionIcon from "../../assets/card-heading.svg";
import StorageIcon from "../../assets/bag-heart.svg";
import SpellcheckIcon from "../../assets/wordpress.svg";
import AttachMoneyIcon from "../../assets/cash.svg";
import { CATEGORIES } from "../../consts/category";
import { COUNTRY } from "../../consts/country";

import SideBar from "../Admin/SideBar";

const NewProduser = () => {
  //Get creteProduser method from Produser C0ntext
  const { createProduser } = useContext(ProduserContext);
  const [imagesPreview, setImagesPreview] = useState([]);
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const [formCreate, setFormCreate] = useState({
    name: "",
    // price: "",
    // description: "",
    // category: "",
    // stock: "",
    content: "",
    time: "",
    quality: "",
    lang: "",
    year: "",
    country: "",
    actor: "",
    director: "",
    ispremium: "",
    // ratings: "",
    images: [],
    link_embed: "",
    poster_url: "",
    category: "",
  });

  const handleOnChangeCreate = (e) =>
    setFormCreate({ ...formCreate, [e.target.name]: e.target.value });

  //   useEffect(() => {
  //     if (error) {
  //       alert.error(error);
  //       dispatch(clearErrors());
  //     }

  //     if (success) {
  //       alert.success("Product Created Successfully");
  //       history.push("/admin/dashboard");
  //       dispatch({ type: NEW_PRODUCT_RESET });
  //     }
  //   }, [dispatch, alert, error, history, success]);

  const createProduserSubmitHandler = (e) => {
    e.preventDefault();
    loadingShow();
    createProduser(formCreate);
    navigate("/produser/list", { replace: true });
  };

  const createProduserImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setFormCreate({ ...formCreate, images: [] });
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setFormCreate((old) => {
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProduserSubmitHandler}
          >
            <h1>Create Produsers</h1>
            {/* name */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />

              <input
                type="text"
                placeholder="Produser Name"
                required
                value={formCreate.name}
                onChange={handleOnChangeCreate}
                name="name"
              />
            </div>

            {/* Content */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />

              <input
                type="text"
                placeholder="Content"
                required
                value={formCreate.content}
                onChange={handleOnChangeCreate}
                name="content"
              />
            </div>

            {/* Time */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />

              <input
                type="text"
                placeholder="Time"
                required
                value={formCreate.time}
                onChange={handleOnChangeCreate}
                name="time"
              />
            </div>

            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />
              <select
                name="quality"
                value={formCreate.quality || ""}
                onChange={handleOnChangeCreate}
              >
                <option value="HD">HD</option>
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
              </select>
            </div>

            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />
              <select
                name="lang"
                value={formCreate.lang || ""}
                onChange={handleOnChangeCreate}
              >
                <option value="Thuyết Minh">Thuyết Minh</option>
                <option value="VietSub">VietSub</option>
              </select>
            </div>

            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />

              <input
                type="Number"
                placeholder="Year"
                required
                value={formCreate.year}
                onChange={handleOnChangeCreate}
                name="year"
              />
            </div>

            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />

              <select onChange={handleOnChangeCreate} name="country">
                <option value="">Choose Country</option>
                {COUNTRY.map((coun) => (
                  <option key={coun} value={coun}>
                    {coun}
                  </option>
                ))}
              </select>
            </div>

            {/* Actor */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Actor"
                required
                value={formCreate.actor}
                onChange={handleOnChangeCreate}
                name="actor"
              />
            </div>

            {/* Director  */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Director"
                required
                value={formCreate.director}
                onChange={handleOnChangeCreate}
                name="director"
              />
            </div>

            {/* link_embed */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Link_Embed"
                required
                value={formCreate.link_embed}
                onChange={handleOnChangeCreate}
                name="link_embed"
              />
            </div>

            {/* poster_url */}
            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Poster_url"
                required
                value={formCreate.poster_url}
                onChange={handleOnChangeCreate}
                name="poster_url"
              />
            </div>

            {/* Premium */}
            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />
              <select
                name="ispremium"
                value={formCreate.ispremium || ""}
                onChange={handleOnChangeCreate}
              >
                <option value="1">true</option>
                <option value="0">false</option>
              </select>
            </div>

            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />

              <select onChange={handleOnChangeCreate} name="category">
                <option value="">Choose Category</option>
                {CATEGORIES.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProduserImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button id="createProduserBtn" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduser;
