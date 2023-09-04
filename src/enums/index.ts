// 问诊类型
export enum ConsultType {
  // 找医生
  Doctor = 1,
  // 快速问诊
  Fast = 2,
  // 开药问诊
  Medication = 3
}
// 问诊时间，以1自增可以省略
export enum IllnessTime {
  // 一周内
  Week = 1,
  // 一月内
  Month,
  // 半年内
  HalfYear,
  // 半年以上
  More
}

export enum OrderType {
  // 问诊订单
  // 待支付
  ConsultPay = 1,
  // 待接诊
  ConsultWait = 2,
  // 问诊中
  ConsultChat = 3,
  // 问诊完成
  ConsultComplete = 4,
  // 取消问诊
  ConsultCancel = 5,
  // 药品订单
  // 待支付
  MedicinePay = 10,
  // 待发货
  MedicineSend = 11,
  // 待收货
  MedicineTake = 12,
  // 已完成
  MedicineComplete = 13,
  // 取消订单
  MedicineCancel = 14
}
