import { runCalculation, resetTable } from "./renderers";
import { hf, sheetId } from "./hyperformulaConfig";
import { tableData } from "./data";

export function bindEvents() {
  const runButton = document.querySelector("#run");
  const resetButton = document.querySelector("#reset");

  runButton.addEventListener("click", () => {
    runCalculation(hf, sheetId);
  });

  resetButton.addEventListener("click", () => {
    resetTable(tableData);
  });
}

export const ANIMATION_ENABLED = true;
