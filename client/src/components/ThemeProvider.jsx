/* eslint-disable */

import { useTheme } from "../redux/theme/themeActions";

export const ThemeProvider = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">
        {children}
      </div>
    </div>
  );
};
