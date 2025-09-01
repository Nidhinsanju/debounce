import axios from "axios";

export const getProducts = async (data: string): Promise<any> => {
  try {
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${data}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

const _getProductsDebounce = <T extends any[], R>(
  callback: (...args: T) => Promise<R>,
  delay = 500
) => {
  let timer: number = 0;

  return (...args: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args)
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };
};

export const debouncedGetProducts = _getProductsDebounce(getProducts, 500);
