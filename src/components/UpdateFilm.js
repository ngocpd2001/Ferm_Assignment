import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { object, string, bool, number } from "yup";
import styles from "./style.module.css";
import axios from "axios";
import { storeImageToFireBase } from "../utils/storeImageToFirebase";
import { ToastContainer, toast } from "react-toastify";
function UpdateFilm({ filmId, setFilmId }) {
  const [users, setUsers] = useState({
    // title: "",
    year: "",
    name: "",
    price: "",
    nation: "",
    rating: "",
    desc: "",
    clip: "",
    bestseller: false,
    status: "save",
  });
  const [imageFront, setImageFront] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAccountInfo = async () => {
      axios({
        method: "GET",
        url: `https://65433c2901b5e279de200b71.mockapi.io/db/${filmId}`,
      })
        .then((res) => {
          setUsers({ ...res.data, status: "update" });
          setImageFront(res.data.image);
        })
        .catch((err) => {});
    };
    if (filmId) getAccountInfo();
    // eslint-disable-next-line
  }, []);
  useEffect(
    () => {
      const uploadImage = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, imageUrl, message } = await storeImageToFireBase(
          selectedFile
        );
        if (isSuccess) {
          setImageFront(imageUrl);
          setIsLoading(false);
          return imageUrl;
        } else {
          console.log(message);
        }
        setIsLoading(false);
      };
      uploadImage();
    },
    // eslint-disable-next-line
    [selectedFile]
  );
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = (values, formikHelpers) => {
    alert(JSON.stringify(values));
    // if (values.status === "save") {
    //   axios({
    //     method: "POST",
    //     url: "https://65433c2901b5e279de200b71.mockapi.io/db",
    //     data: { ...values, image: imageFront },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       setImageFront(null);
    //       toast("Wow so easy!");
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // } else
    if (values.status === "update") {
      axios({
        method: "PUT",
        url: `https://65433c2901b5e279de200b71.mockapi.io/db/${filmId}`,
        data:
          imageFront !== null
            ? { ...values, image: imageFront }
            : { ...values },
      })
        .then((res) => {
          console.log(res);
          setImageFront(null);
          setFilmId(null);
          toast("Wow so easy!");
        })
        .catch((err) => {
          console.error(err);
        });
    }
    formikHelpers.resetForm();
    setUsers({
      // title: "",
      year: "",
      name: "",
      price: "",
      nation: "",
      rating: "",
      desc: "",
      clip: "",
      bestseller: false,
      status: "save",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.register} style={{ marginTop: "20px" }}>
        <div className={styles.formRegisterEmail}>
          <div className={styles.title}>
            <h1>Update Film</h1>
          </div>
          <div className="MaterialForm">
            {imageFront && (
              <img
                className="profile_card"
                src={imageFront}
                alt=""
                style={{ height: "300px" }}
              />
            )}
            <div style={{ paddingBottom: "15px" }}>
              {isLoading ? (
                <button
                  type="button"
                  disabled
                  style={{
                    opacity: ".4",
                    width: "30%",
                  }}
                  className="chooseFileButton btn btn-primary btn--m"
                >
                  loading..
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="chooseFileButton btn btn-primary btn--m"
                    style={{ width: "30%" }}
                  >
                    Chọn hình
                  </button>
                  <input
                    id="upload"
                    type="file"
                    name="profileImageUrl"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="btn"
                    style={{
                      opacity: 0,
                      zIndex: 1,
                      left: 0,
                      width: "100%",
                      position: "absolute",
                    }}
                  />
                </>
              )}
            </div>
            <Formik
              initialValues={users}
              enableReinitialize
              validationSchema={object({
                name: string()
                  .required("Please enter name")
                  .min(2, "Name too short"),
                year: number()
                  .integer()
                  .required("Please enter year")
                  .min(2, "Name too short"),
                price: number()
                  .integer()
                  .required("Please enter price")
                  .min(2, "cost too short"),
                nation: string().required("Please enter Nation"),
                rating: string().required("Please enter rating"),
                desc: string().required("Please enter descriptiono"),
                clip: string().url().required("Please enter URL of clip"),
                bestseller: bool().oneOf(
                  [true],
                  "You need to accept the bestseller"
                ),
                status: string(),
              })}
              onSubmit={(values, formikHelpers) => {
                handleSubmit(values, formikHelpers);
              }}
            >
              {({ errors, isValid, touched, dirty }) => (
                <Form>
                  <Field
                    name="name"
                    type="name"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Name"
                    fullWidth
                    style={{ marginBottom: "20px" }}
                    error={Boolean(errors.name) && Boolean(touched.name)}
                    helperText={Boolean(touched.name) && errors.name}
                  />
                  <Field
                    name="price"
                    type="name"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Price"
                    fullWidth
                    style={{ marginBottom: "20px" }}
                    error={Boolean(errors.price) && Boolean(touched.price)}
                    helperText={Boolean(touched.price) && errors.price}
                  />
                  <Field
                    name="year"
                    type="name"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Year"
                    fullWidth
                    style={{ marginBottom: "20px" }}
                    error={Boolean(errors.year) && Boolean(touched.year)}
                    helperText={Boolean(touched.year) && errors.year}
                  />
                  <Field
                    name="nation"
                    type="name"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Nation"
                    fullWidth
                    style={{ marginBottom: "20px" }}
                    error={Boolean(errors.nation) && Boolean(touched.nation)}
                    helperText={Boolean(touched.nation) && errors.nation}
                  />
                  <Field
                    name="rating"
                    type="name"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Rating"
                    fullWidth
                    style={{ marginBottom: "20px" }}
                    error={Boolean(errors.rating) && Boolean(touched.rating)}
                    helperText={Boolean(touched.rating) && errors.rating}
                  />
                  <Field
                    name="desc"
                    type="name"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Description"
                    fullWidth
                    style={{ marginBottom: "20px" }}
                    error={Boolean(errors.desc) && Boolean(touched.desc)}
                    helperText={Boolean(touched.desc) && errors.desc}
                  />
                  <Field
                    name="clip"
                    type="name"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Clip URL"
                    fullWidth
                    style={{ marginBottom: "20px" }}
                    error={Boolean(errors.clip) && Boolean(touched.clip)}
                    helperText={Boolean(touched.clip) && errors.clip}
                  />

                  <div className={styles.recap}>
                    <Field
                      name="bestseller"
                      type="checkbox"
                      color="primary"
                      style={{
                        zIndex: "10",
                        pointerEvents: "all",
                        width: "18px",
                        height: "23px",
                      }}
                    />
                    <span>By tick the box I agree </span>
                  </div>
                  <div style={{ display: "flex", color: " #f44336" }}>
                    {errors.bestseller && <span>{errors.bestseller}</span>}
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!isValid || !dirty}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default UpdateFilm;
