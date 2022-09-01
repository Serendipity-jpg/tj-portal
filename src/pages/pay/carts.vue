<!-- 购物车 -->
<template>
  <div class="cartsWrapper">
    <div class="container bg-wt marg-bt-20">
      <div class="title">我的购物车 <span>共{{cartsDataes.length}}门课程</span></div>
      <div class="tab" >
        <div class="tabHead fx-sb">
          <div>课程名称</div>
          <div class="fx">
            <div class="cal">课程有效期</div>
            <div class="cal">单价(元)</div>
            <div class="cal">操作</div>
          </div>
        </div>
        <el-checkbox-group
          v-model="checkedList"
          @change="handleCheckedChange"
        >
        <div class="tabItem fx-sb" v-for="item in cartsDataes" :key="item.id">
          <div class="checkBox fx">
            <el-checkbox :label="item.id">
            <img :src="item.coverUrl" alt=""> 
            </el-checkbox>
            <span class="name">{{item.courseName}}</span>
          </div>
          <div class="fx">
            <div class="cal ft-cl" >
              <p>{{item.courseValidDate}}</p>
            </div>
            <div class="cal ft-cl-err" >￥ {{(item.price / 100).toFixed(2)}}</div>
            <div class="cal font-bt2" @click="delHandle(item)">删除</div>
          </div>
        </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="container bg-wt fx-sb">
      <div class="allAction fx">
        <div class="marg-rt-20">
          <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >全选</el-checkbox>
        </div>
        <div class="bt bt-grey" @click="delHandle('all')">删除</div>
      </div>
      <div class="count ft-14 fx fx-1">
        <div>
          <p>合计： <span class="pric">￥ 2323</span></p>
          <p>若购买享有优惠，相应金额将在订单结算页面减扣</p>
        </div>
        <div @click="goSettlement" class="bt bt-red">去下单</div>
      </div>
    </div>
  </div>
</template>
<script setup>
/** 数据导入 **/
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getCarts, delCarts } from "@/api/order.js";
import router from "../../router";

import { dataCacheStore } from "@/store"
const store = dataCacheStore()

onMounted(() => {
  // 获取章节列表 - 下拉选择
  getCartsData()
})

const cartsDataes = ref([])

// 获取购物车信息
const getCartsData = async () => {
  await getCarts()
    .then((res) => {
      if (res.code == 200) {
        const { data } = res
        cartsDataes.value = data
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "购物车信息请求出错！",
        type: 'error'
      });
    });
}

const checkAll = ref(false) // 是否全选
const checkedList = ref([]) // 选项
const isIndeterminate = ref(false) // 是否有选项 

// 全选
const handleCheckAllChange = (val) => {
  checkedList.value = val ? cartsDataes.value.map(n => n.id) : []
  isIndeterminate.value = false
}
// 单个选择
const handleCheckedChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cartsDataes.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cartsDataes.value.length
}
// 删除
const delHandle = (item) => {
  const params = item != 'all' ? [item.id] : checkedList.value
  delCarts({idList: params})
    .then((res) => {
      if (res.code == 200) {
        ElMessage({
          message:`课程 ${item.courseName} 删除成功`,
          type: 'success'
        });
        getCartsData()
      } else {
        ElMessage({
          message:res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "删除请求出错！",
        type: 'error'
      });
    });
}
// 去结算
const goSettlement = () => {
  if(checkedList.value.length == 0){
    ElMessage({
          message:'请选择要结算的课程',
          type: 'error'
        });
    return false
  } 
  const list = cartsDataes.value.filter(n =>checkedList.value.indexOf(n.id) != -1)
  store.setOrderClassInfo(list)
  router.push({path: '/pay/settlement'})
}
</script>
<style lang="scss" src="./index.scss"> </style>
