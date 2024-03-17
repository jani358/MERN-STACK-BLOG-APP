import { Box, Button, InputLabel, TextField, Typography } from "@mui/material"; // Material-UI components
import axios from "axios"; // Axios for making HTTP requests
import React, { useState } from "react"; // React hooks
import { useNavigate } from "react-router-dom"; // React Router hook
import { useStyles } from "./utils"; // Custom styles

// Custom styles for labels
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

// Component for adding a new blog post
const AddBlog = () => {
  const classes = useStyles(); // Custom styles
  const navigate = useNavigate(); // React Router navigation
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to send HTTP POST request to add a new blog
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs")); // Navigate to "/blogs" after successful submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form container */}
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)" // Border color
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc" // Box shadow
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          {/* Title */}
          <Typography
            className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>

          {/* Title input */}
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />

          {/* Description input */}
          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            className={classes.font}
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="auto"
            variant="outlined"
          />

          {/* Image URL input */}
          <InputLabel className={classes.font} sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="auto"
            variant="outlined"
          />

          {/* Submit button */}
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
