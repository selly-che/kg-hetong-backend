export default {
  getTiKu(meta:any){
    return {
      url:"/exam/many/",
      params:{
        page:1,
        xk: meta.xk ? meta.xk:"html"
      }
    }
  }
}