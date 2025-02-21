import { useTheme } from '../../../app/hooks/use-theme';

import Moon from '../../../assets/images/moon.svg';
import Sun from '../../../assets/images/sun.svg';

export const Theme = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header>
      <h1>Search Rick and Morty characters</h1>
      <div
        className={`theme-switcher ${isDarkMode ? 'dark' : 'light'}`}
        onClick={() => toggleTheme(!isDarkMode)}
      >
        {isDarkMode ? <Moon /> : <Sun />}
      </div>
    </header>
  );
};
