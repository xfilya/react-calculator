import styles from "./CalcButton.module.css";

export default function CalcButton({ children, onClick, variant, wide = false }) {
  const classNames = [
    styles.button,
    variant ? styles[variant] : "",
    wide ? styles.wide : "",
  ].join(" ");

  return (
    <button className={classNames} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
