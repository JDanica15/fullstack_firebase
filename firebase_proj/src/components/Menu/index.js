import React, { useState, useEffect } from "react";
import Table from "../Table/Table";
import EditForm from "./Edit";
import { readItems, updateItem, deleteItem } from "../../config/utils/FireStoreServices";
import { Link } from "react-router-dom";

const MenuComponent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    try {
      setLoading(true);
      fetchItems();
      setLoading(false);
    } catch (error) {
      console.log("failed to load");
    }
  }, []);

  const fetchItems = async () => {
    const items = await readItems();
    setItems(items);
  };

  const handleEdit = (item) => {
    setIsEditing(true)
    setEditingItem(item);
  };

  const handleSave = async (item) => {
    if (editingItem) await updateItem(editingItem.id, item);
    setEditingItem(null);
    fetchItems();
    setIsEditing(false)
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsEditing(false)
  };

  const handleDelete = async (id) => {
    setLoading(true)
    await deleteItem(id);
    fetchItems();
    setLoading(false)
  };

  return (
    <div>
      <div className="flex">
        <p>Menu Component</p>
        <Link to={"menu/create"}>Create Menu</Link>
      </div>
      {isEditing ?
        <EditForm item={editingItem} onSave={handleSave} onCancel={handleCancel} />
        :
        <Table menuItems={items} loading={loading} handleDelete={handleDelete} handleEdit={handleEdit} />}
    </div>
  );
};

export default MenuComponent;
