import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { createItem } from "../api/itemApi.js";

function AddItemPage() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      console.log("Submitting form data:", formData);
      const response = await createItem(formData);
      console.log("Item created:", response.data);
      
      // Add a small delay to ensure backend has processed the data
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error) {
      console.error("Failed to create item", error);
      alert("Failed to create item: " + (error.response?.data?.message || error.message));
    }
  };

  return <ItemForm submitText="Add Item" onSubmit={handleCreate} />;
}

export default AddItemPage;