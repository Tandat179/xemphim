import "./Search.css";
import React, { useState, Fragment } from "react";

const Search = ({ searchHandle }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <Fragment>
      <form
        className="searchBox"
        onSubmit={(e) => {
          searchHandle(keyword);
        }}
      > 
          {/* Input Search */}
          <input
            type="text"
            placeholder="Search a Product ..."
            // SetKeyword
            onChange={(e) => setKeyword(e.target.value)}
          />
          {/* Submit */}
          <input type="submit" value="Search" />

      </form>
    </Fragment>
  );
};

export default Search;
