import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const API_BASE_URL = "https://ecommerce-website-flask-backend.onrender.com";

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});



// API function for submitting a review
export const submitReview = async (token, productId, rating, comment) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/reviews`,
      { product_id: productId, rating, comment },
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Review submission failed.";
  }
};

// ========================= 👤 AUTHENTICATION =========================
// ✅ Login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};
// ✅ Register
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Registration failed";
  }
};

// ✅ Logout
export const logout = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Logout failed";
  }
};
// ========================= 👤 USER PROFILE =========================

// ✅ Get Logged-In User Profile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/profile`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch user profile";
  }
};

// ✅ Update Logged-In User Profile
export const updateUserProfile = async (token, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/profile`, userData, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update profile";
  }
};

// ✅ Get All Users (Admin)
export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch users";
  }
};
export const getAnyUserProfile = async (token, userId) => {
  return axios.get(`${API_BASE_URL}/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateUserByAdmin = async (token, userId, data) => {
  return axios.put(`${API_BASE_URL}/user/${userId}`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteUser = async (token, userId) => {
  return axios.delete(`${API_BASE_URL}/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
};

// ✅ Get Any User Profile (Admin)
export const getUserById = async (token, userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch user data";
  }
};
// ✅ Update Any User Profile (Admin)
export const updateUserById = async (token, userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${userId}`, userData, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update user";
  }
};

// ✅ Delete Any User (Admin)
export const deleteUserById = async (token, userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/user/${userId}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete user";
  }
};

// ========================= 🛒 PRODUCTS =========================

export const getProductDetails = async (productId, token) => {
  try {
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        accept: 'application/json',
      },
    };

    const response = await axios.get(`${API_BASE_URL}/product/products/${productId}`, config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle the case where token is invalid or expired
      console.error("❌ [ERROR] Unauthorized - Token is invalid or expired.");
      throw new Error("Unauthorized - Invalid token");
    } else {
      console.error("❌ Error fetching product details:", error);
      throw error.response?.data || "Failed to fetch product details";
    }
  }
};

// ✅ List Products with Debugging
export const getProducts = async () => {
  console.log("🔄 [API CALL] Fetching products from:", `${API_BASE_URL}/product/products`);
  
  try {
    const response = await axios.get(`${API_BASE_URL}/product/products`);
    
    console.log("✅ [API SUCCESS] Products fetched:", response.data);
    return response.data;
    
  } catch (error) {
    console.error("❌ [API ERROR] Failed to fetch products:", error);

    if (error.response) {
      console.error("🔴 Response Data:", error.response.data);
      console.error("🔴 Status Code:", error.response.status);
    } else if (error.request) {
      console.error("🟠 No response received from server. Possible network issue.");
    } else {
      console.error("🟡 Request Error:", error.message);
    }

    throw error.response?.data || "Failed to fetch products";
  }
};

export const getProductById = async (productId) => {
  const methodName = "getProductById"; // Store the method name for clarity in logs

  const apiUrl = `${API_BASE_URL}/product/products/${productId}`; // Construct the full API URL

  console.log(`[${methodName}] Fetching product with ID: ${productId}`); // Debug: Log the product ID
  console.log(`[${methodName}] Full API URL: ${apiUrl}`); // Debug: Log the full API URL

  try {
    const response = await axios.get(apiUrl);
    
    // Debug: Log the full response object to check everything returned
    console.log(`[${methodName}] API Response:`, response);
    
    // Log only the response data for a cleaner view
    console.log(`[${methodName}] API Response Data:`, response.data);
    
    return response.data;
  } catch (error) {
    // Log the error response to understand the issue better
    console.error(`[${methodName}] API Error:`, error.response ? error.response.data : error.message);
    
    // Log the full error object to inspect all details
    console.error(`[${methodName}] Full Error Object:`, error);
    
    throw error.response?.data || "Failed to fetch product";
  }
};



// ✅ Add Product (Admin/Vendor)
export const addProduct = async (token, productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/product/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error adding product:", error);
    throw error.response?.data || "Failed to add product";
  }
};


// ✅ Edit Product (Admin/Vendor)
// ✅ Edit Product (Admin/Vendor)
export const updateProduct = async (token, productId, productData) => {
  try {
    // Send the PUT request to update the product
    const response = await axios.put(
      `${API_BASE_URL}/product/products/${productId}`, 
      productData, 
      getAuthHeaders(token)
    );

    // Debug: Log the successful response to see the updated product data
    console.log("API Response (Product Updated):", response.data);

    return response.data;
  } catch (error) {
    // Debug: Log the error response to see the error message
    console.error("API Error (Product Update Failed):", error.response?.data || error.message);

    throw error.response?.data || "Failed to update product";
  }
};


// ✅ Delete Product (Admin/Vendor)
export const deleteProduct = async (token, productId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/product/products/${productId}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete product";
  }
};
// ========================= 🛍️ CART & WISHLIST =========================
// ✅ Add Item to Cart
export const addToCart = async (token, productId, quantity) => {
  try {
    console.log(`Adding to cart: ${productId}, Quantity: ${quantity}`);
    const response = await axios.post(
      `${API_BASE_URL}/cart/cart`, 
      {
        product_id: productId,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Item added to cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add to cart:', error.response?.data || error);
    throw error.response?.data || "Failed to add to cart";
  }
};
// ✅ View Cart
export const getCart = async (token) => {
  try {
    console.log('Fetching cart items...');
    
    // Ensure headers include Authorization with Bearer token
    const response = await axios.get(`${API_BASE_URL}/cart/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log('Fetched cart items:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cart:', error.response?.data || error);
    
    // Throw the error response or a generic error message
    throw error.response?.data || "Failed to fetch cart";
  }
};
// ✅ Remove Item from Cart
export const removeFromCart = async (token, productId) => {
  try {
    console.log(`Removing item from cart: ${productId}`);
    const response = await axios.delete(`${API_BASE_URL}/cart/cart/${productId}`, getAuthHeaders(token));
    console.log('Item removed from cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to remove item from cart:', error.response?.data || error);
    throw error.response?.data || "Failed to remove item from cart";
  }
};
// ✅ Add Item to Wishlist
export const addToWishlist = async (token, productId) => {
  try {
    console.log(`Adding to wishlist: ${productId}`);
    const response = await axios.post(
      `${API_BASE_URL}/cart/wishlist`,
      { product_id: productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Item added to wishlist:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add to wishlist:', error.response?.data || error);
    throw error.response?.data || "Failed to add to wishlist";
  }
};
// ✅ View Wishlist
export const getWishlist = async (token) => {
  try {
    console.log('Fetching wishlist items...');
    
    // Ensure headers include Authorization with Bearer token
    const response = await axios.get(`${API_BASE_URL}/cart/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log('Fetched wishlist items:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch wishlist:', error.response?.data || error);
    
    // Throw the error response or a generic error message
    throw error.response?.data || "Failed to fetch wishlist";
  }
};
// ✅ Remove Item from Wishlist
export const removeFromWishlist = async (token, productId) => {
  try {
    console.log(`Removing item from wishlist: ${productId}`);
    const response = await axios.delete(`${API_BASE_URL}/cart/wishlist/${productId}`, getAuthHeaders(token));
    console.log('Item removed from wishlist:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to remove from wishlist:', error.response?.data || error);
    throw error.response?.data || "Failed to remove from wishlist";
  }
};
// ========================= 📦 ORDERS =========================
// ✅ Place Order
export const placeOrder = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders/orders/place`, {}, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to place order";
  }
};
// ✅ Get Order Details
export const getOrderDetails = async (token, orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/orders/${orderId}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch order details";
  }
};
// ✅ List Orders
export const getOrders = async (token) => {
  try {
    // Log the token to ensure it's being passed correctly
    console.log("Authorization Token:", token);

    // Making the GET request to fetch orders
    const response = await axios.get(`${API_BASE_URL}/orders/orders`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sending the token as a Bearer token
        accept: "application/json" // Requesting JSON data from the server
      }
    });

    // Log the response status and the returned data for debugging
    console.log("API Response Status:", response.status);  // Status code of the response (e.g., 200)
    console.log("Response Data:", response.data);  // The data returned from the API

    // Return the data from the response (this will be used in your UI)
    return response.data;
  } catch (error) {
    // Log the error message and any response data that might help in debugging
    console.error("Error occurred while fetching orders:", error);

    // If the error has a response, log the details
    if (error.response) {
      console.error("Error Response Status:", error.response.status);  // Status code (e.g., 400, 404, etc.)
      console.error("Error Response Data:", error.response.data);  // Data returned from the API error
      console.error("Error Response Headers:", error.response.headers);  // Headers for the failed request
    } else if (error.request) {
      // In case no response was received from the server
      console.error("No response received:", error.request);
    } else {
      // If there was an error setting up the request
      console.error("Request Setup Error:", error.message);
    }

    // Throw the error response or fallback message
    throw error.response?.data || "Failed to fetch orders";
  }
};
export const deleteOrder = async (orderId, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/orders/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This will return the success message from the backend
  } catch (error) {
    console.error("❌ Error deleting order:", error);
    throw error; // Rethrow error for error handling in UI
  }
};

// ========================= 💳 PAYMENT =========================
export const processPayment = async (token, orderId) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/payment/orders/${orderId}/pay`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return success response
  } catch (error) {
    // Check if error response is available
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail || 'Payment failed. Please try again.');
    }
    throw new Error('An unknown error occurred during payment.');
  }
};
// ========================= 📦 SHIPMENT and  📦 ALL ORDERS =========================
export const getAllOrders = async (token) => {
  try {
    // Debugging - Log token to ensure it's passed correctly
    console.log("Authorization token:", token);

    const response = await axios.get(`${API_BASE_URL}/orders/orders-all`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });

    // Debugging - Log the entire response object
    console.log("Response received from API:", response);

    // If the response contains data, log the data as well
    if (response && response.data) {
      console.log("Orders data:", response.data);
    }

    return response.data; // return the data as expected
  } catch (error) {
    // Log error response to debug any failures
    console.error("Error fetching orders:", error);

    if (error.response) {
      // Log the error response (status code, data, etc.)
      console.error("Error response from API:", error.response);
      console.error("Error response data:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
    
    // Rethrow error with a fallback message
    throw error.response?.data || "Failed to fetch orders";
  }
};
// Function to update shipment status
export const updateShipmentStatus = async (orderId, trackingId, token) => {
  try {
    console.log("Sending tracking ID:", trackingId);  // Log the tracking ID to ensure it's passed correctly

    // Make the API request with the proper body
    const response = await axios.put(
      `${API_BASE_URL}/shipment/orders/${orderId}/shipment`, 
      { tracking_id: trackingId },  // Send tracking_id in the body
      getAuthHeaders(token)
    );

    console.log("Shipment status update response:", response.data);  // Log the response for further debugging
    return response.data;
  } catch (error) {
    console.error("Error updating shipment status:", error);

    // Check if error.response exists and log it
    if (error.response) {
      console.error("Error response from API:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error details:", error.response.data.detail);  // Look for specifics in the error details

      // Show the error message returned from API in the UI
      throw error.response.data.detail || "Failed to update shipment status";
    }
    throw error.message || "Failed to update shipment status";
  }
};
// Function to update delivery status
export const updateDeliveryStatus = async (orderId, trackingId, token) => {
  try {
    console.log("Sending tracking ID:", trackingId);  // Log the tracking ID for debugging
    const response = await axios.put(
      `${API_BASE_URL}/shipment/orders/${orderId}/deliver`,
      { tracking_id: trackingId },
      getAuthHeaders(token)
    );
    console.log("Mark as delivered response:", response.data);  // Log the response
    return response.data;
  } catch (error) {
    console.error("Error marking as delivered:", error);
    if (error.response) {
      console.error("Error response from API:", error.response.data);
      console.error("Error status:", error.response.status);
    }
    // Show the error message returned from API in the UI
    throw error.response?.data.detail || "Failed to mark as delivered";
  }
};
