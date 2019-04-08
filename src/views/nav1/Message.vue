<template>
	<div class="message_M">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表 -->
		<el-table :data="[1,2,3,5]" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="id" label="创建时间" width="120"  sortable>
			</el-table-column>
			<el-table-column prop="dateM" label="消息标题"  sortable>
			</el-table-column>	
			<el-table-column prop="money" label="消息描述"  sortable>
			</el-table-column>
			<el-table-column prop="money" label="消息内容"  sortable>
			</el-table-column>
			<el-table-column label="操作" width="230">
				<template scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 新增弹窗 -->
		<el-dialog title="新增消息" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
				<el-form-item label="消息标题">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="消息描述">
					<el-input v-model="form.miaoshu"></el-input>
				</el-form-item>
				<!-- <el-form-item label="活动区域">
					<el-select v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item> -->
				<!-- <el-form-item  label="推送时间">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
					</el-col>
					
				</el-form-item>
				<el-form-item label="即时推送">
					<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
				</el-form-item> -->
				<!-- <el-form-item label="活动性质">
					<el-checkbox-group v-model="form.type">
						<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
						<el-checkbox label="地推活动" name="type"></el-checkbox>
						<el-checkbox label="线下主题活动" name="type"></el-checkbox>
						<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item> -->
				<!-- <el-form-item label="特殊资源">
					<el-radio-group v-model="form.resource">
						<el-radio label="线上品牌商赞助"></el-radio>
						<el-radio label="线下场地免费"></el-radio>
					</el-radio-group>
				</el-form-item> -->
				<el-form-item label="消息内容">
					<el-input type="textarea" v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">立即创建</el-button>
					<el-button @click.native="addFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
			<!-- <div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div> -->
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addFormVisible:false,
				addLoading:0,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			addSubmit() {
				this.addLoading = false;
				this.addFormVisible = false;
				console.log('submit!');
			},
			handleAdd() {
				this.addFormVisible = true;
				console.log('submit!');
			},
			selsChange(){
				
			},
		}
	}

</script>