<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeList from '../../components/KnowledgeList.vue'
import type { KnowledgeType } from '../../services/types/user'
import FollowDoctor from '@/components/FollowDoctor.vue'
import { useConsultStore } from '@/stores'
import { ConsultType } from '@/enums'
const store = useConsultStore()
const active = ref<KnowledgeType>('recommend')
</script>

<template>
  <div class="home-page">
    <div class="home-header">
      <h1>优医</h1>
      <div class="search">
        <cp-icons name="home-search"></cp-icons>
        <div class="home-text">搜一搜:疾病/症状/医生/健康知识</div>
      </div>
    </div>
    <div class="row1">
      <van-row>
        <van-col span="8">
          <cp-icons name="home-doctor"></cp-icons>
          <h3>问医生</h3>
          <div class="text">按科室查问医生</div>
        </van-col>
        <van-col span="8">
          <router-link to="/consult/fast" @click="store.setType(ConsultType.Fast)" class="nav">
            <cp-icons name="home-graphic"></cp-icons>
            <h3>急速问诊</h3>
            <div class="text">20s医生急速回复</div>
          </router-link>
        </van-col>
        <van-col span="8">
          <cp-icons name="home-prescribe"></cp-icons>
          <h3>开药门诊</h3>
          <div class="text">线上买药更方便</div>
        </van-col>
      </van-row>
    </div>
    <div class="row2">
      <van-row>
        <van-col span="6">
          <cp-icons name="home-order"></cp-icons>
          <div class="title">药品订单</div>
        </van-col>
        <van-col span="6">
          <cp-icons name="home-docs"></cp-icons>
          <div class="title">建卡档案</div>
        </van-col>
        <van-col span="6">
          <cp-icons name="home-rp"></cp-icons>
          <div class="title">我的处方</div>
        </van-col>
        <van-col span="6">
          <cp-icons name="home-find"></cp-icons>
          <div class="title">疾病查询</div>
        </van-col>
      </van-row>
      <div class="home-banner">
        <van-swipe indicator-color="#fff">
          <van-swipe-item> <img src="@/assets/ad.png" alt="" /> </van-swipe-item>
          <van-swipe-item> <img src="@/assets/ad.png" alt="" /> </van-swipe-item>
        </van-swipe>
      </div>
      <van-tabs shrink sticky v-model:active="active">
        <van-tab title="关注">
          <follow-doctor></follow-doctor>
          <KnowledgeList type="like" />
        </van-tab>
        <van-tab title="推荐">
          <KnowledgeList type="recommend" />
        </van-tab>
        <van-tab title="减脂">
          <KnowledgeList type="fatReduction" />
        </van-tab>
        <van-tab title="饮⻝">
          <KnowledgeList type="food" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;

  .home-header {
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
    padding: 15px;
    box-sizing: border-box;

    h1 {
      color: #fff;
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .search {
      width: 100%;
      background-color: #fff;
      padding: 10px 0px 10px 20px;
      border-radius: 40px;
      box-sizing: border-box;
      box-shadow: 0px 0px 10px skyblue;
      display: flex;
      align-items: center;
      color: #aaa;

      .home-text {
        margin-left: 5px;
      }
    }
  }

  .row1 {
    .van-row {
      padding: 35px 15px 15px 15px;
      box-sizing: border-box;
      text-align: center;

      .cp-icon {
        font-size: 55px;
      }

      .text {
        margin-top: 5px;
        font-size: 11px;
        color: #aaa;
      }
    }
  }

  .row2 {
    .van-row {
      padding: 0px 15px 15px 15px;
      box-sizing: border-box;
      text-align: center;

      .cp-icon {
        font-size: 30px;
      }

      .title {
        font-size: 13px;
        color: #aaa;
      }
    }
  }

  .home-banner {
    padding: 10px 15px;
    height: 100px;
    box-sizing: border-box;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  ::v-deep {
    .van-tabs {
      .van-tabs__nav {
        padding: 0 0 15px 0;
      }

      .van-tabs__line {
        width: 25px;
        background-color: var(--cp-primary);
      }

      .van-tab {
        padding: 0 15px;
      }
    }
  }
}
</style>
