import { hf, sheetId } from "./hyperformulaConfig";
import { ANIMATION_ENABLED } from "./ui";

export function renderTable(calculated = false) {
  const tbodyDOM = document.querySelector(".example tbody");
  const updatedCellClass = ANIMATION_ENABLED ? "updated-cell" : "";
  const { height, width } = hf.getSheetDimensions(sheetId);
  let newTbodyHTML = "";

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cellAddress = { sheet: sheetId, col, row };

      const cellHasFormula = hf.doesCellHaveFormula(cellAddress);
      let cellType = hf.getCellValueDetailedType(cellAddress);
      const showFormula = calculated || !cellHasFormula;
      let cellValue = "";

      if (!hf.isCellEmpty(cellAddress) && showFormula) {
        cellValue = hf.getCellValue(cellAddress);

        if (!isNaN(cellValue)) {
          cellValue = cellValue;
        }

        if (cellType == "NUMBER_RAW") {
          cellValue = cellValue
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }

        if (cellType == "NUMBER_PERCENT") {
          cellValue = parseFloat(cellValue * 100).toFixed(2);
        }
      } else {
        cellValue = hf.getCellFormula(cellAddress);
      }

      newTbodyHTML += `<td class="${
        cellHasFormula ? updatedCellClass : ""
      }"><span>
      ${cellValue}
      </span></td>`;
    }

    newTbodyHTML += "</tr>";
  }

  tbodyDOM.innerHTML = newTbodyHTML;
}

export function runCalculation() {
  renderTable(true);
}

export function resetTable() {
  renderTable();
}
