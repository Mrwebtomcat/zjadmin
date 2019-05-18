import axios from 'axios'
import Qs from 'qs'

let base = '';
let prodUrl = "http://server.zjxunhun.com/index.php/";
let APIURlS = {
	//登录
	login:"login/adminLogin",
	// 待审核
	showDsh:"admin_user/showDsh",  //page pageNum 
	updateSmType:"admin_user/updateSmType",  // 
	pushMessage:"admin_user/pushMessage",	//添加推送信息
	updateYzhy:"admin_user/updateYzhy",  // 设置为优质会员 type1   取消 type 0   id 用户
	// 会员费用信息表
	//所有会员用户信息
	showUserAll:'admin_user/showUserAll',
	//配置vip  n_time  n_money n_daymaony  n_sex
	addSetvip:"Huiyuan/addSetVip",			 //级配置vip服务
	delVip:'Huiyuan/delVip',				//删除  vip1   2星级  3特殊服务
	updateVip:'Huiyuan/updateVip',
	nvIndex:'Huiyuan/nvIndex',				//查看所有配置信息 1vip  2星级  3特殊服务加vip
	addSetStar:'Huiyuan/addSetStar',		//星级配置信息
	nvStar:'Huiyuan/nvStar',		//查看所有星级配置信息
	addSetFuwu:'Huiyuan/addSetFuwu',		//级配置特殊vip服务
	getAllBill: 'admin_bill/getAllBill',  	//流水
	getHNinfo: 'Hong_Niang/getInfo',  	//查询红娘
	addHNinfo: 'Hong_Niang/addInfo',  	//添加红娘
	updateHNinfo: 'Hong_Niang/updateInfo',  	//更新红娘
	delHNAlbum: 'Hong_Niang/delAlbum',  	//删除红娘
	getShopInfo:"Shop/getInfo",			//获取店铺信息
	addShopInfo:"Shop/addInfo",			//添加店铺
	updateShopInfo:"Shop/updateInfo",	//更新店铺
	delShopAlbum:"Shop/delAlbum",	//删除店铺
	getWdxx:'Llgz/getWdxx'			//查询信息
	
	
}
for(var key in APIURlS){
	APIURlS[key] = prodUrl+ APIURlS[key]
}

// export const requestLogin = params => { return axios.post(`${prodUrl}/login/adminLogin`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
// 
// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
// 
// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };
// 
// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };
// 
// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };
// 
// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
// 
// export const setVip = params => { return axios.get(`${base}/user/setvip`, { params: params }); };
// 
// export const getVipConfig = params => { return axios.get(`${base}/user/getVipSet`,{params:params});};
// http request 拦截器
axios.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})
axios.interceptors.response.use(function(response){
	if(response.data.code == '10034' || response.data.code == '10003'){
		return Promise.resolve(response.data)
	}else if(response.data.code != 200){
		return Promise.resolve(response.data)
    }else
		return  Promise.resolve(response.data)
	// console.log(response)
}, function (error) {
    // 响应错误
	return Promise.reject(error);
})
export const httpUrl =APIURlS;
export const connetAction = {
    ajaxPost (url, datainfo) {
        return axios({
            url: url,
            method: 'post',
            data: datainfo,
            transformRequest: [
              function(data) {
		        return Qs.stringify(data);
              }
            ],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    allpost(httpUrl, datainfo) {
        return axios({
          url: httpUrl,
          method: 'post',
          data: datainfo,
          headers: {
            'Content-Type': false
          },
         
        })
    },
    ajaxGet (getUrl) {
        return axios({
            url: getUrl,
            method: 'get',
        })
    }
}