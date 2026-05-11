// 封装导出Excel文件函数
import * as XLSX from "xlsx";
import getDatas from "@/network/index";
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


// 封装一个公共函数，现在需要请求后端数据，然后导出两个角色对应的用户数据，一个是协管角色，一个是主管角色
// 传入参数，返回对应的数组

export const exportUserData = async (type: string) => {
  const result = await GetuserList();
  // 确保 result 存在且包含所需属性
  if (!result) {
    return [];
  }

  if (type === "manager") {
    return result.managerData;
  } else if (type === "assistant") {
    return result.assistantData;
  } else {
    // 将两个数组合并一起返回
    return [...result.managerData, ...result.assistantData];
  }
};

// 请求主管角色\协管角色数据
const GetuserList = async () => {
  try {
    const response = await getDatas("system/GetUserRole");
    // 假设 getDatas 返回的是 axios 响应对象，需要根据实际封装调整
    // 如果 getDatas 已经处理了 data，则直接使用 response.code
    const resData = response.data || response;
    console.log(response, 'responseresponse');

    if (resData.code === 0) {
      let userList = resData.result?.records || [];

      // 遍历数组找到roleName = "主管角色" 和 "协管角色" 的对象
      let managerRole = userList.find((item: any) => item.roleName === "主管角色");
      let assistantRole = userList.find((item: any) => item.roleName === "协管角色");

      console.log(managerRole, assistantRole, 'managerRolemanagerRole');

      // 增加空值检查，防止找不到角色时报错
      if (!managerRole || !assistantRole) {
        console.warn("未找到主管角色或协管角色");
        return {
          managerData: [],
          assistantData: [],
        };
      }

      // 获取到对应角色的id,然后根据id请求对应的用户数据
      // 注意：这里假设 getDatas 返回的结构中包含 result.records  
      const managerRes = await getDatas("system/GetRoleListInfo", { roleId: managerRole.id, pageNo: 1, pageSize: 100 });
      const assistantRes = await getDatas("system/GetRoleListInfo", { roleId: assistantRole.id, pageNo: 1, pageSize: 100 });
      console.log(managerRes, assistantRes, 'managerResmanagerRes');

      // 根据实际接口返回结构调整取值方式，通常为 res.data.result.records 或 res.result.records
      const managerData = managerRes.data?.result?.records || managerRes.result?.records || [];
      const assistantData = assistantRes.data?.result?.records || assistantRes.result?.records || [];
      console.log(managerData, assistantData, 'managerDataassistantData');

      return {
        managerData,
        assistantData,
      };
    } else {
      return {
        managerData: [],
        assistantData: [],
      };
    }
  } catch (error) {
    console.error("Error fetching user list:", error);
    return {
      managerData: [],
      assistantData: []
    };
  }
};

