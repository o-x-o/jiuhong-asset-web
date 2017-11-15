<!-- 报单页 -->

<template>
	<div class="padding-bar-bottom">
		<mu-list class="demo-list">
			<mu-list-item title="贷款人姓名" @click="focus">
				<mu-text-field hintText="请输入贷款人姓名" v-model="lenderName" :underlineShow="false" required/>
			</mu-list-item>
			<mu-divider/>
			<mu-list-item title="身份证号" @click="focus">
				<mu-text-field hintText="请输入贷款人身份证号" v-model="lenderID" :underlineShow="false" required/>
			</mu-list-item>
			<mu-divider/>
			<mu-list-item title="抵押类型">
				<mu-radio label="一抵" name="lenderType" nativeValue="1" v-model="lenderType"/>
				<mu-radio label="二抵" name="lenderType" nativeValue="2" v-model="lenderType"/>
				<sub style="margin:10px;">展缓开通</sub>
			</mu-list-item>
		</mu-list>

		<mu-card>
			<mu-card-header title="请上传房产证照片（最多6张）"/>
			<mu-card-text>
				<upload-array/>
			</mu-card-text>
		</mu-card>

		<div>
			<mu-card-text>
				<p>提示</p>
				<div>1、工作人员上班时间：周一至周五9：00-18：00。在此时间段内提交，将会给您更快反馈。</div>
				<div>2、请确保照片清晰显示房屋坐落位置、建筑面积。</div>
			</mu-card-text>
		</div>
		<bottom-button text="提交"/>
	</div>
</template>

<script>
import BottomButton from '@/components/BottomButton';
import UploadArray from '@/components/UploadArray';

export default {
	name: 'Declaration',
	data() {
		return {
			lenderName: '',
			lenderID: '',
			lenderType: ''
		}
	},
	methods: {
		focus(e) {
			e.currentTarget.querySelector('input').focus();
		}
	},
	created() {
		// this.$store.commit('setTitle', { title: '报单信息' });
		this.$root.setTitle({ title: '报单信息' });
	},
	components: {
		BottomButton,
		UploadArray
	}
};
</script>
