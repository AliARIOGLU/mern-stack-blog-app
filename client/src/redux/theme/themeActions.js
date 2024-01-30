import { store } from "../store";
import { useSelector } from "react-redux";
import { toggleTheme } from "./themeSlice";

export const useTheme = () => useSelector((state) => state.theme);
export const setTheme = () => store.dispatch(toggleTheme());
