<template>
  <div class="hb-header_bar">
    <ul class="left-entry" @click="$router.push('/')">
      <li>blog title</li>
    </ul>
    <div class="center-container">
      <div
        class="content-search_bar"
        ref="contentSearch"
        :class="{ isFocus: isShowSearchPanel }"
      >
        <form>
          <div class="search-content">
            <input
              @keydown.enter.prevent="searchHandler"
              type="text"
              v-model="searchVal"
              @focus="isShowSearchPanel = true"
              placeholder="客观，要来点萝卜么？"
            />
          </div>
          <div class="search-btn" @click="searchHandler">
            <i class="iconfont icon-search fz-xl"></i>
          </div>
        </form>
        <div class="search-panel" v-show="isShowSearchPanel">
          <div class="history">
            <div class="header">
              <div class="title">搜索历史</div>
              <div class="clear" @click="searchHistories = []">清空</div>
            </div>
            <div class="history-wrap">
              <div
                v-for="(hs, i) in searchHistories"
                :key="i"
                class="history-item clear-fix"
                @mouseenter="hs.isShowClose = true"
                @mouseleave="hs.isShowClose = false"
              >
                <div class="history-text">
                  {{ hs.text }}
                </div>
                <div
                  v-show="hs.isShowClose"
                  @click.stop="searchHistories.splice(i, 1)"
                  class="close"
                >
                  <i class="iconfont icon-close"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="trending">
            <div class="header">
              <div class="title">热门文章</div>
            </div>
            <div class="trending-panel">
              <div v-for="(td, i) in trendings" :key="i" class="trending-item">
                <div
                  class="trending-rank"
                  :class="{ 'trending-rank-top': i < 2 }"
                >
                  {{ i + 1 }}
                </div>
                <div class="trending-text">{{ td.title }}</div>
                <div class="trending-mark" v-if="td.type">
                  <i
                    class="iconfont"
                    :class="[[`icon-${td.type}`], [td.type]]"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="right-entry">
      <li class="entry-item">
        <div
          class="user-avatar"
          @mouseenter="showPopover"
          @mouseleave="hidePopover"
        >
          <img :src="avatar" alt="avatar" />
        </div>
        <div class="unlogin"></div>
        <div
          class="popover"
          @mouseenter="showPopover"
          @mouseleave="hidePopover"
          v-show="isShowPopover"
        >
          <div v-if="!userInfo || !userInfo.username" class="popover-content">
            <div class="content-item" style="margin-top: 16px">
              <button class="login-btn" @click="goLogin">登录</button>
            </div>
          </div>
          <div class="popover-content" v-if="userInfo && userInfo.username">
            <div class="content-item" style="margin-top: 20px">
              <a class="username" :href="`/space/${userInfo._id}`">{{
                userInfo.username
              }}</a>
            </div>
            <div class="content-item lv-wrap">
              <a href="javascript:void(0)" class="lv-wrap_bar">
                <div class="lv-wrap_bar--now">
                  <i class="iconfont icon-1 fz-xxl"></i>
                </div>
                <div class="lv-wrap_bar--process"></div>
                <div class="lv-wrap_bar--next">
                  <i class="iconfont icon-2 fz-xxl"></i>
                </div>
              </a>
              <div class="lv-wrap_text">
                当前成长值，距离升级到Lv.{{ 1 }}还需{{ 2 }}
              </div>
            </div>
            <div class="split-line" style="margin: 6px 0"></div>
            <div class="content-item bottom-item" @click="logout">
              <i class="iconfont icon-quit quit-icon"></i>
              <button class="quit-btn">退出</button>
            </div>
          </div>
        </div>
      </li>
      <li class="entry-item">
        <i class="iconfont icon-timeline icon-style fz-xl"></i>
        <span class="fz-s">足迹</span>
      </li>
      <li class="entry-item">
        <i class="iconfont icon-blog icon-style fz-xl"></i>
        <span class="fz-s">博客</span>
      </li>
      <li class="entry-item">
        <i class="iconfont icon-diary icon-style fz-xl"></i>
        <span class="fz-s">日志</span>
      </li>
      <li class="entry-item">
        <i class="iconfont icon-category icon-style fz-xl"></i>
        <span class="fz-s">分类</span>
      </li>
      <li class="entry-item">
        <i class="iconfont icon-tag icon-style fz-xl"></i>
        <span class="fz-s">标签</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import eventfactory from '../hooks/eventlisenter'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  mounted() {
    const self = this
    if (document.cookie.includes('token')) {
      ;(this as any).fetchUserInfo()
    }
    document.addEventListener('click', (self as any).domLisenter)
  },
  destroyed() {
    const self = this
    document.removeEventListener('click', (self as any).domLisenter)
  },
  directives: {
    focus: eventfactory([
      {
        eventType: 'mouseenter',
        cb() {
          ;(this as any).isShowPopover = true
        },
      },
      {
        eventType: 'mouseleave',
        cb() {
          ;(this as any).isShowPopover = false
        },
      },
    ]),
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    ...mapActions({ fetchUserInfo: 'userInfo' }),
  },
  computed: {
    ...mapGetters({ userInfo: 'getUserInfo' }),
    avatar(): string {
      return (
        (this as any).userInfo.avatar ||
        require('~/assets/images/default_avatar.jpg')
      )
    },
  },
})
export default class Top extends Vue {
  searchVal = ''

  searchHandler() {
    this.searchHistories.push({ text: this.searchVal, isShowClose: false })
    this.searchVal = ''
  }

  isShowSearchPanel = false

  trendings = [
    { title: '母猪的产后护理', type: 'new' },
    { title: '钢铁是怎么炼成渣的', type: 'hot' },
    { title: '摩托车维修技术指南' },
  ]

  timer = null

  searchHistories = [
    { text: 'asdfasdfads', isShowClose: false },
    { text: 'sdf', isShowClose: false },
    { text: 'xxxx', isShowClose: false },
  ]

  isShowPopover = false

  domLisenter(e: Event) {
    if (!(this.$refs.contentSearch as any).contains(e.target)) {
      this.isShowSearchPanel = false
    }
  }

  hidePopover(e: EventTarget) {
    if ((this as any).timer) {
      clearTimeout((this as any).timer)
    }
    ;(this as any).timer = setTimeout(() => {
      ;(this as any).isShowPopover = false
    }, 300)
  }

  showPopover(e: EventTarget) {
    if ((this as any).timer) {
      clearTimeout((this as any).timer)
    }
    ;(this as any).timer = setTimeout(() => {
      ;(this as any).isShowPopover = true
    }, 300)
  }

  //   async fetchUserInfo() {
  //     const res = await (this as any).$http.getUserInfo()
  //     this.userInfo = res
  //     ;(this as any).saveUserInfo(res)
  //     console.log((this as any).user);

  //   }

  async logout(this: any) {
    const res = await (this as any).$http.logout()
    this.saveUserInfo({})
  }

  deleteAllCookies() {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i]
      var eqPos = cookie.indexOf('=')
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }

  goLogin() {
    window.open(
      `http://auth.hyong1232.com:8083?refer=${location.href}`,
      '_self'
    )
  }
}
</script>
<style lang="scss" scoped>
.hb-header_bar {
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 24px;
  max-width: 2560px;
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  justify-content: space-between;
  animation: headerSlideDown 0.3s linear forwards;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  background: #ffffff;
  .left-entry {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .center-container {
    height: 44px;
    margin: 0 6px;
    .content-search_bar {
      margin: 0 auto;
      background-color: #fff;
      max-width: 500px;
      border-radius: 8px;
      position: relative;
      width: 100%;
      background-color: #f1f2f3;
      border: 1px solid #e3e5e7;
      &:hover {
        background-color: #fff;
        cursor: pointer;
      }
      &.isFocus {
        background-color: #fff;
        box-shadow: 0 0 30px #0000001a;
        form .search-content {
          background-color: #f1f2f3;
        }
      }
      .search-panel {
        padding: 12px 16px;
        max-height: 612px;
        width: 100%;
        .trending {
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
              font-size: 16px;
              font-weight: 600;
            }
            .clear {
              cursor: pointer;
              font-size: 12px;
              color: #9499a0;
            }
          }
          .trending-panel {
            max-width: 488px;
            display: flex;
            flex-wrap: wrap;
            .trending-item {
              position: relative;
              height: 38px;
              width: 230px;
              display: flex;
              align-items: center;
              .trending-rank {
                &.trending-rank-top {
                  font-weight: 500;
                  color: #18191c;
                }
                color: #9499a0;
                font-size: 14px;
                padding: 4px;
                margin-right: 4px;
              }
              .trending-text {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #18191c;
                font-size: 14px;
                font-weight: 400;
              }
              .trending-mark {
                font-size: 22px;
                .new {
                  color: #ff6a29;
                }
                .hot {
                  color: #fb7299;
                }
              }
            }
          }
        }
        .history {
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
              font-size: 16px;
              font-weight: 600;
            }
            .clear {
              cursor: pointer;
              font-size: 12px;
              color: #9499a0;
            }
          }
          .history-wrap {
            margin: 12px 0 4px 0;
            max-height: 172px;
            display: flex;
            flex-wrap: wrap;
            .history-item {
              position: relative;
              height: 30px;
              padding: 7px 10px 8px;
              font-size: 12px;
              line-height: 15px;
              background: #f6f7f8;
              border-radius: 4px;
              margin-right: 10px;
              margin-bottom: 10px;
              cursor: pointer;
              .history-text {
                max-width: 96px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              .close {
                color: var(--bg-bd-color);
                position: absolute;
                top: -6px;
                right: -6px;
              }
            }
          }
        }
      }
      form {
        display: flex;
        align-items: center;
        padding: 0 48px 0 4px;
        position: relative;
        height: 40px;
        border-radius: 4px;
        .search-content {
          border-radius: 6px;
          line-height: 32px;
          height: 32px;
          width: 446px;
          border: 2px solid transparent;
          padding: 0 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          input {
            background-color: transparent;
            outline: none;
            width: 100%;
            color: #61666d;
            border: none;
            line-height: 20px;
            border-radius: 4px;
            border: none;
          }
        }
        .search-btn {
          &:hover {
            cursor: pointer;
            border-radius: 6px;
            background-color: #e3e5e7;
          }
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          line-height: 32px;
          height: 32px;
          font-weight: 600;
          position: absolute;
          right: 12px;
          top: 4px;
        }
      }
    }
  }
  .right-entry {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    .entry-item {
      cursor: pointer;
      margin: 0 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-style {
        margin-bottom: 4px;
        font-weight: 600;
        color: #8a8a8a;
        // transform: translateY(0);
        // transition: transform 0.4s ease-in;
      }
      &:hover {
        .icon-style {
          transform: translateY(-4px);
          transition: all 0.2s ease-in;
        }
        .user-avatar img {
          transition: transform 0.5s;
          transform: scale(2) translate(2px, 16px);
        }
      }
      .user-avatar {
        cursor: pointer;
        z-index: 2;
        position: relative;
        img {
          border: 2px solid #fff;
          image-rendering: -webkit-optimize-contrast;
          transition: transform 0.5s;
          transform: scale(1);
          width: 38px;
          height: 38px;
          border-radius: 50%;
        }
      }
      .popover {
        transition: all 0.4s ease-in;
        cursor: pointer;
        position: absolute;
        top: 60px;
        left: -120px;
        box-sizing: border-box;
        .popover-content {
          box-sizing: border-box;
          padding: 24px 18px 8px;
          width: 300px;
          background-color: white;
          box-shadow: 0 0 30px rgb(0 0 0 / 10%);
          border-radius: 8px;
          .content-item {
            display: flex;
            justify-content: center;
            align-items: center;
            .login-btn {
              cursor: pointer;
              width: 200px;
              height: 30px;
              background: #62caf8;
              border: none;
              color: white;
              border-radius: 4px;
              font-weight: 600;
              letter-spacing: 8px;
              font-size: 14px;
            }
            &.bottom-item {
              &:hover {
                background-color: #e3e5e7;
                border-radius: 6px;
              }
              padding: 8px 20px;
              justify-content: start;
              .quit-icon {
                width: 18px;
                height: 18px;
                margin-right: 18px;
              }
              .quit-btn {
                border: none;
                background: transparent;
              }
            }
            &.lv-wrap {
              margin-bottom: 6px;
              display: block;
              .lv-wrap_bar {
                display: flex;
                align-items: center;
                justify-content: center;
                .lv-wrap_bar--now {
                  width: 32px;
                  color: #ee672a;
                }
                .lv-wrap_bar--process {
                  margin: 6px 4px;
                  width: 240px;
                  height: 2px;
                  background-color: #e3e5e7;
                  position: relative;
                  &::before {
                    content: ' ';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 97%;
                    z-index: 1;
                    background-color: #f3cb85;
                  }
                }
                .lv-wrap_bar--next {
                  color: #e3e5e7;
                  width: 32px;
                }
              }
              .lv-wrap_text {
                font-size: 12px;
                color: #c9ccd0;
              }
            }
            .username {
              color: #fb7299;
              font-size: 18px;
              font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue,
                Microsoft YaHei, sans-serif;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
@keyframes headerSlideDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
