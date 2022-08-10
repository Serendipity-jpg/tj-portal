<!-- 学习目录 -->
<template>
  <div class="catalogueWrapper">
    <el-collapse accordion>
      <el-collapse-item :name="item.id" v-for="item in data" :key="item.id">
        <template #title>
          <div class="title"><span class="ft-wt-600">{{item.name}}</span></div>
        </template>
        <div class="subTitle fx-sb" v-for="it in item.sections" :key="it.id">
          <div class="subTit"><span>{{it.name}}</span></div><div>{{(it.mediaDuration/60).toFixed(0)}} 分钟</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'

// 引入父级传参
const props = defineProps({
  data:{
    type: Object,
    default:{}
  }
})
onMounted(() =>{
  console.log(3333, props.data)
})
// emit数据载入
const emit = defineEmits(['sortHandle'])
// 排序选中参数定义
const activeKey = ref('all')
// 点击选中
const activeHandle = (value) => {
  activeKey.value = value
  // 提交父级 
  emit('sortHandle', value)
}
</script>
<style lang="scss" scoped>
.catalogueWrapper{
  ::deep(.el-collapse-item__header){
      background: transparent;
  }
  .title{
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    width: 280px;
    overflow: hidden;
    span{
      display: inline-block;
      height: 40px;
    }
  }
  .subTitle{
    line-height: 20px;
    cursor: pointer;
    margin: 20px 0;
    color: #A0A9B2;
    .subTit{
      width: 250px;
      line-height: 20px;
    }
    &:hover{
      color: #fff;
    }
  }
}
</style>
