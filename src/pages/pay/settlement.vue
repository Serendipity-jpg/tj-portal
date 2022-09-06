<!-- 支付 - 结算页面 -->
<template>
  <div class="settlementWrapper container bg-wt">
    <div class="title">购买课程</div>
    <div class="tab" >
      <div class="tabHead fx-sb">
        <div>课程名称</div>
        <div class="cal">单价(元)</div>
      </div>
      <div class="tabItem fx-sb" v-for="item in orderClass" :key="item.id">
        <div class="fx">
          <img :src="item.coverUrl" alt=""> 
          <span>{{item.name || item.courseName}}</span>
        </div>
        <div class="cal ft-cl-err" >￥ {{(item.nowPrice / 100).toFixed(2)}}</div>
      </div>
    </div>
    <div class="settiementInfo">
      <div class="coupon fx">
        <div >
          优惠券： <el-select v-if="orderInfo.coupons && orderInfo.coupons.length > 0" v-model="couponIds" placeholder="Select">
                    <el-option
                      v-for="item in orderInfo.coupons"
                      :key="item.value"
                      :label="item.label"
                      :value="discountAmount"
                      :disabled="item.disabled"
                    />
                  </el-select>
                  <span v-else class="noData"> 暂无可用优惠券</span>
        </div>
        <div class="price">
          <div><span>订单总价：</span> ￥ {{amountConversion(orderInfo.totalAmount)}}</div>
          <div><span>优惠金额：</span> - ￥ {{amountConversion(discountAmount) || 0}}</div>
        </div>
      </div>
      <div class="paid"><span>实付金额：</span><span class="ft-cl-err">{{price}}</span></div>
      <div @click="orderHandle"><span class="bt bt-red">去结算</span></div>
    </div>
  </div>
</template>
<script setup>
/** 数据导入 **/
import { onMounted, ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { confirmOrderInfo, setOrder} from "@/api/order.js";
import { dataCacheStore } from "@/store"
import {amountConversion} from "@/utils/tool.js"
const store = dataCacheStore()

const router = useRouter()
const orderClass = ref([])
onMounted(() => {
  // 获取章节列表 - 下拉选择
  orderClass.value = store.getOrderClassInfo
  comfirePageInfoHandle()
})
// 优惠金额
const discountAmount = ref(0)
// 实付金额
const price= computed(() => {
  return ((orderInfo.value.totalAmount - discountAmount.value)/100).toFixed(2)
})
// 优惠券Id
const couponIds = ref([])
// 订单信息
const orderInfo = ref({})
// 下单确认页信息
const comfirePageInfoHandle = async () => {
  const courseIds = orderClass.value.map(n => n.courseId ? n.courseId : n.id).join()
  const params = {courseIds}
  await confirmOrderInfo(params)
    .then((res) => {
      if (res.code == 200) {
        orderInfo.value = res.data
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "获取优惠券信息出错！",
        type: 'error'
      });
    });
} 
// 下单 
const orderHandle = async () => {
  const courseIds = orderClass.value.map(n => n.courseId ? n.courseId : n.id)
  const params = {courseIds}
  
  await setOrder(params)
    .then((res) => {
      if (res.code == 200) {
        router.push({path:'/pay/payment',query:{orderId: res.data.orderId}})
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "获取优惠券信息出错！",
        type: 'error'
      });
    });
} 
</script>
<style lang="scss" src="./index.scss"> </style>
