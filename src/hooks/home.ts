import {data} from "./store";
import getDatas from "@/network/index";
data.msg = "45645645";


//home页面修改数据的方案 
const homeClick = async ()=>{
  data.msg = "今天是美好的一天";
  //获取题库数据 
  const res = await getDatas("zhoukao/getTiKu");
  console.log(res);
};

export {
  homeClick,
  data
}