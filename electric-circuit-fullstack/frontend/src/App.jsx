import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import "./layout.css";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Admin from "./pages/Admin";
import SuperAdmin from "./pages/SuperAdmin";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ManageUsers from "./pages/ManageUsers";
import ManageOrders from "./pages/ManageOrders";
import ManageFeedback from "./pages/ManageFeedback";
import MyOrders from "./pages/MyOrders";

function Layout({ children }) {

    return (

        <>
            <Navbar />

            <div className="mainContent">
                {children}
            </div>

        </>

    );

}

function App() {

    return (

        <Router>

            <Routes>

                {/* Home */}

                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />

                {/* Products */}

                <Route
                    path="/products"
                    element={
                        <Layout>
                            <Products />
                        </Layout>
                    }
                />

                {/* Cart */}

                <Route
                    path="/cart"
                    element={
                        <Layout>
                            <Cart />
                        </Layout>
                    }
                />

                {/* Checkout */}

                <Route
                    path="/checkout"
                    element={
                        <Layout>
                            <Checkout />
                        </Layout>
                    }
                />

                {/* Profile */}

                <Route
                    path="/profile"
                    element={
                        <Layout>
                            <Profile />
                        </Layout>
                    }
                />

                {/* Edit Profile */}

                <Route
                    path="/edit-profile"
                    element={
                        <Layout>
                            <EditProfile />
                        </Layout>
                    }
                />

                {/* My Orders */}

                <Route
                    path="/my-orders"
                    element={
                        <Layout>
                            <MyOrders />
                        </Layout>
                    }
                />

                {/* About */}

                <Route
                    path="/about"
                    element={
                        <Layout>
                            <About />
                        </Layout>
                    }
                />

                {/* Contact */}

                <Route
                    path="/contact"
                    element={
                        <Layout>
                            <Contact />
                        </Layout>
                    }
                />

                {/* Login */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Register */}

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* ================= SUPER ADMIN ================= */}

                <Route
                    path="/super-admin"
                    element={<SuperAdmin />}
                />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={<Admin />}
                />

                {/* Add Product */}

                <Route
                    path="/admin/add-product"
                    element={<AddProduct />}
                />

                {/* Edit Product */}

                <Route
                    path="/admin/edit-product/:id"
                    element={<EditProduct />}
                />

                {/* Manage Users */}

                <Route
                    path="/admin/users"
                    element={<ManageUsers />}
                />

                {/* Manage Orders */}

                <Route
                    path="/manage-orders"
                    element={<ManageOrders />}
                />

                {/* Manage Feedback */}

                <Route
                    path="/manage-feedback"
                    element={<ManageFeedback />}
                />

            </Routes>

        </Router>

    );

}

export default App;