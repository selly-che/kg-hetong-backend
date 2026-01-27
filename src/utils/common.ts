// 封装导出Excel文件函数
export const exportExcel = (fileName: string) => {
    if (!fileName || typeof fileName != "string") {
        fileName = "导出文件"
    }
}
