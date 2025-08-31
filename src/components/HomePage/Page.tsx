import { useContext, useEffect } from "react";
import { debouncedGetProducts } from "../../Hooks/debounceHook";
import { SearchContext } from "../searchContext/SearchContext";

function Page() {
  const context = useContext(SearchContext);

  if (!context) return null;
  const { data } = context;
  useEffect(() => {
    if (data) {
      debouncedGetProducts(data);
    }
  }, [data]);

  return <div>{data}</div>;
}
export default Page;
