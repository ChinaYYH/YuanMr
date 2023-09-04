<script setup lang="ts">
import ConsultList from '../../components/ConsultList.vue'
import { ConsultType } from '@/enums'
</script>
<template>
  <div class="consult-item">
    <cp-nav-bar title="问诊记录" />
    <van-tabs sticky>
      <van-tab title="极速问诊"><consult-list :type="ConsultType.Fast" /></van-tab>
      <van-tab title="找医生"><consult-list :type="ConsultType.Doctor" /></van-tab>
      <van-tab title="开药问诊"><consult-list :type="ConsultType.Medication" /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.consult-item {
  padding-top: 46px;
  background-color: var(--cp-bg);
}
::v-deep {
  .van-tabs {
    .van-tabs__nav {
      padding: 0 0 15px 0;
    }

    .van-tabs__line {
      width: 45px;
      background-color: var(--cp-primary);
    }

    .van-tab {
      padding: 0 15px;
    }
  }
}
</style>
