import { userSignApi, userLoginApi } from '@/api/login/index'
import { IResultOr } from '@/api/interface'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store/index'

interface IRuleForm {
  mobile: string,
  password: string
}
export default function useFromOperates () {
  const { proxy }:any = getCurrentInstance()
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  // 注册接口
  function userSign (params:IRuleForm) {
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res
      if (success) {
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }
  // 登陆接口
  function userLogin (params:IRuleForm) {
    userLoginApi(params).then((res: IResultOr) => {
      console.log(res, 11)
      const { success, message, result } = res
      if (success) {
        const { status, userId } = result
        store.commit('setUserStatus', status)
        localStorage.setItem('userId', userId)
        const { redirect }:any = route.query
        router.push({
          path: redirect || '/'
        })
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }
  return { userLogin, userSign }
}
