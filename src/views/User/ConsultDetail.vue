<script setup lang="ts">
import { OrderType } from '@/enums'
import {
  getConsultOrderDetail,
  cancelOrder,
  deleteOrder,
  getConsultOrderPre,
  getConsultOrderPayUrl,
  createConsultOrder
} from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showSuccessToast, showFailToast, showConfirmDialog, showToast } from 'vant'
import router from '@/router'
import { useConsultStore } from '@/stores/modules/consult'
const orderId = ref('')
const route = useRoute()
const item = ref<ConsultOrderItem>()
onMounted(async () => {
  orderId.value = route.params.id as string
  const res = await getConsultOrderDetail(route.params.id as string)
  item.value = res.data
})
const loading = ref(false)

const cancelConsultOrder = (item: ConsultOrderItem) => {
  loading.value = true
  cancelOrder(item.id)
    .then(() => {
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      showSuccessToast('取消成功')
    })
    .catch(() => {
      showFailToast('取消失败')
    })
    .finally(() => {
      loading.value = false
    })
}
const deleteConsultOrder = async (item: ConsultOrderItem) => {
  loading.value = true
  deleteOrder(item.id)
    .then(() => {
      showSuccessToast('删除成功')
      router.push('/user/consult')
    })
    .catch(() => {
      showFailToast('删除失败')
    })
    .finally(() => {
      loading.value = false
    })
}
const show = ref(false)

const payInfo = ref<any>()
const store = useConsultStore()
// const loadData = async () => {
//   const res = await getConsultOrderPre({
//     type: store.consult.type,
//     illnessType: store.consult.illnessType
//   })
//   payInfo.value = res.data
//   // 设置默认优惠券
//   store.setCoupon(payInfo.value.couponId)
// }
const onClose = async () => {
  try {
    await showConfirmDialog({
      title: '关闭支付',
      message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
      cancelButtonText: '仍要关闭',
      confirmButtonText: '继续支付',
      confirmButtonColor: 'var(--cp-primary)'
    })
    return false
  } catch {
    orderId.value = ''
    router.push('/user/consult')
    return true
  }
}
// onMounted(() => {
//   loadData()
//   // loadPatient()
// })
// actualPayment
const submit = async (item: ConsultOrderItem) => {
  console.log(item)

  // 打开
  show.value = true
}
const paymentMethod = ref<0 | 1>()
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showToast('跳转支付')
  const res = await getConsultOrderPayUrl({
    orderId: orderId.value,
    paymentMethod: paymentMethod.value,
    payCallback: 'http://localhost/room'
  })
  window.location.href = res.data.payUrl
}
</script>

<template>
  <div class="consult-detail-page" v-if="item">
    <cp-nav-bar title="问诊详情" />
    <div class="detail-head">
      <div class="text">
        <h3>图文问诊 {{ item.payment }} 元</h3>
        <span
          class="sta"
          :class="{
            orange: item.status === OrderType.ConsultPay,
            green: item.status === OrderType.ConsultChat
          }"
          >{{ item.statusValue }}</span
        >
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img class="avatar" src="@/assets/avatar-doctor.svg" alt="" />
        <p class="doc">
          <span>极速问诊</span> <span>{{ item.docInfo?.name }}</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell
          title="患者信息"
          :value="`${item.patientInfo.name} | ${item.patientInfo.genderValue} | ${item.patientInfo.age}岁`"
        />
        <van-cell title="患病时⻓" :value="item.illnessTime" />
        <van-cell title="就诊情况" :value="item.consultFlag" />
        <van-cell title="病情描述" :label="item.illnessDesc" />
      </van-cell-group>
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value> <span class="copy">复制</span> {{ item.orderNo }} </template>
        </van-cell>
        <van-cell title="创建时间" :value="item.createTime" />
        <van-cell title="应付款" :value="`￥${item.payment}`" />
        <van-cell title="优惠券" :value="`-￥${item.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-￥${item.pointDeduction}`" />
        <van-cell title="实付款" :value="`￥${item.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <div class="detail-action van-hairline--top">
      <div class="detail-time" v-if="item.status === OrderType.ConsultPay">
        请在 <van-count-down :time="item.countdown * 1000" /> 内完成支付，超时订单将取消
      </div>
      <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultPay">
        <div class="price">
          <span>需付款</span> <span>￥{{ item.actualPayment }}</span>
        </div>
        <van-button type="default" :loading="loading" @click="cancelConsultOrder(item!)" round
          >取消问诊</van-button
        >
        <van-button type="primary" :loading="loading" @click="submit(item)" round
          >立即支付</van-button
        >
        <van-action-sheet
          :closeable="false"
          v-model:show="show"
          :close-on-popstate="false"
          title="选择支付方式"
          :onClose="onClose"
        >
          <div class="pay-type">
            <p class="amount">￥{{ item.actualPayment.toFixed(2) }}</p>
            <van-cell-group>
              <van-cell title="微信支付" @click="paymentMethod = 0">
                <template #icon><cp-icons name="consult-wechat" /></template>
                <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
              </van-cell>
              <van-cell title="支付宝支付" @click="paymentMethod = 1">
                <template #icon><cp-icons name="consult-alipay" /></template>

                <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
              </van-cell>
              <div class="btn">
                <van-button type="primary" @click="pay" round block>立即支付</van-button>
              </div>
            </van-cell-group>
          </div>
        </van-action-sheet>
      </div>
      <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultWait">
        <van-button type="default" :loading="loading" @click="cancelConsultOrder(item!)" round
          >取消问诊</van-button
        >
        <van-button type="primary" round :to="`/room?orderId=${item.id}`">继续沟通</van-button>
      </div>
      <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultChat">
        <van-button type="default" round v-if="item.prescriptionId">查看处方</van-button>
        <van-button type="primary" round :to="`/room?orderId=${item.id}`">继续沟通</van-button>
      </div>
      <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultComplete">
        <cp-consult-more></cp-consult-more>
        <van-button type="default" round :to="`/room?orderId=${item.id}`">问诊记录</van-button>
        <van-button type="primary" round v-if="item.evaluateId">写评价</van-button>
        <van-button type="default" round v-else>查看评价</van-button>
      </div>
      <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultCancel">
        <van-button type="default" :loading="loading" @click="deleteConsultOrder(item)" round
          >删除订单</van-button
        >
        <van-button type="primary" round to="/">咨询其他医生</van-button>
      </div>
    </div>
  </div>
  <div class="consult-detail-page" v-else>
    <cp-nav-bar title="问诊详情" /> <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
</template>

<style lang="scss" scoped>
.consult-detail-page {
  padding: 46px 0 110px 0;
}

.detail-head {
  height: 140px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 135px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }

  padding: 15px;

  .text {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 3px;

    .sta {
      color: var(--cp-tag);
      font-weight: 500;
      font-size: 16px;

      &.green {
        color: var(--cp-primary);
      }

      &.orange {
        color: #f2994a;
      }
    }

    .tip {
      width: 100%;
      color: var(--cp-text3);
      margin-top: 5px;
    }
  }

  .card {
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);

    .avatar {
      width: 38px;
      height: 38px;
    }

    .doc {
      flex: 1;
      padding-left: 15px;

      > span {
        display: block;
        font-size: 16px;

        &:last-child {
          font-size: 13px;
          color: var(--cp-text3);
        }
      }
    }

    .van-icon {
      color: var(--cp-tip);
    }
  }
}

.detail-patient {
  &::after {
    content: '';
    display: block;
    height: 12px;
    background-color: var(--cp-bg);
  }
}

.detail-order {
  > h3 {
    padding: 10px 18px;
    font-weight: normal;
  }

  .copy {
    padding: 2px 10px;
    border: 1px solid var(--cp-primary);
    background-color: var(--cp-plain);
    color: var(--cp-primary);
    font-size: 12px;
    border-radius: 12px;
    margin-right: 10px;
  }

  :deep(.van-cell__title) {
    width: 70px;
    flex: none;
  }

  .price :deep(.van-cell__value) {
    font-size: 16px;
    color: var(--cp-price);
  }
}

.detail-action {
  height: 65px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: flex-end;
  padding: 0 15px;
  box-sizing: border-box;

  .price {
    flex: 1;

    > span:last-child {
      font-size: 18px;
      color: var(--cp-price);
      padding-left: 5px;
    }
  }

  .van-button {
    margin-left: 10px;
    padding-left: 17px;
    padding-right: 17px;
  }

  :deep(.van-button--default) {
    background-color: var(--cp-bg);
    color: var(--cp-text3);
  }
}

.van-cell {
  padding-left: 18px;
  padding-right: 18px;
}

.detail-time {
  position: fixed;
  left: 0;
  bottom: 65px;
  width: 100%;
  height: 44px;
  background-color: #fff7eb;
  text-align: center;
  line-height: 44px;
  font-size: 13px;
  color: #f2994a;

  .van-count-down {
    display: inline;
    color: #f2994a;
  }
}
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    display: flex;
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
