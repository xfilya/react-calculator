import styles from "./Display.module.css";

export default function Display({ value, onChange }) {
  return (
    <div className={styles.displayWrap}>
      <input
        className={styles.display}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="decimal"
        placeholder="0"
        aria-label="Calculator display"
      />
    </div>
  );
}
