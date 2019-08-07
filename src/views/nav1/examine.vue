<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item> -->
				<!-- <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column> -->
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="vc_username" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="n_sex" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="n_age" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column prop="vc_province" label="省份"  sortable>
			</el-table-column>
			<el-table-column prop="vc_city" label="城市" sortable>
			</el-table-column>
			<el-table-column prop="vc_area" label="地区"  sortable>
			</el-table-column>
			<el-table-column prop="n_sfzh" label="身份证号码" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="230">
				<template slot-scope="scope">
					<!-- <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button> -->
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<div class="flex">
					 <div class="l1">
						<el-form-item label="姓名:"  prop="vc_username">
							<span>{{editForm.vc_username}}</span>
						</el-form-item> 
						<el-form-item label="性别:"  prop="vc_username">
							<div>
								{{editForm.n_sex==1?'男':'女'}}
							</div>
						</el-form-item> 
					 </div>
					 <div class="r1" style="width:30%;">
						<el-form-item label="年龄:">
							<span>{{editForm.n_age}}岁</span>
						</el-form-item>
					 </div>
				</div>
				<div class="flex">
					 <div class="l1">
						<el-form-item label="证件号码:">
							<span style="display: inline-block;width: 100%;">
								{{editForm.n_sfzh}}
							</span>
						</el-form-item>
					 </div>
					 <div class="r1">
						<el-form-item label="生日:">
							<div>{{editForm.dt_csrq}}</div>
						</el-form-item>
						
					 </div>
				</div>
				<div class="flex">
					<div class="l1">
						<el-form-item label="职业:">
							<div>
								未知
							</div>
						</el-form-item>
					</div>
					<div class="r1">
						<el-form-item label="是否实名:">
							<el-radio-group v-model="editForm.n_issm"  @change="slecyesno">
								<el-radio class="radio" :label="1" value="1">是</el-radio>
								<el-radio class="radio" :label="0" value="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						
					</div>
				</div>	
				<div class="flex">
					<el-form-item label="地址:">
						<div>{{editForm.vc_city}}{{editForm.vc_area}}</div>
					</el-form-item>
				</div>
				<div  v-if="!editForm.n_issm">
					<el-form-item label="不通过原因:" label-width="100px" style="transform: translateX(-20px);">
						<el-input v-model="editForm.vc_nosm"  value=""  placeholder="请输入原因"></el-input>
					</el-form-item>
				</div>
			<div>
				
			</div>
				
				<div class="flex" style="height:35px;" v-if="editForm.n_issm=='是'||editForm.n_issm==1">
					<div>
						<el-form-item label="是否赠送">
							<el-switch
							v-model="value2"
							active-color="#13ce66"
							inactive-color="#ff4949">
							</el-switch>
						</el-form-item>
					</div>
				</div>	
				<div v-show="value2">
						 <el-radio-group v-model="radio2">
								<el-radio v-for="(item,index) in hylist" :key="index" :label="item.id" :value="item.id">{{vipNotice(item)}}</el-radio>
						</el-radio-group>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		
		<el-dialog title="查看" v-model="editFormshow" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<div class="flex">
					 <div class="l1">
						<el-form-item label="姓名:"  prop="vc_username">
							<!-- <span>阎娜</span> -->
							<el-input v-model="editForm.vc_username"></el-input>
						</el-form-item> 
						<el-form-item label="性别:"  prop="vc_username">
							<!-- <span>阎娜</span> -->
							<!-- <el-input :value="editForm.n_sex?'男':'女'"></el-input> -->
							<div>
								{{editForm.n_sex?'男':'女'}}
							</div>
						</el-form-item> 
					 </div>
					 <div class="r1" style="width:30%;">
						<el-form-item label="年龄:">
							<span>{{editForm.n_age}}岁</span>
							<!-- <el-input-number v-model="editForm.n_age" :min="0" :max="200"></el-input-number> -->
						</el-form-item>
					 </div>
				</div>
				<div class="flex">
					 <div class="l1">
						<el-form-item label="证件号码:">
							<span style="display: inline-block;width: 100%;">
								<!-- <el-input :value="editForm.n_sfzh"></el-input> -->
								{{editForm.n_sfzh}}
							</span>
						</el-form-item>
					 </div>
					 <div class="r1">
						<el-form-item label="生日:">
							<!-- <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker> -->
							<div>{{editForm.dt_csrq}}</div>
						</el-form-item>
						
					 </div>
				</div>
				<div class="flex">
					<div class="l1">
						<el-form-item label="职业:">
							<div>
								<!-- {{editForm.vc_worke}} -->
								未知
							</div>
							<!-- <el-input value="440802292929282812" auto-complete="off"></el-input> -->
							<!-- <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number> -->
						</el-form-item>
					</div>
					<div class="r1">
						<el-form-item label="是否实名:">
							<el-radio-group v-model="editForm.n_issm">
								<el-radio class="radio" :label="1" value="1">是</el-radio>
								<el-radio class="radio" :label="0" value="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						
					</div>
				</div>	
				
				
				<!-- <el-form-item label="择偶条件">
					<el-input type="textarea" value="广东 | 湛江 | 麻章区 | 18-20岁 | 女性 | 医生职业 | 薪资3000~5000元左右 | 有房 | 1年内结婚 | 婚后需要能生小孩 | 要有房子还是和家人居住" ></el-input>
				</el-form-item> -->
				<div class="flex">
					<el-form-item label="地址:">
						<!-- <el-input type="text" v-model="editForm.adress"></el-input> -->
						<div>{{editForm.vc_city}}{{editForm.vc_area}}</div>
					</el-form-item>
				</div>
				<div  v-if="!editForm.n_issm">
					<el-form-item label="不通过原因:" label-width="100px" style="transform: translateX(-20px);">
						<el-input v-model="editForm.yuanyin"  value=""  placeholder="请输入原因"></el-input>
					</el-form-item>
				</div>
			<div>
				
			</div>
				
				<div class="flex" style="height:35px;" v-if="editForm.n_issm=='是'||editForm.n_issm==1">
					<div>
						<el-form-item label="是否赠送">
							<el-switch
							v-model="editForm.n_isvip"
							active-color="#13ce66"
							inactive-color="#ff4949">
							</el-switch>
						</el-form-item>
					</div>
				</div>	
				<div v-show="editForm.n_isvip">
						 <el-radio-group v-model="editForm.vipid">
								<el-radio v-for="(item,index) in hylist" :key="index" :label="item.id">{{vipNotice(item)}}</el-radio>
						</el-radio-group>
					</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
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
				adress:"",
				radio2:0,
				value2:false,
				users: [],
				total: 0,
				page: 1,
				hylist:[],
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
					id: 1,
					n_age: 19,
					n_issm:0,
					n_sex: 1,
					n_sfzh: 0,
					vc_area: "坡头区",
					vc_city: "湛江",
					vc_province: "广东"
				},

				addFormVisible: false,//新增界面是否显示
				editFormshow: false,//查看界面是否显示
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
				row.n_issm = 0;
				return row.n_sex == 1 ? '男' :'女';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.showDSh();
			},
			//获取用户列表
			getUsers:function(){
				console.log(1)
			},
			//获取shenhe列表
			showDSh() {
				let para = {
					page: this.page,
					// pageNum: this.filters.name
					pageNum:20
				};
				this.listLoading = true;
				let  that = this;
				connetAction.ajaxPost(httpUrl['showDsh'],para)
				.then((res)=>{
					console.log(res)
						this.users = res.data
						this.listLoading = false;
				})
				.catch((res)=>{
					
				})
			},
			slecyesno:function(e){
				this.editForm.n_issm = e
			},
			vipNotice:function(data){
				var str = '';
				if(data.n_time==1){
					str ="赠送会员一个月，原价"+data['n_money']+'元';
				}else if(data.n_time==6){
					str ="赠送会员六个月，原价"+data['n_money']+'元';
				}else if(data.n_time==12){
					str ="赠送会员一年，原价"+data['n_money']+'元';
				}
				if(data.n_type==3){
					str+="享受特权礼仪设计，美容纹眉毛,到店学习礼仪等特权"
				}
				return str;
			},
			nvIndex() {
				let para = {
					page: this.page,
					// pageNum: this.filters.name
					pageNum:20
				};
				console.log(this.users,333)
				this.listLoading = true;
				//NProgress.start();
				connetAction.ajaxPost(httpUrl['nvIndex'],{type:1}).then((res) => {
					this.listLoading = false;
					this.hylist = res.data;
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
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
				this.adress = this.editForm.vc_province +  this.editForm.vc_city +this.editForm.vc_area
				var arr = this.hylist.filter((item)=>item.n_sex==this.editForm.n_sex);
				this.hylist = arr;
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				let param = {
					oc_usercode:this.editForm.id,
					n_issm:this.editForm.n_issm==1?2:this.editForm.n_issm,
					vipid:this.radio2?this.radio2:0,
					vc_nosm:this.editForm.vc_nosm?this.editForm.vc_nosm:''
				}
				
				this.$refs.editForm.validate((valid) => {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
								connetAction.ajaxPost(httpUrl['updateSmType'],param).then((res) => {
										this.addLoading = false;
										this.$message({
											message: '提交成功',
											type: 'success'
										});
										this.$refs['editForm'].resetFields();
										this.editFormVisible = false;
										this.showDSh();
								});
								
						});
				});
			},
			
			selsChange: function (sels) {
				this.sels = sels;
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
						this.showDSh();
					});
				}).catch(() => {

				});
			}
		},
		created(){
			this.showDSh();
			this.nvIndex()
		},
		mounted() {
			
		}
	}

</script>

<style scoped>
.flex{
	display: flex;
}
.l1,.r1{
	flex: 0 0 50%;
}
</style>

