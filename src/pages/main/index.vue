<!-- 首页 -->
<template>
  <div class="container mainWrapper">
      <div class="banner fx">
        <div class="categorys bg-wt">
          <ClassCategory :data="classCategorys"></ClassCategory>
        </div>
        <div class="swiper">

        </div>
      </div>
  </div>
</template>
<script setup>
/** 数据导入 **/ 
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getClassCategorys } from '@/api/class.js'
import  ClassCategory  from './components/ClassCategory.vue'

const classCategorys = ref([])

// mounted生命周期
onMounted(() => {
  // 获取三级分类信息
  getClassCategoryData()
})

/** 方法定义 **/ 
// 获取三级分类信息
const getClassCategoryData = async () => {
  await getClassCategorys().then(res => {
    if (res.code == 200){
      classCategorys.value = res.data
    } else {
       ElMessage(res.meg)
    }
  }).catch(()=> {
    ElMessage('分类请求出错！')
  })
}

</script>
<style lang="scss" scoped>
.mainWrapper {
  .banner{
    padding: 20px 0;
  }
  .categorys{
    width: 236px;
    height: 388px;
    border-radius: 8px;
  }
}
</style>