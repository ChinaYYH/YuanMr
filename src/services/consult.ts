import request from '@/utils/request'
import type { KnowledgePage, KnowledgeParams, DoctorPage, PageParams } from '@/types/Knowledge'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)
