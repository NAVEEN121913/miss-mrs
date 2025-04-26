import { useEffect, useState } from "react";
import { db } from "./firebase";
import axios from "axios";
import {
  ref as dbRef,
  push,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageFile: null,
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onValue(dbRef(db, "products"), (snapshot) => {
      const data = snapshot.val();
      const productList = data
        ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
        : [];
      setProducts(productList);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      setForm((prev) => ({ ...prev, imageFile: file }));
      uploadImage(file);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setForm((prev) => ({ ...prev, imageUrl: res.data.url }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async () => {
    const { name, price, category, description, imageUrl } = form;

    if (!name || !price || !category || !imageUrl) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    const payload = {
      name,
      price,
      category,
      description,
      image: imageUrl,
    };

    try {
      if (editingId) {
        await update(dbRef(db, `products/${editingId}`), payload);
        setEditingId(null);
      } else {
        const newRef = push(dbRef(db, "products"));
        await set(newRef, payload);
      }

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        imageFile: null,
        imageUrl: "",
      });
    } catch (err) {
      console.error("Error saving product:", err);
    }

    setLoading(false);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      imageFile: null,
      imageUrl: product.image,
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await remove(dbRef(db, `products/${id}`));
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>
        🛍️ Product Manager
      </h2>

      {/* Form */}
      <div className='bg-white p-6 rounded-xl shadow-lg mb-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <input
            name='name'
            placeholder='Product Name'
            value={form.name}
            onChange={handleChange}
            className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
          />
          <input
            name='price'
            placeholder='Price'
            value={form.price}
            onChange={handleChange}
            className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
          />
          <input
            name='category'
            placeholder='Category'
            value={form.category}
            onChange={handleChange}
            className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
          />
          <input
            type='file'
            accept='image/*'
            name='imageFile'
            onChange={handleChange}
            className='p-3 border rounded-lg'
          />
          <textarea
            name='description'
            placeholder='Description'
            value={form.description}
            onChange={handleChange}
            className='p-3 border rounded-lg col-span-1 md:col-span-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black'
          />
        </div>

        <button
          onClick={handleSubmit}
          className='w-full mt-6 bg-black hover:bg-gray-800 text-white py-3 rounded-lg text-lg transition disabled:opacity-50'
          disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Product List */}
      <h3 className='text-2xl font-semibold mb-6 text-gray-700'>
        📦 Product List
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {products.length === 0 ? (
          <p className='text-center text-gray-500 col-span-full'>
            No products available.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col'>
              <img
                src={product.image}
                alt={product.name}
                className='h-48 w-full object-cover rounded-lg mb-4'
              />
              <h4 className='text-lg font-bold text-gray-800 mb-1'>
                {product.name}
              </h4>
              <p className='text-gray-500 mb-2'>₹{product.price}</p>
              <p className='text-sm text-gray-400 mb-3'>{product.category}</p>
              <p className='text-sm text-gray-600 flex-grow'>
                {product.description}
              </p>
              <div className='flex justify-between mt-4'>
                <button
                  onClick={() => handleEdit(product)}
                  className='bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition'>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className='bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition'>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
