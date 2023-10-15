<template>
	<view class="user">
		<view class="top">
			<image src="/static/images/history.png" mode=""></image>
			<text>浏览历史</text>
		</view>
		<view class="content">
			<view class="row" v-for="item in historyList">
				<NewCard :item="item" @click.native="clickNew(item)" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList: []
			};
		},
		onShow() {
			this.historyList = uni.getStorageSync(
				'historyArr'
			) || []
		},
		methods: {
			clickNew(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.user {
		.top {
			padding: 50rpx 0;
			background: #F8F8F8;
			color: #666;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 150rpx;
				height: 150rpx;
			}

			text {
				font-size: 38rpx;
				padding-top: 20rpx;
			}
		}

		.content {
			padding: 30rpx;

			.row {
				border-bottom: 1px dashed #efefef;
				padding: 20rpx 0;
			}
		}
	}
</style>