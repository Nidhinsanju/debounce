import { createContext } from "react";

export interface SearchContextType {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);
