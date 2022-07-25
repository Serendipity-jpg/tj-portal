<!-- 常见问题模块 -->
<template>
  <div class="classAsk bg-wt marg-bt-20">
    <div class="tabLab fx-sb">
      <div class=""><span @click="askCheck" class="act">全部问答</span> <span>我的问答</span></div> 
      <div class="ask"><span class="bt">提问</span></div>
    </div>
    <div class="chapterItems fx-wp">
      <div class="item" v-for="item in chapterData" :key="item.id" :class="{act: item.id == actChapterId}">
        {{item.index}}
      </div>
    </div>
    <div class="askCont">

    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { getClassChapter } from "@/api/classDetails.js"
// 引入父级传参
const props = defineProps({
  id:{
    type: Object,
    default:{}
  }
})

onMounted(() => {
  getClassChapterData()
})
// 
const chapterData = ref([])
// 获取小节数据
const getClassChapterData = async () => {
  await getClassChapter(props.id)
    .then((res) => {
      if (res.code == 200) {
        chapterData.value = [{id:'all', index: '全部'},...res.data]
      } else {
        ElMessage({
          message:res.msg,
          type: 'error'
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "课程章节数据请求出错！",
        type: 'error'
      });
    });
}

</script>
<style lang="scss" scoped>
.classAsk{
  padding-top: 30px;
  .tabLab{
    margin-bottom: 20px;
    .ask{
      width: 103px;
      height: 32px;
    }
    .act{
      background: #19232B;
      border-radius: 20px;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      padding: 7px 20px;
    }
  }
  .chapterItems{
    justify-content: flex-start;
    .item{
      margin: 5px;
      border: 1px solid #2080F7;
      border-radius: 4px;
      color:var(--color-main);
      font-size: 14px;
      width: 50px;
      text-align: center;
      line-height: 24px;
    }
  }
}
</style>
