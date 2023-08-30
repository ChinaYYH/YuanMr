<script setup lang="ts">
import { getPatientList, addPatient, editPatient, delPatient } from '@/services/patient'
import type { PatientList, PatientType } from '@/types/user'
import { showToast, showSuccessToast, showDialog } from 'vant'
import { ref, computed } from 'vue'
import Validator from 'id-validator'
// 创建一个变量,保存患者列表
const list = ref<PatientList>()

// 初始化患者列表数据
const initPatientList = async () => {
  const patienRes = await getPatientList()
  list.value = patienRes.data
}
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
// 控制弹出层显示隐藏
const show = ref(false)
//显示
const showPopup = (item: PatientType) => {
  if (item) {
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    patient.value = { ...initpatient }
  }
  show.value = true
}
// 关闭
const backPopup = () => {
  patient.value = initpatient
  show.value = false
}
//监听保存按钮
const onClickRight = async () => {
  if (!patient.value.name) return showToast('请输入真实姓名')
  if (!patient.value.idCard) return showToast('请输入身份证号')
  const validate = new Validator()
  if (!validate.isValid(patient.value.idCard)) return showToast('身份证格式错误')
  const { sex } = validate.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showToast('性别和身份证不符')
  patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
  initPatientList()
  showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
  show.value = false
  patient.value = initpatient
}
const initpatient: PatientType = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
const remove = async () => {
  if (patient.value.id) {
    await showDialog({
      title: '温馨提示',
      message: `您确认要删除 ${patient.value.name} 患者信息吗 ？`,
      cancelButtonText: '取消',
      confirmButtonText: '确认'
    })
    await delPatient(patient.value.id)
    show.value = false
    initPatientList()
    showSuccessToast('删除成功')
  }
}
const patient = ref<PatientType>({ ...initpatient })
// 复选框选中1？0
const defaultFlag = computed({
  get() {
    console.log(123)

    return patient.value.defaultFlag == 1 ? true : false
  },
  set(value) {
    console.log(456)

    patient.value.defaultFlag = value ? 1 : 0
  }
})
initPatientList()
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-page-list">
      <div class="patient-item" v-for="(item, index) in list" :key="index">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}</span>
          <span class="sex">{{ item.gender ? '男' : '女' }}</span>
          <span class="age">{{ item.age }}岁</span>
        </div>
        <div @click="showPopup(item)" class="icon"><cp-icons name="user-edit"></cp-icons></div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>

      <div @click="showPopup" class="patient-add" v-if="list && list?.length <= 6">
        <cp-icons name="user-add"></cp-icons>
        <p>添加患者</p>
      </div>

      <div class="patient-tip">最多可添加6人</div>

      <van-popup v-model:show="show" position="right" :style="{ width: '100%', height: '100%' }">
        <cp-nav-bar
          @click-right="onClickRight"
          :back="backPopup"
          :title="patient.id ? '编辑患者' : '添加患者'"
          right-text="保存"
        ></cp-nav-bar>
        <van-form style="margin-top: 50px !important" autocomplete="off">
          <van-field label="真实姓名" v-model="patient.name" placeholder="请输入真实姓名" />
          <van-field label="身份证号" v-model="patient.idCard" placeholder="请输入身份证号" />
          <van-field label="性别">
            <!-- 单选按钮组件 -->
            <template #input>
              <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
            </template>
          </van-field>
          <van-field label="默认就诊人">
            <template #input>
              <van-checkbox v-model="defaultFlag" round />
            </template>
          </van-field>
          <van-action-bar v-if="patient.id">
            <van-action-bar-button @click="remove">删除</van-action-bar-button>
          </van-action-bar>
        </van-form>
        <!-- <cp-radio-btn :options="options" v-model="gender"></cp-radio-btn> -->
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;

  &-list {
    padding: 15px;

    .patient-item {
      background-color: var(--cp-bg);
      padding: 15px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      overflow: hidden;
      position: relative;
      margin-bottom: 15px;

      .info {
        display: flex;
        flex: 1;
        flex-wrap: wrap;

        span {
          margin-right: 20px;
          line-height: 30px;
          color: var(--cp-tip);

          &.name {
            width: 60px;
            font-size: 16px;
            color: var(--cp-text1);
            // margin-right: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          &.id {
            width: 180px;
            color: var(--cp-text1);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }

      .icon {
        color: var(--cp-tag);
        width: 20px;
        text-align: center;
      }

      .tag {
        position: absolute;
        color: white;
        font-size: 10px;
        width: 30px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        background-color: var(--cp-primary);
        right: 60px;
        top: 21px;
      }
    }

    .patient-add {
      background-color: var(--cp-bg);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      color: var(--cp-primary);

      .cp-icon {
        font-size: 24px;
      }
    }

    .patient-tip {
      color: var(--cp-tag);
      padding: 12px 0;
    }
  }

  .patient-page {
    padding: 46px 0 80px;

    ::v-deep() {
      .van-popup {
        width: 100%;
        height: 100%;
        padding-top: 46px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
