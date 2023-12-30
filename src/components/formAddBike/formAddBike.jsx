import React from "react";
import { Formik, Form, Field } from "formik";
import "./addBike.css";

export const FormAddBike = ({ newBike }) => {
  const handleSubmit = (
    { name, number, color, wheel, price, type, description },
    { resetForm }
  ) => {
    newBike({
      name: name,
      number: `${number}`,
      color: color,
      wheel: `${wheel}`,
      price: `${price}`,
      type: type,
      description: description,
    });
    resetForm();
  };

  const handleClear = (formik) => {
    formik.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        type: "",
        color: "",
        wheel: "",
        price: "",
        number: "",
        description: "",
      }}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="form-container">
          <Field
            className="input"
            type="text"
            name="name"
            minLength="5"
            maxLength="25"
            placeholder="Name"
            title="Name may contain only letters, apostrophe, dash and spaces."
            required
          />
          <Field
            className="input"
            type="text"
            name="type"
            minLength="5"
            maxLength="25"
            placeholder="Type"
            title="Type may contain only letters, apostrophe, dash and spaces."
            required
          />
          <Field
            className="input"
            type="text"
            name="color"
            minLength="3"
            maxLength="25"
            placeholder="Color"
            title="Color may contain only letters, apostrophe, dash and spaces."
            required
          />
          <Field
            className="input"
            type="number"
            name="wheel"
            min="10"
            max="28"
            minLength="2"
            placeholder="Wheel size"
            title="Wheel size - only numbers."
            required
          />
          <Field
            className="input"
            type="number"
            name="price"
            min="10"
            max="100"
            placeholder="Price"
            title="Price - only numbers."
            required
          />
          <Field
            className="input"
            type="number"
            name="number"
            minLength="5"
            maxLength="10"
            placeholder="ID(slug):XXXXX"
            title="Only numbers"
            required
          />
          <Field
            className="input"
            type="text"
            name="description"
            minLength="5"
            maxLength="25"
            placeholder="Description"
            title="Description may contain only letters, apostrophe, dash and spaces."
            required
          />
          <button type="submit" className="button-form">
            SAVE
          </button>
          <button
            type="reset"
            className="button-form"
            onClick={() => handleClear(formik)}
          >
            CLEAR
          </button>
        </Form>
      )}
    </Formik>
  );
};
