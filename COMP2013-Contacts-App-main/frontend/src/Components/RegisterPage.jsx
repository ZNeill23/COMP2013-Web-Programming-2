import FormComponent from "./FormComponent";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        ...formData,
      });
      setPostResponse(response.data.message);
    } catch (error) {
      setPostResponse(error.response.data.message || "Cannot Add Username");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    setFormData({ username: "", password: "" });
  };

  return (
    <div>
      <FormComponent
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        currentPage="Register"
        nextPage=""
        postResponse={postResponse}
      />
    </div>
  );
}
