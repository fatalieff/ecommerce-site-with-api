import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [user, setUser] = useLocalStorage("user", null);
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [orders, setOrders] = useLocalStorage("orders", []);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch {
        showToast("Failed to load products");
      }
      setLoading(false);
    };
    fetchProducts();
  }, [showToast]);

  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      showToast(`"${product.title.slice(0, 30)}..." added to basket`);
    },
    [setCart, showToast]
  );

  const updateQuantity = useCallback(
    (id, quantity) => {
      if (quantity < 1) {
        setCart((prev) => prev.filter((item) => item.id !== id));
        return;
      }
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    },
    [setCart]
  );

  const removeFromCart = useCallback(
    (id) => setCart((prev) => prev.filter((item) => item.id !== id)),
    [setCart]
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          showToast("Removed from wishlist");
          return prev.filter((item) => item.id !== product.id);
        }
        showToast("Added to wishlist");
        return [...prev, product];
      });
    },
    [setWishlist, showToast]
  );

  const isInWishlist = useCallback(
    (id) => wishlist.some((item) => item.id === id),
    [wishlist]
  );

  const login = useCallback(
    async (username, password) => {
      try {
        const response = await axios.post(
          "https://fakestoreapi.com/auth/login",
          { username, password }
        );
        setUser({ username, token: response.data.token });
        showToast(`Welcome back, ${username}!`);
        return true;
      } catch {
        showToast("Invalid username or password");
        return false;
      }
    },
    [setUser, showToast]
  );

  const register = useCallback(
    (username, email, password) => {
      setUser({ username, email, token: "mock-token" });
      showToast(`Account created for ${username}!`);
      return true;
    },
    [setUser, showToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast("Logged out successfully");
  }, [setUser, showToast]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  const placeOrder = useCallback(
    (orderDetails) => {
      const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        ...orderDetails,
      };
      setOrders((prev) => [order, ...prev]);
      clearCart();
      return order;
    },
    [cart, setOrders, clearCart]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        products,
        loading,
        searchTerm,
        setSearchTerm,
        activeCategory,
        setActiveCategory,
        sortOrder,
        setSortOrder,
        cart,
        cartCount,
        cartTotal,
        wishlist,
        user,
        theme,
        orders,
        toast,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        login,
        register,
        logout,
        toggleTheme,
        placeOrder,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
