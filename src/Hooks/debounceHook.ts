import axios from "axios";

export const getProducts = async (data: string) => {
  try {
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${data}`
    );
    if (res?.status === 200) {
      console.log(res, "success");
    }
    if (res?.status !== 200) {
      console.log(res, "Failed");
    }
  } catch (err) {
    console.log(err);
  }
};

let debounceTimer = 0; // store timer globally

// debounce util
const _getProductsDebounce = (
  callback: (...args: any[]) => void,
  delay = 500
) => {
  return (...args: any[]) => {
    clearTimeout(debounceTimer); // clear old timer
    debounceTimer = setTimeout(() => {
      callback(...args); // run callback
    }, delay);
  };
};

export const debouncedGetProducts = _getProductsDebounce(getProducts, 500);
