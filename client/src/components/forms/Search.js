import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
// import { fade, makeStyles } from "@material-ui/core/styles";
// import InputBase from "@material-ui/core/InputBase";
// import SearchIcon from "@material-ui/icons/Search";

// const useStyles = makeStyles((theme) => ({
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();
  // const classes = useStyles();

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
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      {/* <div className={classes.search}>
         <div className={classes.searchIcon}>
           <SearchIcon />
         </div>
         <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div> */}
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control"
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
