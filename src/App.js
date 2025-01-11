
import React, { useState } from "react";
import "./App.css";  // Import the CSS file

const App = () => {
  const [formData, setFormData] = useState([
    { input: "", select: "" },
  ]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const addField = () => {
    setFormData([...formData, { input: "", select: "" }]);
  };

  const removeField = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = formData.map((field) => ({
      input: !field.input ? "Input is required" : "",
      select: !field.select ? "Select is required" : "",
    }));

    setErrors(newErrors);

    if (newErrors.every((err) => !err.input && !err.select)) {
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Dynamic Form with Validation</h2>
      <form onSubmit={handleSubmit} className="form">
        {formData.map((field, index) => (
          <div key={index} className="field-container">
            <div className="input-container">
              <input
                type="text"
                value={field.input}
                onChange={(e) => handleChange(index, "input", e.target.value)}
                placeholder="Enter text"
                className="input"
              />
              {errors[index]?.input && (
                <p className="error-text">{errors[index].input}</p>
              )}
            </div>

            <div className="select-container">
              <select
                value={field.select}
                onChange={(e) => handleChange(index, "select", e.target.value)}
                className="select"
              >
                <option value="">Select an option</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
              {errors[index]?.select && (
                <p className="error-text">{errors[index].select}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeField(index)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="add-button"
        >
          Add Field
        </button>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <h3 className="form-state-header">Form State</h3>
      <table className="table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Input</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((field, index) => (
            <tr key={index}>
              <td>{field.input}</td>
              <td>{field.select}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
