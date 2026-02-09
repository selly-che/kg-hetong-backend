// 封装导出Excel文件函数
import * as XLSX from "xlsx";

interface ExportColumn {
  title: string;
  dataIndex: string;
  customRender?: (value: any, record: any) => string;
}

interface ExportOptions {
  fileName?: string;
  sheetName?: string;
}

export const exportExcel = (
  data: any[],
  columns: ExportColumn[],
  options: ExportOptions = {},
) => {
  const { fileName = "导出文件", sheetName = "Sheet1" } = options;

  if (!data || data.length === 0) {
    console.warn("导出数据为空");
    return;
  }

  const headers = columns.map((col) => col.title);
  const exportData = data.map((row) => {
    return columns.map((col) => {
      const value = row[col.dataIndex];
      if (col.customRender) {
        return col.customRender(value, row);
      }
      return value !== null && value !== undefined ? value : "";
    });
  });

  const ws = XLSX.utils.aoa_to_sheet([headers, ...exportData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const timestamp = new Date().getTime();
  const fullFileName = `${fileName}_${timestamp}.xlsx`;

  XLSX.writeFile(wb, fullFileName);
};
