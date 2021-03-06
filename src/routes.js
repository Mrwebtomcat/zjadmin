import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import UserList from './views/nav1/UserList.vue'
import TeShu from './views/nav1/VipTeShu.vue'
import Form from './views/nav1/Form.vue'
import Message from './views/nav1/Message.vue'
import MoneInfo from './views/nav1/MoneyShow.vue'
import SetVip from './views/nav1/VipSetMoney.vue'
import Examine from './views/nav1/examine.vue'
import SetStart from './views/nav1/StartSet.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import ShopCon from './views/shop/ShopConfig.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '会员管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main,  hidden: true },
            { path: '/userlist', component: UserList, name: '用户列表' },
            { path: '/examine', component: Examine, name: '实名审核' },
            // { path: '/form', component: Form, name: '会员活动推送' },
            { path: '/message', component: Message, name: '会员消息推送' },
            { path: '/moneyshow', component: MoneInfo, name: '会员充值流水' },
            { path: '/vipset', component: SetVip, name: '会员金额配置' },
            { path: '/teshu', component: TeShu, name: '特殊服务会员金额配置' },
            { path: '/startset', component: SetStart, name: '星级金额配置' }
            // { path: '/user', component: user, name: '明星榜' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '红娘',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '红娘列表' },
            { path: '/page5', component: Page5, name: '红娘未读信息' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/ShopCon', component: ShopCon, name: '店铺管理' }
        ]
    },
	// {
 //        path: '/',
 //        component: Home,
 //        name: '',
 //        iconCls: 'fa fa-address-card',
 //        leaf: true,//只有一个节点
 //        children: [
 //            { path: '/page6', component: Page6, name: '形象设计' }
 //        ]
 //    },
//     {
//         path: '/',
//         component: Home,
//         name: 'Charts',
//         iconCls: 'fa fa-bar-chart',
//         children: [
//             { path: '/echarts', component: echarts, name: 'echarts' }
//         ]
//     },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;