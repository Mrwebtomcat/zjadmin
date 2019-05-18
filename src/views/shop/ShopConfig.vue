<!-- 店铺信息管理 -->
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
			<el-table-column prop="id" label="#" width="80"  sortable>
			</el-table-column>
			<el-table-column prop="vc_shopname" label="店铺昵称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="vc_shopdesc" label="店铺描述"  sortable>
			</el-table-column>
			<el-table-column prop="vc_shopcity" label="店铺地址"  sortable>
			</el-table-column>
			<el-table-column  label="店铺照片"  sortable>
					<template slot-scope="scope">
						<img :src="scope.row.vc_shopimg" style="width: 80%;border-radius: 10%;margin: 15px 0 10px;" alt="">
					</template>
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
			<el-form :model="editForm" label-width="150px" :rules="addFormRules" ref="editForm">
				<el-form-item label="店铺昵称" >
					<el-input v-model="editForm.vc_shopname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="店铺描述" >
					<el-input v-model="editForm.vc_shopdesc"></el-input>
				</el-form-item>
				<el-form-item label="店铺地址" >
					<el-input v-model="editForm.vc_shopcity"></el-input>
				</el-form-item>
				<el-form-item label="店铺经度" >
					<el-input v-model="editForm.vc_longitude"></el-input>
				</el-form-item>
				<el-form-item label="店铺纬度" >
					<el-input v-model="editForm.vc_latitude"></el-input>
				</el-form-item>
				<el-form-item label="店铺照片" prop="vc_shopimg">
					<el-upload
					  class="avatar-uploader"
					  action=""
					  :http-request="myuphongn"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
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
				<el-form-item label="店铺昵称" >
					<el-input v-model="addForm.vc_shopname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="店铺描述" >
					<el-input v-model="addForm.vc_shopdesc"></el-input>
				</el-form-item>
				<el-form-item label="店铺地址" >
					<el-input v-model="addForm.vc_shopcity"></el-input>
				</el-form-item>
				<el-form-item label="店铺经度" >
					<el-input v-model="addForm.vc_longitude"></el-input>
				</el-form-item>
				<el-form-item label="店铺纬度" >
					<el-input v-model="addForm.vc_latitude"></el-input>
				</el-form-item>
				
				<el-form-item label="店铺照片" prop="vc_shopimg">
					<el-upload
					  class="avatar-uploader"
					  action=""
					  :http-request="myuphongn"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
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
				imageUrl: '',
				filters: {
					name: ''
				},
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
					vc_shopname: [
						{ required: true, message: '请填写店铺名称', trigger: 'blur' }
					],
					vc_shopcity: [
						{ required: true, message: '请填写店铺地址', trigger: 'blur' }
					],
					vc_shopdesc: [
						{ required: true, message: '请填写店铺描述', trigger: 'blur' }
					],
					vc_longitude: [
						{ required: true, message: '请填写店铺经度', trigger: 'blur' }
					],
					vc_latitude: [
						{ required: true, message: '请填写店铺纬度', trigger: 'blur' }
					]
					
				},
				//新增界面数据
				addForm: {
					n_time: '2019-4-26',
					n_sex: 1,
					n_money: 0,
					vc_daymoney: 0
					
				},
				reader:""

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
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
			getListData() {
				//NProgress.start();
				connetAction.ajaxPost(httpUrl['getShopInfo'],"")
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
					let para = { id: row.id,vc_shopimg:row.vc_shopimg};
					connetAction.ajaxPost(httpUrl['delShopAlbum'],para)
					.then((res)=>{
						console.log(res)
							// this.Vipdata = res.data;
							this.listLoading = false;
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.getListData();
					})
					.catch((res)=>{
						
					})
					
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				this.imageUrl = this.editForm.vc_shopimg;
				console.log(this.editForm)
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {};
				this.imageUrl=  "";
			},
			//更新编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = this.editForm;
							para.vc_shopimg = this.imageUrl;
							this.editLoading = true;
							connetAction.ajaxPost(httpUrl['updateShopInfo'],para)
							.then((res)=>{
									this.editLoading = false;
									this.$message({
										message: '店铺资料更新成功',
										type: 'success'
									});
									this.$refs['editForm'].resetFields();
									this.editFormVisible = false;
									this.getListData();
							})
							.catch((res)=>{
								
							})
							
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				let param = this.addForm;
				param.vc_shopimg = this.imageUrl;
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							
							this.addLoading = true;
							connetAction.ajaxPost(httpUrl['addShopInfo'],param)
							.then((res)=>{
								console.log(res)
									//this.editForm = res.data
									this.Vipdata = res.data;
									this.listLoading = false;
									this.addFormVisible = false;
									this.getListData();
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
			myuphongn:function(file){
				this.getBase64(file.file).then(res=>{
					this.imageUrl = res
				})
				
			},
			getBase64(file) {
			  return new Promise(function(resolve, reject) {
				let reader = new FileReader();
				let imgResult = "";
				reader.readAsDataURL(file);
				reader.onload = function() {
				  imgResult = reader.result;
				};
				reader.onerror = function(error) {
				  reject(error);
				};
				reader.onloadend = function() {
				  resolve(imgResult);
				};
			  });
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				// console.log(this.imageUrl,666668888)
				if (!isJPG) {
				  this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			 }
		},
		mounted() {
			this.getListData();
			this.reader = new FileReader();
		}
	}

</script>

<style scoped>
.el-table .cell{
	text-align:center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>