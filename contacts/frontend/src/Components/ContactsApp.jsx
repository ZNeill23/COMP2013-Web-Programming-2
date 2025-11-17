import { useState, useEffect } from "react";
import axios from "axios";
import ContactsCardContainer from "./ContactsCardContainer";
import ContactForm from "./ContactForm";

export default function ContactsApp() {
  // States
  const [contactsData, setContactsData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });
  const [postResponse, setPostResponse] = useState("");

  // useEffect
  useEffect(() => {
    handleContactsDB();
  }, [postResponse]);

  // Handlers
  // GET data from DB handler
  const handleContactsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contacts");
      setContactsData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle the submission of data
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/contacts", formData)
        .then((response) => setPostResponse(response.data.message))
        .then(() =>
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            image: "",
          })
        );
      handleContactsDB();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle the onChange event for the form
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  // Handle to delete one contact by id
  const handleOnDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/contacts/${id}`
      );
      setPostResponse(response.data.message);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle to edit one contact by id
  const handleOnEdit = async (id) => {
    try {
      const contactToEdit = await axios.get(
        `http://localhost:3000/contacts/${id}`
      );
      setFormData({
        name: contactToEdit.data.name,
        email: contactToEdit.data.contact.email,
        phone: contactToEdit.data.contact.phone,
        address: contactToEdit.data.contact.address,
        image: contactToEdit.data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Render
  return (
    <div>
      <ContactForm
        name={formData.name}
        email={formData.email}
        phone={formData.phone}
        address={formData.address}
        image={formData.image}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
      />
      <p style={{ color: "green" }}>{postResponse}</p>
      <ContactsCardContainer
        contacts={contactsData}
        handleOnDelete={handleOnDelete}
        handleOnEdit={handleOnEdit}
      />
    </div>
  );
}
