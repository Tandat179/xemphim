import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addQueryFetch } from "../../redux/pageStore";
import { OutlineButton } from "../button/Button";
import ListMovie from "../movie-list/ListMovie";
import ListMovieCustom from "../movie-list/ListMovieCustom";
import ListMovieMultiFilter from "../movie-list/ListMovieMultiFilter";
import "./home.css";

export default function CategoryMultiFilter({ title, filter }) {
  console.log(filter, "filter");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="section__header mb2">
      <h1>{title}</h1>
      <div className="section__header mb2">
        <OutlineButton
          onClick={() => {
            filter?.map((e) =>
              dispatch(addQueryFetch(`&${e.filter}=${e.value}`))
            );
            navigate("/products");
          }}
          className="small"
        >
          View more
        </OutlineButton>
      </div>
      <br></br>
      {filter && <ListMovieMultiFilter filter={filter} />}
      <div className="section__header mb2"></div>
      <br></br>
    </div>
  );
}
