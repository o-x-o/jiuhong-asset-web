<!-- 报单页 -->

<template>
		<mu-card>
			<LogoJinfu/>
			<mu-card-text>
				<pink-title>公司简介</pink-title>
<pre>北京玖红支付科技有限公司，成立于2015年，总公司坐落于北京市通州万达广场A座，注册资本人民币1000万元，公司致力于为小微企业、行业伙伴提供安全、便利的综合金融及支付解决方案，为全国地区提供技术及产品服务，目标发展成为国内领先的综合性金融支付服务机构。
未来，玖红将秉承诚信、责任、主动、专业、细节、卓越的企业文化和经营理念，培养、引进专业型人才，以银行卡收单、移动支付为基础，依托互联网技术和持续金融创新，为我国经济发展结构转型以及大众理想生活贡献一份力量。</pre>
				<pink-title>企业文化</pink-title>
<pre>诚信、责任、主动、专业、细节、卓越</pre>
				<pink-title>管理文化</pink-title>
<pre>九层之台，起于垒土；
合抱之木，生于毫末！
我们不求一天一月一年彻底的改变，
但应力求每日点滴的进步，
一次进步一点点。
改变一个策略让销售更有效，
增加一点微笑让服务更温情。
改善一个细节让流程更高效，
更新一个观念让自己更阳光。
每天的一点点，日累月积，
有一天我们回头，
已经傲立山巅，
众览群山！</pre>
			</mu-card-text>
		</mu-card>
</template>

<script>
import LogoJinfu from '_C/LogoJinfu';
import PinkTitle from '_C/PinkTitle';

export default {
	name: 'About',
	created() {
		this.$root.setTitle({ title: '关于我们' });
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
	.mu-card{
		padding-bottom: 100px;
	}
</style>