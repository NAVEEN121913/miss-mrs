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
    title: "",
    price: "",
    category: "",
    description: "",
    size: [],
    colorVariants: [],
    imageFile: null,
    imageUrl: "",
    rating: 1,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const productData = [
    {
      icon: "https://wandinfotech.s3.us-east-1.amazonaws.com/product/Product1.jpg",
      productCode: 1,
      title: "Kanchipuram Cotton Kurti",
      description:
        "Elegant South Indian cotton kurti featuring traditional Kanchipuram motifs. Ideal for festive and daily ethnic wear.",
      category: "Kurti",
      price: "₹999.00",
      size: ["S", "M", "L", "XL"],
      rating: 5,
      colorVariants: [
        { colorName: "Maroon", colorCode: "#800000" },
        { colorName: "Olive Green", colorCode: "#556B2F" },
      ],
    },
    {
      icon: "https://wandinfotech.s3.us-east-1.amazonaws.com/product/Product2.jpg",
      productCode: 2,
      title: "Temple Border Saree",
      description:
        "Graceful handloom saree with a classic temple border design. Perfect blend of tradition and style for any occasion.",
      category: "Saree",
      price: "₹2499.00",
      size: ["Free Size"],
      rating: 4,
      colorVariants: [
        { colorName: "Rust", colorCode: "#B7410E" },
        { colorName: "Beige", colorCode: "#F5F5DC" },
      ],
    },
    {
      icon: "https://wandinfotech.s3.us-east-1.amazonaws.com/product/Product3.jpg",
      productCode: 3,
      title: "Mull Cotton Salwar Set",
      description:
        "Soft mull cotton salwar kameez set with pastel floral prints. Lightweight and comfortable for hot climates.",
      category: "Salwar Kameez",
      price: "₹1499.00",
      size: ["M", "L", "XL"],
      rating: 5,
      colorVariants: [
        { colorName: "Peach", colorCode: "#FFDAB9" },
        { colorName: "Sky Blue", colorCode: "#87CEEB" },
      ],
    },
    {
      icon: "https://wandinfotech.s3.us-east-1.amazonaws.com/product/Product4.jpg",
      productCode: 4,
      title: "Personalized Blouse Stitching",
      description:
        "Tailor-made blouse stitching service with your choice of embroidery, piping, and patterns. Celebrate tradition your way.",
      category: "Customized",
      price: "₹799.00",
      size: ["Custom"],
      rating: 5,
      colorVariants: [
        { colorName: "Gold", colorCode: "#FFD700" },
        { colorName: "Black", colorCode: "#000000" },
      ],
    },
    {
      icon: "https://wandinfotech.s3.us-east-1.amazonaws.com/product/Product5.jpg",
      productCode: 5,
      title: "Annam Handblock Dupatta",
      description:
        "Handblock printed dupatta with traditional Annam bird patterns in earthy tones. A beautiful addition to any ethnic outfit.",
      category: "Dupatta",
      price: "₹699.00",
      size: ["Free Size"],
      rating: 3,
      colorVariants: [
        { colorName: "Brown", colorCode: "#8B4513" },
        { colorName: "Ivory", colorCode: "#FFFFF0" },
      ],
    },
    {
      icon: "https://wandinfotech.s3.us-east-1.amazonaws.com/product/Product6.jpg",
      productCode: 6,
      title: "Chettinad Cotton Saree",
      description:
        "Vibrant Chettinad cotton saree with contrast borders and authentic patterns. Lightweight and easy to drape.",
      category: "Saree",
      price: "₹1999.00",
      size: ["Free Size"],
      rating: 4,
      colorVariants: [
        { colorName: "Magenta", colorCode: "#FF00FF" },
        { colorName: "Navy Blue", colorCode: "#000080" },
      ],
    },
    {
      icon: "https://wandinfotech.s3.us-east-1.amazonaws.com/product/Product7.jpg",
      productCode: 7,
      title: "Mysore Silk Kurti",
      description:
        "Rich Mysore silk kurti with zari detailing. A regal touch for your festive wardrobe.",
      category: "Kurti",
      price: "₹1899.00",
      size: ["S", "M", "L"],
      rating: 4,
      colorVariants: [
        { colorName: "Purple", colorCode: "#800080" },
        { colorName: "Teal", colorCode: "#008080" },
      ],
    },
    {
      icon: "https://wandinfotech.s3.us-east-1.amazonaws.com/product/Product8.jpg",
      productCode: 8,
      title: "Custom Name Embroidery Set",
      description:
        "Get your ethnic wear personalized with name embroidery. Perfect for gifting or adding a personal touch.",
      category: "Customized",
      price: "₹499.00",
      size: ["Custom"],
      rating: 5,
      colorVariants: [
        { colorName: "White", colorCode: "#FFFFFF" },
        { colorName: "Lavender", colorCode: "#E6E6FA" },
        { colorName: "Mint Green", colorCode: "#98FF98" },
      ],
    },
  ];

  const uploadProductsToRealtimeDB = async () => {
    console.log("called");
    const productsRef = dbRef(db, "products");

    for (let product of productData) {
      console.log("inside");
      try {
        await push(productsRef, product);
        console.log(`Uploaded: ${product.title}`);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

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
    } else if (name === "size") {
      setForm((prev) => ({
        ...prev,
        [name]: value.split(","),
      }));
    } else if (name === "colorVariants") {
      const colorArr = value.split(",").map((color) => {
        const [colorName, colorCode] = color.split(":");
        return { colorName, colorCode };
      });
      setForm((prev) => ({ ...prev, [name]: colorArr }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    console.log("Upload Started ....");
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://multer-sample.onrender.com/upload",
        formData,
      );
      console.log("res", res);
      setForm((prev) => ({ ...prev, imageUrl: res.data.url }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async () => {
    // uploadProductsToRealtimeDB();
    const {
      title,
      price,
      category,
      description,
      imageUrl,
      size,
      colorVariants,
      rating,
    } = form;

    if (
      !title ||
      !price ||
      !category ||
      !imageUrl ||
      !size.length ||
      !colorVariants.length
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    const payload = {
      title,
      price,
      category,
      description,
      image: imageUrl,
      size,
      colorVariants,
      rating,
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
        title: "",
        price: "",
        category: "",
        description: "",
        size: [],
        colorVariants: [],
        imageFile: null,
        imageUrl: "",
        rating: 1,
      });
    } catch (err) {
      console.error("Error saving product:", err);
    }

    setLoading(false);
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      size: product.size,
      colorVariants: product.colorVariants
        .map((variant) => `${variant.colorName}:${variant.colorCode}`)
        .join(","),
      imageFile: null,
      imageUrl: product.image,
      rating: product.rating,
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await remove(dbRef(db, `products/${id}`));
  };

  console.log("products", products);
  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>
        🛍️ Product Manager
      </h2>

      {/* Form */}
      <div className='bg-white p-6 rounded-xl shadow-lg mb-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <input
            name='title'
            placeholder='Product Title'
            value={form.title}
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

        <input
          name='size'
          placeholder='Sizes (comma separated)'
          value={form.size.join(",")}
          onChange={handleChange}
          className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mt-4'
        />

        <input
          name='colorVariants'
          placeholder="Color variants (e.g., 'Red:#FF0000,Blue:#0000FF')"
          value={form.colorVariants.join(",")}
          onChange={handleChange}
          className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mt-4'
        />

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
                src={product.icon}
                alt={product.title}
                className='h-48 w-full object-cover rounded-lg mb-4'
              />
              <h4 className='text-lg font-bold text-gray-800 mb-1'>
                {product.title}
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
