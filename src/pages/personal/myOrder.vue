<!-- 个人中心-我的订单 -->
<template>
  <div class="myOrderWrapper content">
    <CardsTitle class="marg-bt-20" title="我的订单" />
    <TableSwitchBar :data="tableBar" @changeTable="changeTable"></TableSwitchBar>
    <div class="table" >
      <div class="tabHead">
        <span class="fx-1 alignLeft">课程信息</span><span>订单金额</span><span>实付金额</span><span>交易状态</span><span>操作</span>
      </div>
      <div class="marg-bt-20" v-for="(item, index) in orderListData">
        <div class="tabInfo">
          <div><span class="time alignLeft">{{item.orderTime}}</span>订单号：{{item.id}}</div>
        </div>
        <div class="tabCont">
          <div class="orderList">
            <div class="fx-1 alignLeft" >
              <OrderCards :data="it" v-for="it in item.details" @click="() => $router.push({path: '/details/index', query:{id: it.courseId}})"></OrderCards>
            </div>
            <span>{{amountConversion(item.orderAmount)}}</span><span>{{amountConversion(item.realPayAmount)}}</span><span>{{orderStatus(item)}}</span>
            <span class="btCont">
              <span class="bt">评价课程</span>
              <span @click="() => $router.push({path: 'myOrderDetails',query: {id:item.id}})" class="bt bt-grey">查看订单</span>
              <span v-if="false" class="bt bt-grey">删除订单</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="pageination" v-show="count > 0">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
        class="mt-4"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup>

/** 数据导入 **/
import { onMounted, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getOrderListes } from "@/api/order.js";
import { useRoute } from "vue-router";
import { dataCacheStore } from "@/store"
import {amountConversion} from "@/utils/tool.js"

// 组件导入
import CardsTitle from './components/CardsTitle.vue'
import TableSwitchBar from "./components/TableSwitch.vue";
import OrderCards from "./components/OrderCards.vue";


const route = useRoute()
const store = dataCacheStore()

const tableBar = [
  {id: 1, name: '全部'}, 
  {id: 2, name: '待支付'}, 
  {id: 3, name: '已完成'},
  {id: 4, name: '已关闭'},
  {id: 5, name: '已报名'},
  {id: 6, name: '已退款'},
]

// tab切换
const actId = ref(1)
const changeTable = id => {
  actId.value = id
  params.status = actId.value-1 == 0 ? undefined : actId.value-1
  getOrderListesData()
}
// 分页
const count = ref(0)
const params = reactive({
  status: actId.value-1 == 0 ? undefined : actId.value-1, // 订单状态：1：待支付，2：已支付，3：已关闭，4：已完成，5：已报名
  // refundStatus: 1, // 退款状态1：待审批，2：取消退款，3：同意退款，4：拒绝退款，5：退款成功，6：退款失败
  pageNo: 1,
  pageSize: 10,
})

const handleSizeChange = (val) => {
  params.pageSize = val
  getOrderListesData()
}

const handleCurrentChange = (val) => {
  params.pageNo = val
  getOrderListesData()
}

// mounted生命周期
onMounted(async () => {
  getOrderListesData()
});

/** 方法定义 **/
// 获取订单列表
const orderListData = ref()
const getOrderListesData =  async () => {
  await getOrderListes(params)
    .then((res) => {
      if (res.code == 200 ){
        orderListData.value = res.data.list
        count.value = Number(res.data.total)
      } else {
        ElMessage({
        message: res.msg,
        type: 'error'
      });
      }
    })
    .catch(() => {
      ElMessage({
        message: "订单列表请求失败！",
        type: 'error'
      });
    });
}

// 订单状态1：待支付，2：已支付，3：已关闭，4：已完成，5：已报名
function orderStatus(item) {
  let data = ''
  switch(item.orderStatus){
    case 1: {
      data = '待支付'
      break
    }
    case 2: {
      data = '已支付'
      break
    }
    case 3: {
      data = '已关闭'
      break
    }
    case 4: {
      data = '已完成'
      break
    }
    case 5: {
      data = '已报名'
      break
    }
  }
  return data
}
</script>
<style lang="scss" src="./index.scss"> </style>
