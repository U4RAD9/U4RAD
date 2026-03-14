import React, { createContext, useState } from "react";

export const FormContext = createContext();

const initialData = {
  personal: {},
  education: {},
  experience: [],
  achievements: {},
  banking: {},
  reporting: {},
  availability: {}
};

export const FormProvider = ({ children }) => {
  // NOTE: localStorage removed because File objects can't be serialized to JSON.
  // Data persists within the session as long as the user doesn't refresh.
  const [formData, setFormData] = useState(initialData);

  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data
    }));
  };

  const resetForm = () => {
    setFormData(initialData);
  };

  return (
    <FormContext.Provider value={{ formData, updateSection, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};