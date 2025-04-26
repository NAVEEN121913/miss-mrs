// Shop.jsx (Realtime Database Version)
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, push, set, onValue, update, remove } from "firebase/database";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    size: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = () => {
    onValue(ref(db, "products"), (snapshot) => {
      const data = snapshot.val();
      const productList = data
        ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
        : [];
      setProducts(productList);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      size: form.size.split(",").map((s) => s.trim()),
    };
    if (editingId) {
      await update(ref(db, `products/${editingId}`), payload);
      setEditingId(null);
    } else {
      const newRef = push(ref(db, "products"));
      await set(newRef, payload);
    }
    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
      size: "",
    });
  };

  const handleEdit = (product) => {
    setForm({ ...product, size: product.size.join(", ") });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await remove(ref(db, `products/${id}`));
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Manage Products</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <input
          name='name'
          placeholder='Product Name'
          value={form.name}
          onChange={handleChange}
          className='p-2 border rounded'
        />
        <input
          name='price'
          placeholder='Price'
          value={form.price}
          onChange={handleChange}
          className='p-2 border rounded'
        />
        <input
          name='category'
          placeholder='Category'
          value={form.category}
          onChange={handleChange}
          className='p-2 border rounded'
        />
        <input
          name='image'
          placeholder='Image URL'
          value={form.image}
          onChange={handleChange}
          className='p-2 border rounded'
        />
        <input
          name='description'
          placeholder='Description'
          value={form.description}
          onChange={handleChange}
          className='p-2 border rounded col-span-2'
        />
        <input
          name='size'
          placeholder='Sizes (comma separated)'
          value={form.size}
          onChange={handleChange}
          className='p-2 border rounded col-span-2'
        />
        <button
          onClick={handleSubmit}
          className='bg-black text-white py-2 px-4 rounded col-span-2'>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      <div className='grid gap-6'>
        {products.map((product) => (
          <div key={product.id} className='p-4 border rounded shadow'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-48 object-cover rounded mb-2'
            />
            <h3 className='text-lg font-semibold'>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Category: {product.category}</p>
            <p>Sizes: {product.size.join(", ")}</p>
            <div className='mt-2 space-x-2'>
              <button
                onClick={() => handleEdit(product)}
                className='bg-blue-500 text-white px-3 py-1 rounded'>
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className='bg-red-500 text-white px-3 py-1 rounded'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
