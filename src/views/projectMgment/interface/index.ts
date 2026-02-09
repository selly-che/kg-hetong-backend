// export interface categoryType {
//   railway: string;
//   tunnel: string;
//   bridge: string;
//   road: string;
// }
// 项目类型
export interface categoryType {
  [key: string]: any;
}

// 项目列表接口
export interface Project {
  id: number;
  projectType: string;
  projectStatus: number;
  projectShortName: string;
  internalContractCount: number;
  externalContractCount: number;
}
