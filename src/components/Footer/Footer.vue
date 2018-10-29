<template>
    <div class="footer-wrap">
		<div class="footer">
			<div class="footer-top">
				<div class="platon">
					<img class="footer-img" :src="iconSrc"/>
					<span>
						XXXX是PlatON区块链资源管理与分析平台
					</span>
				</div>
				<div class="link">
					<p class="link-top">链接</p>
					<el-row>
						<span>
							<a href="httt://www.baidu.com" target="_blank">开发帮助</a>
						</span>
						<template slot="title">链接</template>
					</el-row>
					<el-row>
						<span>
							<a href="#" target="_blank">钱包</a>
						</span>
						<template slot="title">链接</template>
					</el-row>
					<el-row>
						<span>
							<a href="#" target="_blank">PlatOn官网</a>
						</span>
						<template slot="title">链接</template>
					</el-row>
					<el-row>
						<span>
							<a href="#" target="_blank">白皮书</a>
						</span>
						<template slot="title">链接</template>
					</el-row>
				</div>
				<div class="community">
					<p class="link-top">社区</p>
					<div>
						<el-alert
							title="此处为雪碧图效果，元素已加，等待UI出图调css"
							type="error">
						</el-alert>
						<ul>
							<li>
								<a href="https://t.me/PlatONHK" class="icon-link-1"></a>
							</li>
							<li>
								<a href="https://t.me/PlatONHK" class="icon-link-2"></a>
							</li>
							<li>
								<a href="https://t.me/PlatONHK" class="icon-link-3"></a>
							</li>
							<li>
								<a href="https://t.me/PlatONHK" class="icon-link-4"></a>
							</li>
							<li>
								<a href="https://t.me/PlatONHK" class="icon-link-5"></a>
							</li>
							<li>
								<a href="https://t.me/PlatONHK" class="icon-link-6"></a>
							</li>
							<li>
								<a href="https://t.me/PlatONHK" class="icon-link-7"></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="footer-bottom">
				<span class="text-left">COPYRIGHT © 2018 PLATON INTERNATIONAL LIMITED ALL RIGHTS RESERVED.</span>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
	//import  from ''
	export default {
		//组件名
		name: '',
		//实例的数据对象
		data () {
			return {
				iconSrc: '/static/images/platon.png',
            }
		},
		//数组或对象，用于接收来自父组件的数据
		props: {},
		//计算
		computed: {

        },
		//方法
		methods: {

        },
		//生命周期函数
		created(){

		},
		//监视
		watch: {

		},
		//组件
		components: {}
	}
</script>

<style lang="less" scoped>
.footer-wrap{
	background-color: #242c39;
	// position:absolute;
	// left: 0;
	// right: 0;
	color: #fff;
	height: 190px; // UI设计图 190px
	// margin-top: 60px;
	bottom: 0;
	.footer{
		margin: 0 auto;
		// width: 1400px;
		padding:0 100px;
		bottom: 0;
		height: 100%;
		display: flex;
		flex-direction: column;   //弹性布局，从上到下顺序排列子div
		.footer-top
		{
			display: flex;
			flex-direction: row;
			.link{
			width: auto;
			}
			.link-top{
			width: 200px;
			border-bottom-width: 1px;
			border-bottom-style: dotted;
			border-bottom-color: rgb(100, 107, 116);
			}
		}
		.footer-bottom{
			margin: 70px 0 0;
		}

		a {
			color: #fff;
		}
		img{
			margin: 0;
			width: 140px;
			height: 50px;
		}

	}
	.text-left{
		text-align: left;
	}

}
</style>

