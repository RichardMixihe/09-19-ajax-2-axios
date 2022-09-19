// 会要发很多次请求，有获取图书、添加图书、别除图书、修改图书
// 目前的问题是，每次请求，都要写根路径http://www.itcbc.com:3306
// 每次都写，太麻烦，可以统一配置
// axios提供全局配置方案

axios.defaults.baseURL = 'http://www.itcbc.com:3006';
// 全局配置好跟路径，后续的所有请求，都不用写根路径了。

// 其他请求方法
// axios.get(url,请求的配置对象（可选）)             [专门发送GET类型的请求]
// axios.delete(url，请求的配置对象（可选）)          [专门发送DELETE类型的请求]
// axios.get('/api/getbooks').then(({data:res})=>{
//     console.log(res);
// })
// axios.get('/api/getbooks',{
//     params:{
//         appkey:'laotang110022'
//     }
// }).then(({data:res})=>{
//     console.log(res);

// })

// axios.get('/api/getbooks',{
//     params:{
//         appkey:'laotang110022'
//     }
// }).then(({data:res})=>{
//     console.log(res.data);

// })
// axios.post(url,data,请求的配置对象)            [专门发送POST类型的请求]
// axios.put(url,data,请求的配置对象)             [专门发送PUT类型的请求]
// axios.patch(url,data,请求的配置对象)           [专门发送PATCH类型的请求]

// axios.post('/api/addbook',{
//     bookname:'test',
//     author:'test',
//     publisher:'test'
// }).then(({data:res}) =>{
//     console.log(res);
// })

const appkey = 'Richard2'
// ------------------------获取图书并展示-------------------------------
function renderBooks() {
    axios.get('/api/getbooks',{
        params:{
            appkey
        }
    }).then(({data:res})=>{
        console.log(res);
        const arr = res.data.map(item => {
            return `
            <tr>
          <th scope="row">${item.id}</th>
          <td>${item.bookname}</td>
          <td>${item.author}</td>
          <td>${item.publisher}</td>
          <td>
            <button data-id=${item.id} type="button" class="btn btn-link btn-sm btn-delete">删除</button>
            <button type="button" class="btn btn-link btn-sm btn-update">编辑</button>
          </td>
        </tr>`
        })
        document.querySelector('tbody').innerHTML= arr.join('');//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素
    
    })
}
renderBooks();
// ------------------------添加图书-------------------------------
// 1.实例化模态框
const addModel = new bootstrap.Modal(document.querySelector('#addModal'));

// 2.点击添加按钮，出现模态框
document.querySelector('.btn-success'). addEventListener('click',function () {
    addModel.show();
})

// 3.点击模态框中的确认按钮，获取表单各项值，ajax提交，完成添加
document.querySelector('#addBtn'). addEventListener('click',function () {
    //获取表单各项的值
    // const data = val(表单)
    // const data = val(document.querySelector('#addform'));
    const data =val(document.querySelector('#addForm'))

    data.appkey = appkey;//给对象加入appkey属性
    // console.log(data);
    axios.post('/api/addbook',data).then(({data:res})=>{
        addModel.hide();
        renderBooks();
        document.querySelector('#addForm').reset();//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素
    })

})//绑定事件
// ------------------------删除图书-------------------------------
//事件未脱的方式注册事件
document.querySelector('tbody'). addEventListener('click',function (e) {
    //判断是否点击删除
    if (e.target.classList.contains('btn-delete')) {
        const id = e.target.dataset.id;
        // console.log(id);
        axios.delete('/api/delbook',{
            params:{
                id,
                appkey
            }
        }).then(({data:res}) => {
            renderBooks()
        })

    }
    //判断是否点击编辑
    if (e.target.classList.contains('btn-update')) {
        
    }

})//绑定事件;//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素





// ------------------------修改图书-------------------------------