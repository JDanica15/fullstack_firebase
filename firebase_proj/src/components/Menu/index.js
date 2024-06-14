import React, { useState, useEffect, Fragment } from "react";
import Table from "../Table/Table";
import EditForm from "./Edit";
import { readItems, updateItem, deleteItem } from "../../config/utils/FireStoreServices";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";

const MenuComponent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState(null)

  useEffect(() => {
    try {
      setLoading(true);
      fetchItems();
      setLoading(false);
    } catch (error) {
      toast.error('Please try again later')
    }
  }, []);

  const fetchItems = async () => {
    const items = await readItems();
    setItems(items);
  };

  // EDIT
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

  // DELETE CONFIRMATION
  const handleDeleteConfirmation = (id) => {
    setDeleteItemId(id); // Set the id of item to delete
  };
  const handleCancelDelete = () => {
    setDeleteItemId(null); // Reset deleteItemId on cancel
  };

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteItem(deleteItemId);
      setDeleteItemId(null);
      toast.success('Data has been removed!')
      fetchItems();
      setLoading(false)
    } catch (error) {
      toast.error('failed to delete.')
    }
  };

  return (
    <Fragment>
      <div className="flex justify-between">
        <p>Menu List</p>
        <Link to={"create"} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create Menu</Link>
      </div>
      {isEditing ?
        <EditForm item={editingItem} onSave={handleSave} onCancel={handleCancel} />
        :
        <Table menuItems={items} loading={loading} handleDelete={handleDeleteConfirmation} handleEdit={handleEdit} />}
      <Modal isOpen={deleteItemId !== null} onConfirm={handleDelete} onCancel={handleCancelDelete} />

    </Fragment>
  );
};

export default MenuComponent;
