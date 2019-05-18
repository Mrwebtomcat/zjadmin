<template>
	<div class="message_M">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" @click="handleAdd" >新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表 -->
		<el-table :data="listMessage" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="id" label="创建时间" width="120"  sortable>
			</el-table-column>
			<el-table-column prop="dateM" label="消息标题"  sortable>
			</el-table-column>	
			<el-table-column prop="money" label="消息描述"  sortable>
			</el-table-column>
			<el-table-column prop="money" label="消息内容"  sortable>
			</el-table-column>
		</el-table>
		<!-- 新增弹窗 -->
		<el-dialog title="新增消息" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
				<el-form-item label="消息标题">
					<el-input v-model="form.vc_title"></el-input>
				</el-form-item>
				<el-form-item label="消息描述">
					<el-input v-model="form.vc_desc"></el-input>
				</el-form-item>
				<el-form-item label="消息内容">
					<el-input type="textarea" v-model="form.vc_content"></el-input>
				</el-form-item>
				<el-form-item label="推送用户选择:" label-width="200">
					<div class="flex">
						<el-checkbox-group v-model="form.type.vip">
							<el-checkbox label="vip用户" name="vip"></el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="form.type.star">
							<el-checkbox label="星级用户" name="start"></el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="form.type.teshu">
							<el-checkbox label="特殊服务用户" name="teshu"></el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="form.type.pt">
							<el-checkbox label="普通用户" name="pt"></el-checkbox>
						</el-checkbox-group>
					</div>
					
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="addSubmit"  :loading="addLoading">立即创建</el-button>
					<el-button @click.native="addFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import {httpUrl, connetAction} from '../../api/api';
	export default {
		data() {
			return {
				addFormVisible:false,
				addLoading:false,
				filters:{},
				listLoading:false,
				listMessage:[],
				form: {
					vc_title: '',
					vc_desc: '',
					vc_content: '',
					type: {
						"vip": 0,
						"star": 0,
						"teshu": 0,
						"pt": 0
					}
				}
			}
		},
		
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			addSubmit() {
				let param = Object.assign({},this.form);
				// this.addLoading = false;
				// this.addFormVisible = false;
				
				if(param.type.vip){
					param.type.vip = 1;
				}else{
					param.type.vip = 0;
					
				}
				if(param.type.star){
					param.type.star = 1;
				}else{
					param.type.star = 0;
					
				}
				if(param.type.teshu){
					param.type.teshu = 1;
				}else{
					param.type.teshu = 0;
					
				}
				if(param.type.pt){
					param.type.pt = 1;
				}else{
					param.type.pt = 0;
					
				}
				param.type = JSON.stringify(param.type)
				console.log(param)
				this.$confirm('确认创建？', '提示', {}).then(() => {
					this.addLoading = true;
					connetAction.ajaxPost(httpUrl['pushMessage'],param)
					.then((res)=>{
							// this.Vipdata = res.data;
							this.addLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.addFormVisible = false;
							this.getVipList();
					})
					
				});
			},
			handleAdd() {
				this.addFormVisible = true;
			},
			selsChange(){
				
			}
		}
	}

</script>
<style scoped>
	.flex{
		display: flex;
	}
	.flex .el-checkbox-group{
		margin-left: 20px;
	}
	.el-checkbox-group:first-child{
		margin-left: 0;
	}
</style>