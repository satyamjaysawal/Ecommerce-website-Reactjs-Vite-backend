import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";
// import ProductSearch from "./components/ProductSearch";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Order from "./components/Order";
import Payment from "./components/Payment";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";
import AllOrders from "./components/AllOrders";
import ManageShipments from "./components/ManageShipments";
// import Review from "./components/Review";
// import Sale from "./components/Sale";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Fixed Navbar */}
          <Navbar />
          
          <main className="flex-grow mt-[60px]"> {/* Add margin to push content below Navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 🛍️ Public Routes (Anyone Can Access) */}
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              {/* <Route path="/search" element={<ProductSearch />} /> */}

              {/* 🔒 Protected Routes (Only Authenticated Users) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-product" element={<ProductAdd />} />
                <Route path="/update-product/:productId" element={<ProductEdit />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/payment/:orderId" element={<Payment />} />
                {/* <Route path="/review" element={<Review />} /> */}
                {/* <Route path="/sales" element={<Sale />} /> */}


                <Route path="/orders-all" element={<AllOrders />} />
                <Route path="/shipments" element={<ManageShipments />} />      
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
