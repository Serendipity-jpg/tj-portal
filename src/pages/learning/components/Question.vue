<!-- 学习目录 -->
<template>
  <div class="catalogue">
    
  </div>
</template>
<script setup>
import { ref } from 'vue'

// 引入父级传参
defineProps({
  data:{
    type: Object,
    default:{}
  }
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
.catalogue{

}
</style>
