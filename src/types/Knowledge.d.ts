// 文章信息
export type Knowledge = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分⻚
export type KnowledgePage = {
  pageTotal: number
  total: number
  rows: KnowledgeList
}
// 文章列表查询参数
export type KnowledgeParams = {
  type: string
  current: number
  pageSize: number
}

// 推荐关注
// 通用的分⻚查询参数
export type PageParams = {
  // 当前⻚码
  current: number
  // 每⻚条数
  pageSize: number
}
// 文章列表查询参数
export type KnowledgeParams = PageParams & {
  // 文章类型
  type: KnowledgeType
}
// 医生卡片对象
export type Doctor = {
  // 医生ID
  id: string
  // 医生名称
  name: string
  // 头像
  avatar: string
  // 医院名称
  hospitalName: string
  // 医院等级
  gradeName: string
  // 科室
  depName: string
  // 职称
  positionalTitles: string
  // 是否关注，0 未关注 1 已关注
  likeFlag: 0 | 1
  // 接诊服务费
  serviceFee: number
  // 接诊人数
  consultationNum: number
  // 评分
  score: number
  // 主政方向
  major: string
}
// 医生列表
export type DoctorList = Doctor[]
// 医生分页
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}
