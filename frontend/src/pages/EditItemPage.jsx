import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { getItemById, updateItem } from "../api/itemApi.js";

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch item", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      console.log("Submitting update data:", formData);
      const response = await updateItem(id, formData);
      console.log("Item updated:", response.data);
      
      // Add a small delay to ensure backend has processed the data
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error) {
      console.error("Failed to update item", error);
      alert("Failed to update item: " + (error.response?.data?.message || error.message));
    }
  };

  if (!item) return <p>Loading item details...</p>;

  return (
    <ItemForm
      initialValues={item}
      submitText="Update Item"
      onSubmit={handleUpdate}
    />
  );
}

export default EditItemPage;