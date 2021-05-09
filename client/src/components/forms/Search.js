import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="form-inline ml-2 my-1 my-lg-0" onSubmit={handleSubmit}>
     
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control"
        placeholder="Search"
      />
    </form>
  );
};

export default Search;
