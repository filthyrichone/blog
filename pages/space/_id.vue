<template>
  <div class="space">
    <div class="left-bar"></div>
    <div class="container">
      <div class="title-bar">
        <h3>个人信息</h3>
      </div>
      <el-form label-width="120px" @submit.native.prevent="submit">
        <el-tabs value="basic" type="border-card">
          <el-tab-pane label="基础信息" name="basic">
            <el-row :gutter="8">
              <el-col :span="12">
                <el-form-item label="昵称">
                  <el-input
                    size="small"
                    plachholder="请输入昵称"
                    v-model="model.username"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item label="邮箱">
                  <el-input
                    size="small"
                    plachholder="请输入邮箱"
                    v-model="model.email"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="8">
              <el-col :span="12">
                <el-form-item label="头像">
                  <el-upload
                    class="avatar-uploader"
                    :action="'http://api.beta.blog.hyong1232.com:8084/web/upload/avatar'"
                    :show-file-list="false"
                    :on-success="(res) => $set(model, 'avatar', res.url)"
                  >
                    <img v-if="model.avatar" :src="model.avatar" alt="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-ico n"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item label="性别">
                  <el-radio-group v-model="model.gender">
                    <el-radio
                      v-for="(g, i) in genderArr"
                      :key="i"
                      :label="g.label"
                    ></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item label="生日">
                  <el-date-picker
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    v-model="model.brithday"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item label="个性签名">
                  <el-input
                    size="small"
                    plachholder="请输入个性签名"
                    v-model="model.signature"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="18">
                <el-form-item label="个人简介">
                  <el-input
                    type="textarea"
                    plachholder="请输入个人简介"
                    v-model="model.description"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-form-item class="flex-center" style="margin-top: 12px;" label-width="0">
          <el-button size="small" type="primary" native-type="submit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="right-bar"></div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
  mounted() {
    ;(this as any).fetchUserInfo()
  },
  methods: {
    ...mapActions(['userInfo']),
  },
  computed: {},
})
export default class example extends Vue {
  genderArr = [
    { label: '男', value: 'man' },
    { label: '女', value: 'woman' },
    { label: '保密', vlaue: '' },
  ]
  model: any = { username: '', email: '', avatar: '' }

  layout() {
    return 'global'
  }

  async submit() {
    try {
      const res = (this as any).$http.user(this.model, 'put', this.model._id)
      if (res) {
        ;(this as any).$message({
          type: 'success',
          message: '更新用户信息成功',
        })
        this.fetchUserInfo();
      }
    } catch (error) {
      console.error(error)
    }
  }

  async fetchUserInfo() {
    try {
      const res = await (this as any).$http.getUserInfo()
      this.model = res
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
::v-deep .el-tabs--border-card {
  border-top: 1px solid #dcdfe6;
  box-shadow: none;
  border-right: none;
  border-left: none;
}
.space {
  height: 100%;
  .container {
    .title-bar {
        margin-left: 18px;
    }
    margin: 20px auto;
    min-width: 600px;
    max-width: 1000px;
    background: #fff;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
    .avatar-uploader {
      width: 200px;
      img {
        width: 100%;
      }
    }
  }
  .left-bar {
    float: right;
    width: 200px;
    margin: 10px;
  }
  .right-bar {
    height: 100%;
    width: 270px;
    margin: 10px;
    float: right;
  }
}
</style>
