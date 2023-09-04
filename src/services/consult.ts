import request from '@/utils/request'
import type { KnowledgePage, KnowledgeParams, DoctorPage, PageParams } from '@/types/Knowledge'
import type { FollowType } from './types/user'
import type {
  TopDep,
  Image,
  ConsultOrderPreParams,
  ConsultOrderPreData,
  PartialConsult,
  ConsultOrderItem
} from '@/types/consult'
import type { ConsultOrderListParams, ConsultOrderPage } from '@/types/user'
import type { PatientList } from '@/types/user.d'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

export const followDoctor = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })

export const getAllDep = () => request<TopDep[]>('/dep/all')

export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)
// 查询患者详情
export const getPatientDetail = (id: string) => request<PatientList>(`/patient/info/${id}`)

// 生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('/patient/consult/order', 'POST', data)

export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)

export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)

export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })
// 取消订单
export const cancelOrder = (id: string) => request(`/patient/order/cancel/${id}`, 'PUT')
// 删除订单
export const deleteOrder = (id: string) => request(`/patient/order/${id}`, 'DELETE')
