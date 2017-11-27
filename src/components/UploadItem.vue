<template>
	<div class="unit">
		<img src="~_A/img/trans_1x1.gif"/>
		<div class="content" v-if="index<=length+1">
			<template v-if="item">
				<img class="cover" :src="item" @click="change"/>
				<input :value="item" type="hidden"/>
			</template>
			<template v-else>
				<div class="add" @click="add">+</div>
				<sub>上传照片</sub>
			</template>
		</div>
	</div>
</template>

<script>
	import _2s from '_A/js/2s';

	export default {
		name: 'UploadItem',
		props: [
			'item',
			'index',
			'length'
		],
		methods: {
			add() {
				_2s.preUpload({
					load: (src, file) => {
						this.$emit('add_item', src, file);
					}
				});
			},
			change() {
				_2s.preUpload({
					load: (src, file) => {
						this.$emit('update:item', src, file);
					},
					multiple: false
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.unit{
		position: relative;
		margin-top:10px !important;
		>img{
			width: 100%;
		}
		>.content{
			top:0;
			position: absolute;
			width: 100%;
			height: 100%;
			text-align: center;
			color: silver;
			outline: 1px solid #cecece;
			.add{
				position: absolute;
				width: 100%;
				font-size: 80px;
				top: 50%;
				transform: translateY(-50%);
			}
			sub{
				position: absolute;
				bottom: 20px;
				width: 100%;
				left: 0;
			}
		}
	}
</style>
