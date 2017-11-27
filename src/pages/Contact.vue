<!-- 报单页 -->

<template>
		<mu-card>
			<LogoJinfu/>
			<mu-card-text>
				<pink-title>投诉及建议</pink-title>
				<a class="tel" href="tel:15601188677">焦经理：15601188677<i class="material-icons">call</i></a>
				<pink-title>合作洽谈</pink-title>
				<a class="tel" href="tel:18910615123">余经理：18910615123<i class="material-icons">call</i></a>
				<a class="tel" href="tel:18513931070">王经理：18513931070<i class="material-icons">call</i></a>
				<pink-title>公司电话</pink-title>
				<a class="tel" href="tel:010-52858645">联系电话：010-52858645<i class="material-icons">call</i></a>
				<pink-title>公司地址</pink-title>
<pre>北京支付事业部：
北京市通州区通州万达广场A座2114-2116室

北京金融事业部：
一店：北京市通州区通州万达广场A座2503-2504室
二店：北京市朝阳区建外SOHO西区15号楼1106室</pre>
			</mu-card-text>
		</mu-card>
</template>

<script>
import LogoJinfu from '_C/LogoJinfu';
import PinkTitle from '_C/PinkTitle';

export default {
	name: 'Contact',
	created() {
		this.$root.setTitle({ title: '联系我们' });
	},
	components: {
		PinkTitle,
		LogoJinfu
	}
};
</script>

<style scoped lang="scss">
	pre{
		padding: 20px 10px 50px;
	}
	.tel{
		display: block;
		padding: 0px 10px 20px;

	}
	div + .tel{
		padding-top: 20px;
	}
	.mu-card{
		padding-bottom: 100px;
	}
	.material-icons{
		vertical-align: middle;
		margin-left: 5px;
		color: #1196db;
		font-size: 18px;
	}
</style>