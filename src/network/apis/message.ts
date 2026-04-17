///jeecg-boot/projectcontract/taskArrangemenTodo/list
export default {
    //获取代办列表/jeecg-boot/projectcontract/taskArrangemenTodo/list
    getTaskArrangementTodoList(params: any) {
        return ({
            url: '/projectcontract/taskArrangemenTodo/list',
            method: 'get',
            params,
        })
    },
    //关闭代办/jeecg-boot/projectcontract/taskArrangemenTodo/closeTaskTodo
    closeTaskTodo(params: any) {
        return ({
            url: '/projectcontract/taskArrangemenTodo/closeTaskTodo',
            method: 'post',
            params,
        })
    }
}