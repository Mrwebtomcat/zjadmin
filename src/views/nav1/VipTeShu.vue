<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		
		<el-table :data="Vipdata" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="id" label="#"  sortable>
			</el-table-column>
			<el-table-column prop="n_time" label="开通月份"  sortable>
			</el-table-column>
			<el-table-column prop="vc_daymoney" label="会员日均费用"  sortable>
			</el-table-column>
			<el-table-column prop="n_money" label="开通金额"  sortable>
			</el-table-column>	
			<el-table-column prop="n_type" :formatter="formatSex" label="性别"  sortable>
			</el-table-column>
			<el-table-column prop="dt_addtime"  width="200"  label="添加时间"  sortable>
			</el-table-column>
			<el-table-column label="操作" width="230">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm1" label-width="150px" :rules="addFormRules" ref="editForm">
				<el-form-item label="会员开通月数">
					<el-input v-model="addForm1.n_time" auto-complete="off" ></el-input>
				</el-form-item>
				<el-form-item label="日均消费" >
					<el-input v-model="addForm1.vc_daymoney" ></el-input>
				</el-form-item>
				<el-form-item label="性别" >
					<el-radio-group v-model="addForm1.n_sex">
						<el-radio v-for="(item,index) in ['男','女']" :key="index" class="radio" :value="index+1" :label="index+1">{{item}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="会员开通金额" >
					<el-input v-model="addForm1.n_money" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="150px" :rules="addFormRules" ref="addForm">
				<el-form-item label="会员开通月数" prop="n_time">
					<el-input v-model="addForm.n_time" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="日均消费" prop="vc_daymoney">
					<el-input v-model="addForm.vc_daymoney"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="n_sex">
					<el-radio-group v-model="addForm.n_sex">
						<el-radio v-for="(item,index) in ['男','女']" :key="index" class="radio" :value="index+1" :label="index+1">{{item}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="会员开通金额" prop="n_money">
					<el-input v-model="addForm.n_money"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import {httpUrl, connetAction} from '../../api/api';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				addForm1:{},
				Vipdata:[],
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					// id: 0,
					// name: '',
					// sex: -1,
					// age: 0,
					// birth: '',
					// addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					n_time: [
						{ required: true, message: '请设置会员月份', trigger: 'blur' }
					],
					// n_sex: [
					// 	{ required: true, message: '请设置会员充值生效的性别', trigger: 'blur' }
					// ],
					vc_daymoney: [
						{ required: true, message: '请设置会员日均消费金额', trigger: 'blur' }
					],
					n_money: [
						{ required: true, message: '请设置会员充值月份对应金额', trigger: 'blur' }
					]
					
				},
				//新增界面数据
				addForm: {
					n_time: '2019-4-26',
					n_sex: 1,
					n_money: 0,
					vc_daymoney: 0
					
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				console.log(column)
				return row.n_sex == 1 ? '男' : '女' ;
			},
			handleCurrentChange(val) {
				this.page = val;
				// this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			getVipList() {
				//NProgress.start();
				connetAction.ajaxPost(httpUrl['nvIndex'],{type:3})
				.then((res)=>{
					console.log(res)
						//this.editForm = res.data
						this.Vipdata = res.data;
						this.listLoading = false;
				})
				.catch((res)=>{
					
				})
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					connetAction.ajaxPost(httpUrl['delVip'],para)
					.then((res)=>{
							// this.Vipdata = res.data;
							this.listLoading = false;
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getVipList();
					})
					.catch((res)=>{
						
					})
					
				}).catch(() => {
			
				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.addForm1 = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {};
			},
			//编辑
			editSubmit: function () {
			
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认编辑吗？', '提示', {}).then(() => {
							this.listLoading = true;
							connetAction.ajaxPost(httpUrl['updateVip'],this.addForm1)
							.then((res)=>{
									// this.Vipdata = res.data;
									this.listLoading = false;
									this.$message({
										message: '编辑成功',
										type: 'success'
									});
									this.editFormVisible = false;
									this.getVipList();
							})
							
						});
						
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							connetAction.ajaxPost(httpUrl['addSetFuwu'],para)
							.then((res)=>{
								this.$message({
									message: res.message,
									type: 'success'
								});
									//this.editForm = res.data
								this.listLoading = false;
								this.addFormVisible = false;
								this.getVipList();
							})
							.catch((res)=>{
								
							})
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			getOther(){
				getVipConfig('').then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '请求数据成功',
						type: 'success'
					});
					this.Vipdata = res.data.vipdata
				});
			}
		},
		mounted() {
			this.getVipList();
		}
	}

</script>

<style scoped>
.el-table .cell{
	text-align:center;
}
</style>