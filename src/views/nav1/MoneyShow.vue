<!-- 流水 -->
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<!-- <el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" >查询</el-button>
				</el-form-item>
			</el-form> -->
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<!-- <el-table-column prop="vc_order_sn" label=""  sortable>
				</el-table-column> -->
				<el-table-column prop="vc_nickname" label="昵称"  sortable>
				</el-table-column>
				<el-table-column prop="n_ymoney" label="充值金额"  :formatter="formatMoney" sortable>
				</el-table-column>
				<el-table-column prop="dt_addtime" label="购买时间"   sortable>
				</el-table-column>
				<el-table-column prop="vc_describe" label="商品与时间"  sortable>
				</el-table-column>
				<el-table-column prop="n_pay_type" label="支付方式"  :formatter="formatPay" sortable>
				</el-table-column>
				<!-- <el-table-column label="操作" width="80">
					<template slot-scope="scope">
						<el-button size="small" @click="show(scope.$index, scope.row)">详细</el-button>
					</template>
				</el-table-column> -->
				<!-- <el-table-column prop="n_ymoney" label="支付金额" width="120" :formatter="formatMoney" sortable>
				</el-table-column> -->
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getUserList } from '../../api/api';
	import {httpUrl, connetAction} from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				page:1,
				filters: {
					name: ''
				},
				loading: false,
				users: [
				]
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : '女';
			},
			formatFw:function(row,column){
				return row.n_otype == 1 ? '会员' : '星级';
			},
			formatPay:function(row,column){
				return row.n_pay_type == 1 ? '支付宝' : '微信';
			},
			formatMoney:function(row,column){
				return row.n_ymoney/100 +'（元）';
			},
			//获取流水列表
			getLs: function () {
				this.listLoading = true;
				let para = {
					page: this.page,
					pageNum:20
				};
				//NProgress.start();
				connetAction.ajaxPost(httpUrl['getAllBill'],para).then((res) => {
					this.listLoading = false;
					this.users = res.data;
				});
			},
			show:function(){
				
			}
		},
		mounted() {
			this.getLs();
		}
	};

</script>

<style scoped>

</style>