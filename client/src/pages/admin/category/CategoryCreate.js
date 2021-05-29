import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { Row, Col } from "reactstrap";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const CategoryCreate = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <div className="contact">
      {loading ? (
        <h4 className="text-danger">Loading..</h4>
      ) : (
        <h4>Create category</h4>
      )}
      <hr />
      <Row>
        <Col xs="12" md="12">
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
        </Col>
        <Col xs="12" md="6">
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
        </Col>
        <Col xs="12" md="3">
          <div className={classes.root}>
            {categories.filter(searched(keyword)).map((c) => (
              <List dense="true" key={c._id}>
                <ListItem>
                  <ListItemText
                    primary={c.name}
                    secondary={secondary ? "Secondary text" : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => history.push(`/admin/category/${c.slug}`)}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemove(c.slug)}
                    >
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryCreate;
