import { useState } from "react";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";
import styles from "./Calculator.module.css";

function validateNumericInput(raw) {
  let v = String(raw ?? "").replace(",", ".");
  v = v.replace(/[^\d.]/g, "");

  const parts = v.split(".");
  if (parts.length > 2) {
    v = parts[0] + "." + parts.slice(1).join("");
  }

  if (v.length > 16) v = v.slice(0, 16);
  return v;
}

function toNumber(inputStr) {
  if (inputStr === "" || inputStr === ".") return 0;
  return Number(inputStr);
}

function formatResult(num) {
  if (Number.isFinite(num) === false) return "Error";

  const rounded = Math.round((num + Number.EPSILON) * 1e10) / 1e10;

  const str = String(rounded);
  if (str.length > 16) return rounded.toPrecision(10);

  return str;
}

export default function Calculator() {
  const [inputValue, setInputValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);

  function handleInputChange(nextRaw) {
    const next = validateNumericInput(nextRaw);

    if (next.length > 1 && next[0] === "0" && next[1] !== ".") {
      setInputValue(String(Number(next)));
      return;
    }

    setInputValue(next);
  }

  function appendDigit(digit) {
    setInputValue((prev) => {
      const p = prev === "0" ? "" : prev;
      const next = p + digit;

      return next.length > 16 ? next.slice(0, 16) : next;
    });
  }

  function appendDot() {
    setInputValue((prev) => {
      if (prev === "") return "0.";
      if (prev.includes(".")) return prev;
      return prev + ".";
    });
  }

  function clearAll() {
    setInputValue("0");
    setFirstOperand(null);
    setOperator(null);
  }

  function applyOperator(nextOp) {
    const current = toNumber(inputValue);

    if (firstOperand === null) {
      setFirstOperand(current);
      setOperator(nextOp);
      setInputValue("");
      return;
    }

    if (operator !== null && inputValue === "") {
      setOperator(nextOp);
      return;
    }

    const result = calculate(firstOperand, current, operator);
    const formatted = formatResult(result);

    if (formatted === "Error") {
      setInputValue("Error");
      setFirstOperand(null);
      setOperator(null);
      return;
    }

    setFirstOperand(Number(formatted));
    setOperator(nextOp);
    setInputValue("");
  }

  function calculate(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? Number.NaN : a / b;
      default:
        return b;
    }
  }

  function resolve() {
    if (firstOperand === null || operator === null) return;

    const secondOperand = toNumber(inputValue);
    const result = calculate(firstOperand, secondOperand, operator);
    const formatted = formatResult(result);

    setInputValue(formatted);

    setFirstOperand(null);
    setOperator(null);
  }

  function handleKeyPress(key) {
    if (key.type === "digit") appendDigit(key.value);
    if (key.type === "dot") appendDot();
    if (key.type === "clear") clearAll();
    if (key.type === "operator") applyOperator(key.value);
    if (key.type === "equal") resolve();
  }

  return (
    <div className={styles.shell}>
      <div className={styles.calculator}>
        <Display value={inputValue === "" ? "0" : inputValue} onChange={handleInputChange} />
        <Keypad onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}
