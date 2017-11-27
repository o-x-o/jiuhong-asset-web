<!-- 报单页 -->

<template>
		<mu-card>
			<red-block number="01">玖红房易贷</red-block>
			<mu-card-text>
				<pre><span class="title">产品优势：</span>可做北京全境、天津全境、不做公正
60岁以上可以不用子女共借
可做抵贷不一，产权人和借款人关系不限，产权人年龄借款到期时建议不超过70周岁，借款人借款到期时不超过65周岁</pre>
				<pre><span class="title">贷款额度：</span>30万-2000万</pre>
				<pre><span class="title">放款条件：</span>见回执放款，直接放款至借款人账户</pre>
				<pre><span class="title">贷款期限：</span>3期、6期、12期  先息后本</pre>
				<pre><span class="title">房产类型：</span>住宅、70年公寓、别墅</pre>
				<pre><span class="title">抵 押 率：</span>60%-75%</pre>
				<pre><span class="title">利   息：</span>年化12.5%-17%</pre>
				<pre><span class="title">服 务 费：</span>3-12期-放款金额的3%</pre>
				<pre><span class="title">准入区域：</span>北京全境、天津全境</pre>
				<pre><span class="title">进件标准：</span>1.产权人、配偶及借款人、配偶均为中国国籍（港澳台除外）
2.18（含）—65岁（含），借款人年龄+贷款期限≤65周岁。</pre>
				<pre><span class="title">征信要求：</span>1.需提供人行版征信，近一个月个人信用报告
2.当前逾期需结清
3.不能有呆账、止付、冻结等不良状态
4.已婚状态的需提供配偶征信</pre>
				<pre><span class="title">准入标准：</span>房产为自然人名下“住宅类”商品房，需同时满足:
1.产权性质为商品房；
2.物业属性为住宅；
3.公寓须规划年限为 70 年产权。</pre>
			</mu-card-text>
			<red-block number="02">玖红房易贷</red-block>
			<mu-card-text>
				<pre><span class="title">产品优势：</span>手续简单，放款时效快</pre>
				<pre><span class="title">贷款额度：</span>50-3000万</pre>
				<pre><span class="title">放款条件：</span>见回执放款</pre>
				<pre><span class="title">贷款期限：</span>12期、24期、36期  先息后本</pre>
				<pre><span class="title">房产类型：</span>住宅、别墅、经济适用房（08年4月前）、成本价房（非央产）</pre>
				<pre><span class="title">抵 押 率：</span>最高75%</pre>
				<pre><span class="title">利   息：</span>0.75%月，先息后本还款方式</pre>
				<pre><span class="title">服 务 费：</span>12-36期-放款金额的1%</pre>
				<pre><span class="title">准入区域：</span>城六区、大兴通州六环内、昌平回龙观天通苑区域。</pre>
				<pre><span class="title">进件标准：</span>1.产权人、配偶及借款人、配偶均为中国国籍（港澳台除外）
2.18—65岁，借款人年龄+贷款期限≤65周岁。
3.60岁以上所有子女出面</pre>
				<pre><span class="title">征信要求：</span>2年内内不能超过连三累六（超出可沟通），五级分类为正常，历史无呆账止付</pre>
				<pre><span class="title">准入标准：</span>住宅、别墅、经济适用房（08年4月前）、成本价房（非央产）</pre>
			</mu-card-text>
			<red-block number="03">玖红抵押二（中原银行）</red-block>
			<mu-card-text>
				<pre><span class="title">产品优势：</span>最长可做3年期先息后本，中途不用归本，也可做随借随还</pre>
				<pre><span class="title">贷款额度：</span>单套房2000万元</pre>
				<pre><span class="title">放款条件：</span>见回执放款</pre>
				<pre><span class="title">贷款期限：</span>12期、24期、36期  先息后本，中途不用归本，也可做随借随还</pre>
				<pre><span class="title">房产类型：</span>住宅、别墅、经济适用房（08年4月前）</pre>
				<pre><span class="title">抵 押 率：</span>房龄10年以内7成，15年以内6成，30年以内5成</pre>
				<pre><span class="title">利   息：</span>0.62-0.65月，先息后本还款方式</pre>
				<pre><span class="title">服 务 费：</span>12-36期-放款金额的1%</pre>
				<pre><span class="title">准入区域：</span>城八区、顺义、昌平</pre>
				<pre><span class="title">进件标准：</span>1.产权人、配偶及借款人、配偶均为中国国籍（港澳台除外）
2.18—65岁，借款人年龄+贷款期限≤65周岁。
3.60岁以上子女共借
4.最大产权人年龄+贷款期限≤70，房龄+贷款期限≤40（孰低）</pre>
				<pre><span class="title">征信要求：</span>2年内内不能超过连三累六，五级分类为正常，历史无呆账止付</pre>
				<pre><span class="title">准入标准：</span>住宅、别墅、经济适用房（08年4月前）</pre>
			</mu-card-text>
		</mu-card>
</template>

<script>
export default {
	name: 'Category',
	created() {
		this.$root.setTitle({ title: '产品分类' });
	},
	components: {
		RedBlock: {
			render(h) {
				return h('center', {
					attrs: {
						style: 'background: #f44336;color: #fff;padding: 10px 0;margin-top: 2px;border-bottom: 2px solid #ccc;'
					}
				}, [
					h('p', `-- ${this.$props.number} --`),
					this.$slots.default
				]);
			},
			props: ['number']
		}
	}
};
</script>

<style scoped lang="scss">
	.mu-card-text pre{
		padding-left: rpx(110);
		position: relative;
		margin: 0 0 rpx(20) 0;
		.title{
			position: absolute;
			left: 0;
		}
	}
</style>
