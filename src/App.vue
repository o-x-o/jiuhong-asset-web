<template>
	<div class="page-wrap relative mh-100">
		<div class="header top w-100">
			<mu-appbar :title="title">
				<mu-icon-button icon="keyboard_arrow_left" slot="left" @click="this.$root.goBack"/>
				<mu-icon-button icon="close" slot="right"/>
			</mu-appbar>
		</div>
		<div class="container padding-bar-top mh-100 w-100">
			<router-view/>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'app',
	computed: {
		...mapState({
			title: 'title'
		})
	}
};
</script>

<style lang="scss">
	.page-wrap {
		background-color: $g-silver;
	}
	.header{
		z-index: 10;
	}
</style>