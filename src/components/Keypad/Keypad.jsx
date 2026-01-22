import CalcButton from "../CalcButton/CalcButton";
import styles from "./Keypad.module.css";

export default function Keypad({ onKeyPress }) {
  return (
    <div className={styles.grid}>
      <CalcButton variant="red" onClick={() => onKeyPress({ type: "clear" })}>C</CalcButton>
      <CalcButton variant="dark" onClick={() => onKeyPress({ type: "operator", value: "/" })}>/</CalcButton>
      <CalcButton variant="dark" onClick={() => onKeyPress({ type: "operator", value: "*" })}>*</CalcButton>
      <CalcButton variant="dark" onClick={() => onKeyPress({ type: "operator", value: "-" })}>-</CalcButton>

      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "7" })}>7</CalcButton>
      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "8" })}>8</CalcButton>
      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "9" })}>9</CalcButton>
      
      <CalcButton variant="plus" onClick={() => onKeyPress({ type: "operator", value: "+" })}>+</CalcButton>

      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "4" })}>4</CalcButton>
      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "5" })}>5</CalcButton>
      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "6" })}>6</CalcButton>
      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "1" })}>1</CalcButton>

      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "2" })}>2</CalcButton>
      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "3" })}>3</CalcButton>
      <CalcButton onClick={() => onKeyPress({ type: "digit", value: "0" })}>0</CalcButton>
      <CalcButton onClick={() => onKeyPress({ type: "dot" })}>.</CalcButton>

      <CalcButton wide variant="equal" onClick={() => onKeyPress({ type: "equal" })}>=</CalcButton>
    </div>
  );
}
