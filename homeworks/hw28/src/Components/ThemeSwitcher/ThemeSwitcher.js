import styles from './ThemeSwitcher.module.css'
import { useTheme } from "../../Contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { handleTheme, theme } = useTheme()

  return (
        <div className={`${styles.checkbox_item} ${styles.citem_3}`}>
          <label className={styles.checkbox_wrap}>
            <input
              type="checkbox"
              name="checkbox"
              value={theme}
              className={styles.checkbox_inp}
              onChange={(e) => handleTheme(e.target.value)}
            />
            <span className={styles.checkbox_mark}></span>
          </label>
      </div>
  )
}