<template>
	<div>
		<mu-flexbox class="img-zone" justify="space-between">
			<mu-flexbox-item v-for="n in 3" :key="n">
				<upload-item :item="items[n-1]" :index="n" :length="items.length"/>
			</mu-flexbox-item>
		</mu-flexbox>
		<mu-flexbox class="img-zone" justify="space-between">
			<mu-flexbox-item v-for="n in 6" v-if="n>3" :key="n" class="unit">
				<upload-item :item="items[n-1]" :index="n" :length="items.length"/>
			</mu-flexbox-item>
		</mu-flexbox>
	</div>
</template>

<script>
	import UploadItem from '@/components/UploadItem';

	export default {
		name: 'UploadArray',
		props: {
			items: {
				default() {
					return [
						{ img: 'static/img/logo-9red-sq-200.png' },
						{ img: 'static/img/logo-9red-sq-200.png' },
						{ img: 'static/img/logo-9red-sq-200.png' },
						{ img: 'static/img/logo-9red-sq-200.png' }
					];
				}
			}
		},
		components: {
			UploadItem
		},
		methods: {
			setItems(items) {
				this.items = items;
			}
		}
	}
</script>