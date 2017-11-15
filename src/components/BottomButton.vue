<template>
	<div class="bottom w-100 bar-height">
		<mu-raised-button :label="text" disabled fullWidth class="h-100"/>
	</div>
</template>

<script>
export default {
	name: 'BottomButton',
	props: {
		text: {
			default: '提交'
		}
	}
};
</script>