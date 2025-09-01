import { useContext, useEffect } from "react";
import { SearchContext } from "../searchContext/SearchContext";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchProducts } from "../../reducers/productsSlice";

function Page() {
  const context = useContext(SearchContext);
  if (!context) return null;

  const { data: searchQuery } = context;
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: productData,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchProducts(searchQuery));
    }
  }, [searchQuery, dispatch]);

  return (
    <>
      <div>
        {!loading && productData === null && (
          <div className="flex flex-row justify-center w-full items-center mt-10">
            No items to display
          </div>
        )}
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {productData?.products?.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col hover:shadow-xl transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-contain rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            <p className="text-sm text-gray-600 line-clamp-3 mb-3">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg"
                >
                  # {tag}
                </span>
              ))}
            </div>
            <p
              className={`text-sm font-medium ${
                product.availabilityStatus === "In Stock"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {product.availabilityStatus}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-sm text-red-500">
                -{product.discountPercentage}%
              </span>
            </div>
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <p>⭐ {product.rating} / 5</p>
              <p>{product.stock} units left</p>
              <p>{product.warrantyInformation}</p>
              <p>{product.returnPolicy}</p>
              <p>{product.shippingInformation}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
