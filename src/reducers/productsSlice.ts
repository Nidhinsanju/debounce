import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { debouncedGetProducts } from "../Hooks/debounceHook";

// Types
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  brand: string;
  description: string;
  tags: string[];
  availabilityStatus: string;
  discountPercentage: number;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  stock: string;
  rating: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductsState {
  data: ProductResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk (uses your debounced API)
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (query: string) => {
    const response = await debouncedGetProducts(query);
    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default productsSlice.reducer;
