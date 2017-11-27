<template>
	<div>
		<mu-flexbox class="img-zone" justify="space-between">
			<mu-flexbox-item v-for="n in 3" :key="n">
				<upload-item :item.sync="items[n-1]" :index="n" :length="items.length"/>
			</mu-flexbox-item>
		</mu-flexbox>
		<mu-flexbox class="img-zone" justify="space-between">
			<mu-flexbox-item v-for="n in 6" v-if="n>3" :key="n" class="unit">
				<upload-item :item.sync="items[n-1]" :index="n" :length="items.length"/>
			</mu-flexbox-item>
		</mu-flexbox>
	</div>
</template>

<script>
	import UploadItem from '_C/UploadItem';

	export default {
		name: 'UploadArray',
		props: {
			items: {
				default() {
					return [];
				}
			}
		},
		components: {
			UploadItem
		}
	}
</script>