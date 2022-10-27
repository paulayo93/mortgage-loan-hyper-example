import HyperFormula from "hyperformula";
import { tableData } from "./data";

const hf = HyperFormula.buildEmpty({
  licenseKey: "gpl-v3",
  useArrayArithmetic: true
});

const sheetName = hf.addSheet("MortgageSheet");
const sheetId = hf.getSheetId(sheetName);

hf.setCellContents(
  {
    row: 0,
    col: 0,
    sheet: sheetId
  },
  tableData
);

export { hf, sheetName, sheetId };
