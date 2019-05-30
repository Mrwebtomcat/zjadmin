<!-- 用户列表 -->
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			<!-- 	<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column> -->
			<el-table-column type="index" label="序号" width="70">
			</el-table-column>
			<el-table-column prop="vc_nickname" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="n_sex" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="n_age" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column prop="dt_csrq" label="生日" width="120" sortable>
			</el-table-column>
			<el-table-column prop="vc_area" label="地址" :formatter="formatAdress" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="230">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
					<el-button type="primary" plain size="small" v-if="scope.row.n_isyzhy==0" @click="yzhyuan(scope.$index, scope.row,1)">设置优质会员</el-button>
					<el-button type="warning" size="small" v-else @click="yzhyuan(scope.$index, scope.row,0)">取消优质会员</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->

		<!--编辑界面-->
		<el-dialog title="用户详情" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<div class="flex">
					 <div class="l1">
						<el-form-item label="姓名:"  prop="name">
							<span>{{editForm.vc_username&&editForm.vc_username!=""?editForm.vc_username:'未填写'}}</span>
						</el-form-item> 
					 </div>
					 <div class="r1">
						<el-form-item label="性别:">
							{{editForm.n_sex==1?'男':'女'}}
						</el-form-item> 
					 </div>
					 <div class="l1">
						 <el-form-item label="用户身份:">
								<span>{{editForm.n_isvip==1?'会员用户':'普通用户'}}</span>
						 </el-form-item> 
					 						
					 </div>
				</div>
				<div class="flex">
					 
					 <div class="r1">
						<el-form-item label="出生日期:">
							<span>{{editForm.dt_csrq}}</span>
						</el-form-item>
					 </div>
					 <div class="l1">
					 	<el-form-item label="年龄:">
							<span>{{editForm.n_age}}</span>
					 	</el-form-item>
					 </div>
					<el-form-item label="地址:">
						<div>
							{{editForm.vc_province}} | {{editForm.vc_city}} | {{editForm.vc_area}}
						</div>
					</el-form-item>
				</div>
				<div class="flex">
					<div class="l1">
						<el-form-item label="星级用户:">
							<span>{{editForm.n_isstar==1?'是':'否'}}</span>
						</el-form-item>
					</div>
					<div class="l1" >
						<el-form-item label="特殊用户:">
							<span>{{editForm.n_istsfw==1?'是':'否'}}</span>
						</el-form-item>
					</div>
					<div class="l1"></div>
					
				</div>	
				
			</el-form>
		</el-dialog>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	 import { connetAction,httpUrl,ajaxPost} from '../../api/api';
	// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users:[],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					vc_username: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					dt_csrq: "2019-04-08",
					id: 5,
					n_age: 15,
					n_sex: 1,
					n_sfzh: 4,
					vc_area: "628",
					vc_city: "65",
					vc_province: "5",
					vc_username: "雪漫"
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.n_sex == 1 ? '男' : row.n_sex == 2 ? '女' : '未知';
			},
			formatAdress: function (row, column) {
				return row.vc_province+row.vc_city+row.vc_area
			},
			yzhyuan: function (index,row,type) {
				let str = "确认设置为优质会员";
				if(type==0){
					str = "确认取消该用户的优质会员";
				}
				this.$confirm(str, '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id,type};
				
					connetAction.ajaxPost(httpUrl['updateYzhy'],para).then((res) => {
							// this.total = res.data.total;
							this.$message({
								message: type?'设置成功':'取消成功',
								type: 'success'
							});
							//this.$refs['editForm'].resetFields();
							this.listLoading = false;
							this.getUsers();
							//NProgress.done();
						});
						 // window.location.reload();
						//this.getUsers();
					});
				
				return false
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers(type) {
				let para = {
					page: this.page,
					pageNum:20
				};
				if(type){
					para.vc_nickname = this.filters.name;
				}
				this.listLoading = true;
				//NProgress.start();
				connetAction.ajaxPost(httpUrl['showUserAll'],para).then((res) => {
					// this.total = res.data.total;
					this.users = res.data;
					
					this.listLoading = false;
					//NProgress.done();
				});
			},
			nvIndex() {
				let para = {
					page: this.page,
					// pageNum: this.filters.name
					pageNum:20
				};
				this.listLoading = true;
				//NProgress.start();
				connetAction.ajaxPost(httpUrl['nvIndex'],para).then((res) => {
					//this.total = res.data.total;
					//this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				this.getuerList(this.editForm.id);
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			getuerList:function(id){
				
				let data = {
					oc_usercode:id
				}
				
				connetAction.ajaxPost(https['index'], data)
					.then(rd => {
						if(rd.status==1){
							this.searchList = rd.data.tjList;
							console.log(this.searchList)
						}
					})
					.catch(res => {
						// console.log(res,"res")
					})
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		created(){
			this.getUsers();
		},
		mounted() {
			// this.nvIndex();
		}
	}

</script>

<style scoped>
.flex{
	display: flex;
	justify-content: space-between;
}
.l1,.r1{
	flex: 0 0 30%;
}
</style>