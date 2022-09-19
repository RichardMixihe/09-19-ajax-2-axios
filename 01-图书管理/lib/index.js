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

const appkey = 'Richard'
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
// ------------------------删除图书-------------------------------
// ------------------------修改图书-------------------------------