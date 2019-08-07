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
			<el-table-column prop="dt_addtime" label="创建时间" width="200"  sortable>
			</el-table-column>
			<el-table-column prop="vc_hdname" label="消息标题"  sortable>
			</el-table-column>	
			<el-table-column prop="vc_hdmeta" label="消息描述"  sortable>
			</el-table-column>
			<el-table-column prop="vc_content" label="消息内容"  sortable>
			</el-table-column>
			<el-table-column prop="vc_img" label="图片信息"  sortable>
				<template slot-scope="scope">
					<img :src="scope.row.vc_img" style="width: 80%;border-radius: 10%;margin: 15px 0 10px;" alt="">
				</template>
			</el-table-column>
			<el-table-column label="操作" width="230">
				<template slot-scope="scope">
					<el-button size="small" v-if="scope.row.n_is_action==1" >已启用</el-button>
					<el-button size="small" v-else type="primary"  @click="qiyong(scope.$index, scope.row)">启用</el-button>
					<!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!-- 商户信息通知 -->
		<el-dialog title="新增消息" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
				<el-form-item label="消息标题">
					<el-input v-model="form.vc_hdname"></el-input>
				</el-form-item>
				<el-form-item label="消息描述">
					<el-input v-model="form.vc_hdmeta"></el-input>
				</el-form-item>
				<el-form-item label="消息内容">
					<el-input type="textarea" v-model="form.vc_content"></el-input>
				</el-form-item>
				<el-form-item label="封面图片">
					<input type="file" accept="image/*"  value=""  @change="inputImg" />
				</el-form-item>
				<el-form-item label=" ">
					<img class="imgcs" :src="form.vc_img" alt="">
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="addShopinfo"  :loading="addLoading">立即创建</el-button>
					<el-button @click.native="addFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
		
		<!-- 新增弹窗 -->
		<!-- <el-dialog title="新增消息" v-model="addFormVisible" :close-on-click-modal="false">
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
		</el-dialog> -->
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
					vc_img:'',
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
			handleDel(index,rowdata){
				let that = this;
				this.$confirm('确认删除？', '提示', {}).then(() => {
					connetAction.ajaxPost(httpUrl['delShopMsg'],{id:rowdata.id})
					.then((res)=>{
							// this.Vipdata = res.data;
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							that.getMessData();
					})
				})
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
			addShopinfo:function(){
				let {vc_hdname,vc_hdmeta,vc_content,vc_img} = this.form;
				let param = {
					vc_hdname:vc_hdname,
					vc_hdmeta:vc_hdmeta,
					vc_content:vc_content,
					vc_img:vc_img
				}
				console.log(param,32132);
				
				if(!param.vc_hdname){
					this.$message({
						message: '活动名称不能为空',
						type: 'success'
					});	
					return false;
				}
				if(!param.vc_hdmeta){
					this.$message({
						message: '活动描述不能为空',
						type: 'success'
					});	
					return false;
				}
				// if(!param.vc_img){
				// 	this.$message({
				// 		message: '活动图片不能为空',
				// 		type: 'success'
				// 	});	
				// 	return false;
				// }
				this.addLoading = true;
				connetAction.ajaxPost(httpUrl['pushShopMessage'],param)
				.then((res)=>{
						this.addLoading = false;
						this.addFormVisible = false;
						// this.Vipdata = res.data;
						this.getMessData();
				})
			},
			handleAdd() {
				this.addFormVisible = true;
			},
			qiyong:function(i,data){
				let idarr = [];
				for(var i=0;i<this.listMessage.length;i++){
					if(this.listMessage[i].id==data.id){
						this.listMessage[i].n_is_action = 1;
					}else{
						this.listMessage[i].n_is_action = 0;
					}
					
				}
				let param = {
					list:this.listMessage
				}
				connetAction.ajaxPost(httpUrl['dyShop'],param)
				.then((res)=>{
					if(res.status){
						this.getMessData();
					}
				})
				
			},
			inputImg(e){
				var that=this;
				var file = e.target.files[0];
				var imgSize=file.size/1024;
				if(imgSize>3120){
					alert('请上传大小不要超过3M的图片')
				}else{
					var reader = new FileReader();
					reader.readAsDataURL(file); // 读出 base64
					reader.onloadend = function () {
						// 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
						that.form.vc_img = reader.result;
					};
				}
				
			},
			getMessData:function(){
				// listMessage
				connetAction.ajaxPost(httpUrl['getShopMessg'],{})
				.then((res)=>{
					this.listMessage = res.data;
				})
			},
			selsChange(){
				
			}
		},
		mounted(){
			console.log(1)
			this.getMessData();
			// this.addShopinfo();
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
	.imgcs{
		width:100px ;
		height: 100px;
	}
</style>