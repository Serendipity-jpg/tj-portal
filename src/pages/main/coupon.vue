<!-- 首页 - 选择优惠券 -->
<template>
  <div class="discountWrapper">
    <div class="container">
      <Breadcrumb data="优惠券"></Breadcrumb>
    </div>
    <div class="couponItems container bg-wt">
       <div class="couponCards fx" v-for="(item, index) in couponData" :key="index">
          <div class="price ft-cl-wt">
            <div>￥ <em>{{item.discountAmount}}</em></div>
            <div>{{item.couponRule}}</div>
          </div>
          <div class="info">
            <div class="tit">{{item.name}}</div>
            <div><em>适用平台：</em>{{item.discountAmount}}</div>
            <div><em>有效日期：</em>{{item.termEndTime}}</div>
          </div>
          <div class="butCont fx-ct"><span @click="getCouponData(item.id)" class="bt">立即领取</span></div>
       </div>
    </div>
  </div>
</template>
<script setup>
/** 数据导入 **/

import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

import { getCollectableCoupon, getCoupon } from "@/api/class.js";
// 组件导入
import Breadcrumb from "@/components/Breadcrumb.vue";
const couponData = ref([]);

// mounted生命周期
onMounted(() => {
  // 获取可领优惠券（超值优惠券）
  getCollectableCouponData()
});

/** 方法定义 **/
// 获取可领优惠券（超值优惠券）
const getCollectableCouponData = async () => {
  await getCollectableCoupon()
  .then((res) => {
      if (res.code == 200) {
        couponData.value = res.data;
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "分类请求出错！",
        type: 'error'
      });
    });
}

// 优惠券领取
const getCouponData = async (id) => {
  await getCoupon({couponConfigId:id})
  .then((res) => {
      if (res.code == 200) {
        ElMessage({
          message:res.data.msg,
          type: '优惠券领取成功！'
        });
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "分类请求出错！",
        type: 'error'
      });
    });
}

</script>
<style lang="scss" src="./index.scss"> </style>

<style lang="scss"> 
.couponCards{
  width: calc(60% - 40px);
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  border-left:none;
  border-radius: 8px;
  margin-bottom: 30px;
  margin-right: 40px;
  .price{
    width: 167px;
    height: 150px;
    background:url('@/assets/bg_yhq1.png') center center no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    em{
      font-style: normal;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      font-size: 48px;
    }
  }
  .info{
     display: flex;
     padding-left: 30px;
     text-align: left;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
    flex: 1;
    line-height: 28px;
    .tit{
      font-weight: 500;
      font-size: 20px;  
      margin-bottom: 15px;
    }
    em{
      font-style: normal;
      color: var(--color-font3);
    }
  }
  .butCont{
    padding: 20px;
    span{
      padding: 0px 20px;
      height: 40px;
      border-radius: 20px;
    }
  }
}
</style>