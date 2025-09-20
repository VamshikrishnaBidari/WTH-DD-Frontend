import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "../features/themeSlice"; // Import actions
import { RootState } from "../app/store"; // Import RootState for type safety

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  // Sync with the document when the theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Handle toggling the theme
  const handleToggle = () => {
    dispatch(toggleTheme()); // Dispatch the action to toggle the theme
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-light" />
      ) : (
        <Moon className="w-4 h-4 text-dark" />
      )}
    </button>
  );
}
