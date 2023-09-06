import { getPrescriptionPic } from '@/services/consult'
import { ImagePreview } from 'vant'
export const useShowPrescription = () => {
  const showPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      console.log(res)

      // ImagePreview([res.data.url])
    }
  }
  return { showPrescription }
}
