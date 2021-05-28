import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { Row, Col } from "reactstrap";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <Row>
        <Col xs="12" md="2">
          <input
            type="file"
            multiple
            hidden
            id="icon-button-file"
            accept="images/*"
            onChange={fileUploadAndResize}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
              size="large"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Col>
        <Col xs="12" md="10">
          <div className="p-2">
            {values.images &&
              values.images.map((image) => (
                <Badge
                  count="X"
                  key={image.public_id}
                  onClick={() => handleImageRemove(image.public_id)}
                  style={{ cursor: "pointer" }}
                >
                  <Avatar
                    src={image.url}
                    size={100}
                    shape="square"
                    className="ml-3"
                  />
                </Badge>
              ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FileUpload;
