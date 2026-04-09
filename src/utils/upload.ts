import getDatas from '@/network/index';

// const resp = await getDatas("common/GetContractExport", {

// });

export async function uploadFiles(
    fileName: string,
    uploadUrl = 'common/ContractExport'
): Promise<any> {
    try {
        // 调用上传接口
        const resp = await getDatas(uploadUrl, { fileName });

        return resp;
    } catch (error) {
        console.error('文件上传失败:', error);
        throw error;
    }
}