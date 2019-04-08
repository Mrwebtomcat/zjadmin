<!-- 红娘信息管理 -->
<template>
  <div class="Hn_admin">
			<div class="hnbox">
				<ul>
					<li></li>
					<li class="add">
						 
					</li>
					
				</ul>
				
			</div>
		<div>
			<el-button>保存修改</el-button>
		</div>
  </div>
</template>

<script>

  export default {
		data(){
			return{
				 fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
			}
		},
		methods:{
			handlePreview(){},
			handleRemove(){},
			beforeRemove(){},
			handleExceed(){},
		}
  }

</script>
<style scoped>
	ul,li{
		list-style: none;
	}                          
	.Hn_admin{
		width: 100%;
		height: 100%;
	}
	.hnbox{
		width: 100%;
		/* height: 400px; */
		border: 1px solid red;
		margin: auto;
	}
	.hnbox ul{
		width: 100%;
		display: flex;
		padding: 0;
	}
	.hnbox ul li{
		height: 300px;
		flex: 0 0 20%;
		background: #ddd;
		margin-right: 3%;
	}
	.add{
		background: url(../../assets/add.png) center no-repeat !important;
		background-size: 50% !important;
		border: 1px solid #ddd;
		cursor: pointer;
	}
</style>