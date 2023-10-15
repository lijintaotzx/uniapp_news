<template>
	<view class="detail">
		<view class="title">
			{{details.title}}
		</view>
		<view class="info">
			<view class="author">
				编辑：{{details.author}}
			</view>
			<view class="time">
				时间：{{details.posttime}}
			</view>
		</view>
		<view class="content">
			<rich-text :nodes="details.content"></rich-text>
		</view>
		<view class="banquan">
			声明：与我无关
		</view>
	</view>
</template>

<script>
	import {
		timeInterval
	} from "@/utils/tool.js"

	export default {
		data() {
			return {
				options: {},
				details: {
					title: null,
					author: null,
					content: null,
					posttime: null
				},
			};
		},
		onLoad(e) {
			this.options = e
			this.getDetail()
		},
		methods: {
			getDetail() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/detail.php",
					data: this.options,
					success: (res) => {
						res.data.content = res.data.content.replace(/<img/gi, '<img style="max-width:100%"')
						res.data.posttime = timeInterval(parseInt(res.data.posttime))
						this.details = res.data
						this.saveHistory()
					}
				})
			},
			saveHistory() {
				let item = {
					id: this.details.id,
					title: this.details.title,
					classid: this.details.classid,
					picurl: this.details.picurl,
					looktime: timeInterval(Date.now())
				}
				let historyArr = uni.getStorageSync('historyArr') || []
				let index = historyArr.findIndex(i => {
					return i.id == this.details.id
				})
				if (index !== -1) {
					historyArr.splice(index, 1)
				}

				historyArr.unshift(item)
				uni.setStorageSync('historyArr', historyArr.splice(0, 10))
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 30rpx;

		.title {
			font-size: 46rpx;
			color: #333;

		}

		.info {
			background: #F6F6F6;
			padding: 20rpx 10rpx;
			font-size: 25rpx;
			color: #666;
			display: flex;
			justify-content: space-between;
			margin: 40rpx 0;
		}

		.content {
			padding-bottom: 50rpx;

			/deep/ img {
				width: 100%;
			}
		}

		.banquan {
			background: #FEF0F0;
			font-size: 26rpx;
			padding: 20rpx;
			color: #F89898;
			line-height: 1.8em;
		}
	}
</style>