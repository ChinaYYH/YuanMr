import request from '@/utils/request'
import type { PatientList, PatientType } from '@/types/user'

// 查询患者列表信息
export const getPatientList = () => {
  return request<PatientList>('/patient/mylist', 'GET')
}
// 添加
export const addPatient = (patient: PatientType) => request('/patient/add', 'POST', patient)
// 编辑
export const editPatient = (patient: PatientType) => request('/patient/update', 'PUT', patient)
// 删除
export const delPatient = (id: string | undefined) => request(`/patient/del/${id}`, 'DELETE')
