<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import useFromProperties from '@/composables/login/useFromProperties'
import userFromOperates from '@/composables/login/userFromOperates'
const { t } = useI18n()

const { loginText, activeName, ruleFormRef, rules, ruleForm } = useFromProperties(t)

const { userSign, userLogin } = userFromOperates()

function handlClick (e:any) {
  const { name } = e.props
  if (name === 'login') {
    loginText.value = t('login.loginBtn')
  } else if (name === 'sign') {
    loginText.value = t('login.signBtn')
  }
}

function submitForm () {
  (ruleFormRef.value as any).validate((valied: any) => {
    if (valied) {
      if (activeName.value === 'sign') {
        userSign(ruleForm)
      } else if (activeName.value === 'login') {
        userLogin(ruleForm)
      }
      console.log('ok')
    } else {
      return false
    }
  })
}

</script>

<template>
  <div class="login-page">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-panel">
        <!-- tab -->
        <el-tabs v-model="activeName" @tab-click="handlClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单组件 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item  prop="mobile">
            <el-input :placeholder="t('login.placeMobile')" v-model="ruleForm.mobile" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input :placeholder="t('login.placePass')" v-model="ruleForm.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">{{loginText}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/login/index.scss";
</style>
