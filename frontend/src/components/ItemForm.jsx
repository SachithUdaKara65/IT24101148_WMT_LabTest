import { useState } from "react";

function ItemForm({ initialValues, onSubmit, submitText }) {
  const [formData, setFormData] = useState(() => {
    const defaults = {
      name: "",
      category: "",
      price: "",
      description: "",
      imageUrl: "",
      stockQuantity: "",
    };
    
    if (initialValues) {
      return {
        ...defaults,
        ...initialValues,
        stockQuantity: initialValues.stockQuantity || "",
      };
    }
    
    return defaults;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert and validate the stockQuantity
    let stockQty;
    if (formData.stockQuantity === "" || formData.stockQuantity === null) {
      stockQty = 0;
    } else {
      stockQty = Number(formData.stockQuantity);
    }
    
    const submittedData = {
      ...formData,
      price: Number(formData.price),
      stockQuantity: stockQty,
    };
    
    console.log("Form Data Before Submit:", formData);
    console.log("Data Being Submitted:", submittedData);
    
    onSubmit(submittedData);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <input name="category" value={formData.category} onChange={handleChange} required />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <label>Stock Quantity</label>
      <input
        type="number"
        name="stockQuantity"
        value={formData.stockQuantity}
        onChange={handleChange}
        min="0"
        step="1"
        placeholder="Enter stock quantity"
      />

      <button className="btn primary" type="submit">{submitText}</button>
    </form>
  );
}

export default ItemForm;