import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    contact: "",
    address: "",
    pincode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (productCode, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.productCode === productCode ? { ...item, quantity } : item,
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (productCode) => {
    const updatedCart = cart.filter((item) => item.productCode !== productCode);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace("₹", "").replace(",", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Product Purchased !");
    //     const productDetails = cart
    //       .map((item) => {
    //         return `Product: ${item.title}\nPrice: ${item.price}\nQuantity: ${
    //           item.quantity
    //         }\nSubtotal: ₹${(
    //           parseFloat(item.price.replace("₹", "").replace(",", "")) *
    //           item.quantity
    //         ).toFixed(2)}`;
    //       })
    //       .join("\n\n");

    //     const customerMessage = `
    // *Hello, I want to buy this product!*

    // *Name*: ${customerDetails.name}
    // *Contact*: ${customerDetails.contact}
    // *Address*: ${customerDetails.address}
    // *Pincode*: ${customerDetails.pincode}

    // *Product Details:*
    // ${productDetails}

    // *Total Price*: ₹${calculateTotal().toFixed(2)}

    // *How can I proceed with the payment?*
    // *Is there any discount or offer available?*

    // Looking forward to your reply. Thanks!
    //     `;

    //     const whatsappNumber = "918056236659";
    //     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    //       customerMessage,
    //     )}`;

    //     window.location.href = whatsappUrl;
    setIsModalOpen(false);
  };

  return (
    <div className='p-4 max-w-5xl mx-auto'>
      <h2 className='text-3xl font-semibold mb-6'>Cart</h2>
      {cart.length === 0 ? (
        <p className='text-red-500'>Your cart is empty.</p>
      ) : (
        <div className='overflow-x-auto'>
          <Table className='w-full border border-gray-200 text-sm'>
            <Thead>
              <Tr className='bg-gray-100 text-left'>
                <Th className='p-2'>Product</Th>
                <Th className='p-2'>Price</Th>
                <Th className='p-2'>Quantity</Th>
                <Th className='p-2'>Subtotal</Th>
                <Th className='p-2'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.map((item) => (
                <Tr key={item.productCode} className='border-t'>
                  <Td className='p-2'>
                    {item.title} - {item.size}
                  </Td>
                  <Td className='p-2'>{item.price}</Td>
                  <Td className='p-2 flex items-center gap-2'>
                    <button
                      onClick={() =>
                        updateQuantity(item.productCode, item.quantity - 1)
                      }
                      className='bg-gray-300 px-2 py-1 rounded'>
                      -
                    </button>
                    <span className='w-8 text-center'>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productCode, item.quantity + 1)
                      }
                      className='bg-gray-300 px-2 py-1 rounded'>
                      +
                    </button>
                  </Td>
                  <Td className='p-2'>
                    ₹
                    {(
                      parseFloat(item.price.replace("₹", "").replace(",", "")) *
                      item.quantity
                    ).toFixed(2)}
                  </Td>
                  <Td className='p-2'>
                    <button
                      onClick={() => removeItem(item.productCode)}
                      className='text-red-500'>
                      Remove
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <div className='text-right mt-4'>
            <p className='text-xl'>Total: ₹{calculateTotal().toFixed(2)}</p>
            <button
              className='bg-[#de4387] text-white px-6 py-2 mt-4 rounded-md w-full sm:w-auto'
              onClick={() => setIsModalOpen(true)}>
              Buy Now
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => navigate("/")}
        className='mt-4 text-[#de4387] block'>
        Continue Shopping
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-md shadow-lg w-96'>
            <h2 className='text-2xl mb-4'>Enter Your Details</h2>
            <form onSubmit={handleFormSubmit}>
              <div className='mb-4'>
                <label htmlFor='name' className='block text-sm font-semibold'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={customerDetails.name}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 p-2 rounded-md'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='contact'
                  className='block text-sm font-semibold'>
                  Contact
                </label>
                <input
                  type='text'
                  id='contact'
                  name='contact'
                  value={customerDetails.contact}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 p-2 rounded-md'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='address'
                  className='block text-sm font-semibold'>
                  Address
                </label>
                <textarea
                  id='address'
                  name='address'
                  value={customerDetails.address}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 p-2 rounded-md'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='pincode'
                  className='block text-sm font-semibold'>
                  Pincode
                </label>
                <input
                  type='text'
                  id='pincode'
                  name='pincode'
                  value={customerDetails.pincode}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 p-2 rounded-md'
                  required
                />
              </div>
              <div className='flex justify-between'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='bg-gray-500 text-white px-4 py-2 rounded-md'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#de4387] text-white px-6 py-2 rounded-md'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
