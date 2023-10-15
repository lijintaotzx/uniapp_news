<template>
	<view class="home">

		<scroll-view scroll-x="true" class="navscroll">
			<view class="item" :class="navIndex===index?'active':''" v-for="(item, index) in navList"
				@click="clickNav(index, item.id)" :key="item.id">
				{{item.classname}}
			</view>
		</scroll-view>

		<view class="content">
			<view class="row" v-for="item in newsList">
				<NewCard :item=item @click.native="clickNew(item)" />
			</view>

			<view class="no-data" v-if="!newsList.length">
				<image src="/static/icons/nodata.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="loading" v-if="newsList.length">
			<view v-if="loading===0"></view>
			<view v-else-if="loading===1">数据加载中...</view>
			<view v-else>没有更多了</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				navIndex: 0,
				navList: [],
				newsList: [],
				page: 1,
				loading: 0,
			}
		},
		onLoad() {
			this.getNavData()
		},
		onReachBottom() {
			this.page++
			this.getNews()
			this.loading = 1
		},
		methods: {
			clickNav(index, navId) {
				this.page = 1
				this.newsList = []
				this.navIndex = index
				this.loading = 0
				this.getNews(navId)
			},
			clickNew(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				})
			},
			getNavData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
					success: (res) => {
						console.log(res)
						this.navList = res.data
						this.getNews(this.navList[this.navIndex].id)
					}
				})
			},
			getNews(cid, num = 8) {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
					data: {
						cid: cid,
						num: num,
						page: this.page
					},
					success: (res) => {
						if (res.data.length === 0) this.loading = 2
						this.newsList = [...this.newsList, ...res.data]
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.navscroll {
			height: 100rpx;
			background: #F7F8FA;
			white-space: nowrap;
			position: fixed;
			top: var(--window-top);
			left: 0;
			z-index: 10;

			/deep/ ::-webkit-scrollbar {
				width: 4px !important;
				height: 1px !important;
				overflow: auto !important;
				background: transparent !important;
				-webkit-appearance: auto !important;
				display: block;
			}

			.item {
				font-size: 40rpx;
				display: inline-block;
				line-height: 100rpx;
				padding: 0 30rpx;
				color: #333;

				&.active {
					color: #31C27F;
				}
			}
		}

		.content {
			padding: 30rpx;
			padding-top: 130rpx;

			.row {
				border-bottom: 1px dashed #efefef;
				padding: 20rpx 0;
			}

			.no-data {
				display: flex;
				justify-content: center;
				padding: 150rpx 0;

				image {
					width: 360rpx;
				}
			}
		}

		.loading {
			text-align: center;
			font-size: 26rpx;
			color: #888;

			view {
				line-height: 2em;
			}
		}

	}
</style>