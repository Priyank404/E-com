import React, { useState } from 'react';
import NavBar from '../components/NavBar';

const ProfilePage = () => {
  const [mobile, setMobile] = useState('');
  const [editing, setEditing] = useState(true); // Start in editing mode (no mobile yet)

  const handleMobileSave = () => {
    if (!/^\d{10}$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    // Call backend here if needed
    setEditing(false);
  };

  return (
    <div className="h-full w-full">
      {/* Navbar */}
      <div className="h-[10vh] border-b border-black">
        <NavBar isProfile />
      </div>

      {/* Profile Content (Full Width) */}
      <div className="h-[90vh] w-full p-6 overflow-y-auto hide-scrollbar">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover shadow"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold">Priyank Sharma</h2>
            <p className="text-gray-500">priyanksharma@example.com</p>

            {/* Mobile Number Section */}
            {editing ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  className="border px-2 py-1 rounded text-sm w-44"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <button
                  onClick={handleMobileSave}
                  className="bg-black text-white text-sm px-3 py-1 rounded hover:opacity-90"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <p className="text-gray-700">+91 {mobile}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
              </div>
            )}

            <button className="mt-3 px-4 py-1 border border-gray-300 rounded-md hover:bg-gray-100 text-sm">
              Change Photo
            </button>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <div className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center">
            <p className="font-medium">123 Main Street, New Delhi, Delhi - 110001</p>
            <button className="text-sm text-blue-600 hover:underline">Edit</button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4">My Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((order, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-200 flex items-center justify-center text-xs text-gray-600">
                    Product Img
                  </div>
                  <div>
                    <p className="font-medium">Product Name</p>
                    <p className="text-sm text-gray-600">₹{order === 1 ? 1200 : 1100}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    {order === 1 ? 'Delivered' : order === 2 ? 'Shipped' : 'Cancelled'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Ordered on {order === 1 ? 'April 20' : order === 2 ? 'April 15' : 'Mar 30'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:opacity-90">
            View All Orders
          </button>
        </div>

        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
          <div className="space-x-4">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              Change Password
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
