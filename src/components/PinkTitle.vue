<template>
	<div class="pink-title">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'PinkTitle'
};
</script>

<style scoped>
	.pink-title{
		background: #feccd0;
		color: #E4001D;
		padding: 5px 10px;
	}
</style>