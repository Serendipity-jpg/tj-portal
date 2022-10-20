<!-- 课程目录模块 -->
<template>
  <div class="classList">
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item v-for="(item, index) in data"  :name="index">
          <template #title>
            <div class="fx-sb">
              <span>{{item.name}}</span>
              <span class="time">{{Math.trunc(item.mediaDuration/60)+':'+item.mediaDuration % 60}}</span>
            </div>
          </template>
          <div @click="playHandle(it)" class="item fx-sb" v-for="(it, ind) in item.sections">
            <div><iconVideo v-if="it.type == 2" class="icon" /> <iconJdks v-if="it.type == 3" class="icon" />
              {{it.index}}、{{it.name}} <span v-if="it.trailer" class="learn" >试学</span>
            </div>
            <div class="time">
              <span v-if="it.trailer" class="trailer-font" @click="toPlayPage(it.id)">试看</span>
              {{Math.trunc(item.mediaDuration/60)+':'+it.mediaDuration % 60}}
            </div>
          </div>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { ref } from "vue";
import iconVideo from '@/assets/ico-video.svg'
import iconJdks from '@/assets/ico-jdks.svg'
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter()
// 引入父级传参
const props = defineProps({
  courseId:{
    type: String,
  },
  isSignUp:{
    type: Boolean,
  },
  data:{
    type: Object,
    default:{}
  }
})

const activeNames = ref([0])

const toPlayPage = (id) => {
  console.log(id);
}
const playHandle = (val) => {
  if(!props.isSignUp && !val.trailer){
    ElMessage('该课程章节不支持试看， 请购买后播放')
    return
  }
  router.push({path: '/learning/index', query: {id: props.courseId, sectionsId: val.id}})
}
</script>
<style lang="scss" scoped>
.trailer-font{
  padding: 3px 12px;
  font-size: 12px;
  background: rgba(242,13,13,.1);
  border-radius: 12px;
  color: #f20d0d;
  font-weight: 700;
  line-height: 20px;
}
.trailer-font:hover{
  color: #fff;
  background: #f20d0d;
}
.classList{
  padding-top: 16px;
  .time{
      font-size: 14px;
      color: #80878C;
      font-weight: 400;
      padding-right: 20px;
      line-height: 50px;
    }
  .item{
    font-size: 16px;
    line-height: 50px;
    padding: 0 20px;
    cursor: pointer;
    .time{
      padding-right: 0px;
    }
    .icon{
      position: relative;
      top: 3px;
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
    .learn{
      display: inline-block;
      margin-left: 6px;
      width: 32px;
      line-height: 20px;
      text-align: center;
      background: #FFECEC;
      border-radius: 4px;
      font-weight: 400;
      font-size: 12px;
      color: #FF4C4C;
    }
  }
  :deep(.el-collapse-item__header){
    background: #F5F6F9;
    color: var(--color-font1);
    border:none;
    border-radius: 8px;
    margin: 20px 0;
    font-weight: 600;
    font-size: 18px;
    padding: 0 10px 0 25px;
  }
  :deep(.el-collapse){
    border: none;
  }
  :deep(.el-collapse-item__wrap){
    border: none;
  }
  :deep(.el-collapse-item__content){
    padding-bottom: 0;
    font-size: 14px;
  }

}
</style>
