import axios from "axios";
import { create } from "zustand";

const Url = "https://mind-tech-back.onrender.com/"

const useStore = create((set) => ({
  allProducts: [],
  getAllProducts: async () => {
    try {
      const response = await axios.get(Url + "products/all");
      set({ allProducts: response.data.products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  
  oneProduct: [],
  getOneProduct: async (id) => {
    try {
      const response = await axios.get(Url + "products/one?one=" + id);
      set({ oneProduct: response.data.product });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
  token: undefined,
  login: async (token) => {
    try {
      set({ token: token });
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  },

  logout: async () => {
    try {
      set({ token: undefined });
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  },
  user: [],

  getUser: async (email) => {
    try {
      const response = await axios.get(Url + "users/one?one=" + email);
      set({ user: response.data.user });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
}));

export default useStore;