<!-- 学习目录 -->
<template>
  <div class="catalogueWrapper">
    <el-collapse accordion v-model="actIndex" @change="openItem">
      <el-collapse-item :name="item.id" v-for="item in data" :key="item.id" >
        <template #title>
          <div class="title"><span class="ft-wt-600">{{item.name}}</span></div>
        </template>
        <div :class="{subTitle:true, 'fx-sb':true, playAct: playId == it.id}"  v-for="it in item.sections" :key="it.id" >
          <i  @click="play(it, it.type == 2 ? 1 :it.type)" :class="startIcon(it)"></i>
          <div class="subTit fx-1">
            <span @click="play(it, it.type == 2 ? 1 : it.type == 2 ? 1 :it.type)" class="marg-rt-10">{{it.name}}</span>
            <span v-if="it.type == 2 && it.subjectNum != 0" @click="play(it, it.type == 2 ? 2 :it.type)" class="chapter">练习</span>
          </div>
          <div> 
            <span @click="play(it, it.type == 2 ? 1 :it.type)" v-if="it.mediaDuration != 0">{{(it.mediaDuration/60).toFixed(0)}} 分钟</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { ref, watchEffect, inject } from 'vue'

// 引入父级传参
const props = defineProps({
  data:{
    type: Array,
    default:[]
  },
  statusList:{
    type: Array,
    default:[]
  },
  actIndex:{
    type: String,
    default: ''
  }, 
  playId:{
    type: String,
    default: ''
  }, 
})


const currentPlayData = inject('currentPlayData')

// 默认打开项
const playId = ref(props.playId)

watchEffect(() => {
  playId.value = currentPlayData.sectionId || props.playId
})

// 根据播放状态调整icon
const startIcon = (item) => {
  let data = 'iconfont zhy-a-ico-sp-sei2x'

  if(item.type == '2'){
    if(item.finished != undefined && item.finished == false){  // 未播放完成
      data = 'iconfont zhy-a-ico-502x1'
    } else if(item.finished != undefined && item.finished == true){ // 播放完成
      data = 'iconfont zhy-a-ico-wc2x'
    } {
      data = 'iconfont zhy-a-ico-sp-sei2x' // 未播放过
    }
  } else if(item.type == '3'){
    data = 'iconfont zhy-a-ico-jdks2x'
  }
  return data
}

// emit数据载入
const emit = defineEmits(['sortHandle', 'playHadle', 'openCatalogue'])
const openItem = val => {
  emit('openCatalogue', val)
}
// 排序选中参数定义
const activeKey = ref('all')

// 点击小节 type == 1 是点击视频 2 点击练习
const play = (item, tp) => {
  playId.value = item.id
  emit('playHadle', {item, tp})
}
</script>
<style lang="scss" scoped>
.catalogueWrapper{
  padding: 0 10px;
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
    i{
      position: relative;
      top: 1px;
      margin-right: 4px;
    }
    cursor: pointer;
    margin: 20px 0;
    color: #A0A9B2;
    .subTit{
      width: 230px;
      line-height: 20px;
      .chapter{
        display: inline-block;
        width: 32px;
        text-align: center;
        line-height: 15.5px;
        font-weight: 400;
        font-size: 12px;
        border-radius: 2px;
        background: #A0A9B2;
        color: #1B2127;
      }
    }
    &:hover{
      color: #fff;
      .chapter{
        background: #ffffff !important;
        color: #1B2127 !important;
      }
    }

  }
   .playAct{
    color: #2080F7;
    .chapter{
      background: #2080F7 !important;
      color: #FFFFFF !important;
    }
  }
}
</style>
