<template>
  <div class="comment">
    <div class="split-line"></div>
    <div class="comment-header">
      <ul>
        <li class="default-sort fz-xl">评论</li>
        <li class="total-reply">{{ commentTotal }}</li>
        <li
          class="hot-sort"
          :class="{ on: isHotSort }"
          @click="changeSort('hot')"
        >
          最热
        </li>
        <li class="split"></li>
        <li class="new-sort" :class="{ on: !isHotSort }" @click="changeSort">
          最新
        </li>
        <li></li>
      </ul>
    </div>
    <div
      ref="commentBox"
      class="comment-send"
      :class="{ focus: isFocus }"
      @click="isFocus = true"
    >
      <div class="send-wrap wrap-default">
        <div class="avatar">
          <img :src="userAvatarImg" alt="user-avatar" />
        </div>
        <div class="textarea-container">
          <textarea
            @keydown.enter="submitComment"
            v-model="comment"
            name="comment"
            id="comment"
            cols="80"
            rows="5"
          ></textarea>
        </div>
        <div class="send-btn">
          <button @click="submitComment">
            <span class="fz-l">发布</span>
          </button>
        </div>
      </div>
      <div class="send-wrap">
        <div class="comment-emoji" @click="showEmojiList">
          <i class="iconfont icon-face fz-xl"></i>
          <div class="emoji-text fz-s">表情</div>
        </div>
      </div>
    </div>
    <div class="comment-list" v-if="commentList.length">
      <div v-for="(item, i) in commentList" :key="i" class="comment-item">
        <div class="item-wrap">
          <div class="item-avatar">
            <img :src="item.user.avatar" alt="user-avatar" />
          </div>
          <div class="item-content_wrap">
            <div class="cm-info">
              <div class="uname fz-l">{{ item.user.username }}</div>
              <div class="ugrade">
                <i
                  class="iconfont fz-xxxl"
                  :class="[`icon-${userInfo.grade}`]"
                ></i>
              </div>
              <div class="ucomment_time">{{ item.createdAt }}</div>
            </div>
            <div class="cm-text fz-l">{{ item.content }}</div>
            <div class="cm-ctrl_bar fz-s">
              <div
                class="like"
                @click="likeAction(1, { comment: item._id }, item)"
              >
                <i
                  class="iconfont icon-like"
                  :class="{ isLiked: item.likeCount }"
                ></i
                ><span>{{ item.like > 0 ? item.like : '' }}</span>
              </div>
              <div
                class="unlike"
                @click="likeAction(0, { comment: item._id }, item)"
              >
                <i class="iconfont icon-like"></i>
              </div>
              <div class="reply" @click="showReply(item._id)">
                <i class="iconfont icon-reply fz-xl"></i> 回复
              </div>
              <div class="more"><i class="iconfont icon-more"></i></div>
            </div>
          </div>
        </div>
        <rp-bar
          :article="article"
          :totalReplyNum="item.replyCount"
          :isShowCommentBar="item.isShowReply"
          :userInfo="userInfo"
          :comment="item"
          :data="item.replys"
          @reReply="showReply"
        ></rp-bar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import comment from '@/mixins/comment'
import { mapGetters } from 'vuex'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  mixins: [comment],
  components: {
    RpBar: () => import('@/components/replybar.vue'),
  },
  computed: {
    userAvatarImg() {
      return (
        (this as any).userInfo.avatar ||
        require('~/assets/images/default_avatar.jpg')
      )
    },
    ...mapGetters({ userInfo: 'getUserInfo' }),
  },
  mounted() {
    ;(this as any).fetchConmentsList()
    document.addEventListener('click', (this as any).domEvent)
  },
  destroyed() {
    document.removeEventListener('click', (this as any).domEvent)
  },
})
export default class extends Vue {
  @Prop({type: Object})
  article!: object

  isFocus = false

  replayIsFocus = false

  isHotSort = true

  commentTotal = 0

  commentList = []

  addition: any

  replymsg = ''

  queryCondition = { sortBy: '' }

  comment = ''

  showReply(id: any) {
    if (!(this as any).userInfo._id) {
      this.loginTip()
      return
    }
    this.commentList.map((v: any) => {
      v.isShowReply = v._id === id
    })
  }

  changeSort(type: string) {
    if (type === 'hot') {
      this.queryCondition.sortBy = 'like'
      this.isHotSort = true
    } else {
      this.isHotSort = false
      this.queryCondition.sortBy = 'createdAt'
    }
    this.fetchConmentsList()
  }

  async submitComment(this: any) {
    if (!this.userInfo?.username) {
      this.loginTip()
      return
    }
    try {
      const res = await (this as any).$http.comment({
        like: 0,
        user: this.userInfo._id,
        articleId: this.article._id,
        content: this.comment,
      })
      this.fetchConmentsList()
      this.comment = ''
    } catch (error) {
      console.error(error)
    }
  }

  async fetchConmentsList() {
    try {
      const res = await (this as any).$http.comment(
        null,
        'get',
        (this as any).article._id,
        this.queryCondition
      )
      this.commentTotal = res.count
      this.commentList = res.data.map((v: any) => {
        v.isShowReply = false
        return v
      })
    } catch (error) {
      console.log(error)
    }
  }

  loginTip(this: any) {
    const h = this.$createElement
    this.$msgbox({
      title: '提示',
      message: h('p', {}, [
        '您尚未登录，请登录后评论，点击',
        h(
          'a',
          {
            class: 'comment-jumpto-login',
            attrs: {
              href: `http://auth.hyong1232.com:8083?refer=${location.href}`,
            },
          },
          '此处'
        ),
        '登录',
      ]),
      confirmButtonText: 'cancle',
    })
  }

  showEmojiList() {}

  domEvent(e: any) {
    if ((this.$refs.commentBox as HTMLElement).contains(e.target)) {
      return
    }
    this.isFocus = false
  }
}
</script>
<style lang="scss" scoped>
.comment-jumpto-login {
  color: var(--bg-main-color);
  cursor: pointer;
  &:hover {
    color: var(--bg-main-weak-color);
  }
}
.comment {
  .comment-list {
    .comment-item {
      margin: 3px 0;
      .send-wrap {
        margin-left: 62px;
      }
      .item-wrap {
        display: flex;
        align-items: center;
        .item-content_wrap {
          flex: 1;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .cm-info {
            display: flex;
            align-items: center;
            .uname {
              margin-right: 6px;
              color: var(--bg-text-color);
            }
            .ugrade {
              margin-right: 10px;
              width: 32px;
              color: #ee672a;
            }
            .ucomment_time {
              margin-right: 6px;
            }
          }
          .cm-text {
            max-height: 60px;
          }
          .cm-ctrl_bar {
            margin-top: 3px;
            color: #828080;
            display: flex;
            align-items: center;
            position: relative;
            .more {
              position: absolute;
              top: 0;
              right: 0;
              &:hover {
                cursor: pointer;
                color: var(--bg-main-color);
              }
            }
            .like {
              i {
                &.isLiked {
                  color: var(--bg-main-color);
                }
                margin-right: 5px;
                &:hover {
                  cursor: pointer;
                  color: var(--bg-main-color);
                }
              }
              margin-right: 18px;
            }
            .unlike {
              transform: rotateX(0.5turn);
              margin-right: 18px;
              &:hover {
                cursor: pointer;
                color: var(--bg-main-color);
              }
            }
            .reply {
              &:hover {
                cursor: pointer;
                color: var(--bg-main-color);
              }
              display: flex;
              align-items: center;
            }
          }
        }
        .item-avatar {
          width: 40px;
          height: 40px;
          img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .comment-header {
    display: flex;
    margin-bottom: 25px;
    ul {
      padding: 0;
      display: flex;
      align-items: center;
      list-style: none;
      .on {
        font-weight: 600;
        -webkit-font-smoothing: antialiased;
      }
      .default-sort {
        display: block !important;
        height: 34px;
        margin-right: 6px;
        line-height: 34px;
        color: var(--text1);
        pointer-events: none;
        font-weight: 600;
      }
      .hot-sort {
        cursor: pointer;
      }
      .total-reply {
        height: 20px;
        margin-right: 36px;
        line-height: 20px;
        pointer-events: none;
      }
      .split {
        height: 11px;
        border-right: 1px solid var(--bg-bd-color);
        margin: 0 12px;
      }
      .new-sort {
        cursor: pointer;
      }
    }
  }
  .comment-send {
    margin-bottom: 10px;
    &.focus {
      height: 96px;
      .send-wrap {
        display: flex;
        .textarea-container {
          margin: 0 12px;
          flex: 1;
          textarea {
            border: 1px solid rgb(247, 239, 239);
            box-sizing: border-box;
            padding: 5px 10px;
            background-color: var(--bg-spare-color);
            height: 65px;
            margin: 0;
            width: 100%;
            border-radius: 8px;
            resize: none;
          }
        }
        .send-btn {
          cursor: pointer;
          width: 65px;
          height: 65px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          button {
            cursor: pointer;
            position: absolute;
            width: 100%;
            height: 100%;
            border: none;
            span {
              color: white;
              font-weight: 600;
              position: relative;
              z-index: 1;
            }
            &::after {
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              border-radius: 4px;
              position: absolute;
              content: '';
              background-color: var(--bg-main-weak-color);
            }
            &:hover {
              background-color: var(--bg-main-color);
            }
          }
        }
        .comment-emoji {
          display: flex;
        }
      }
    }
    .send-wrap {
      display: flex;
      .avatar {
        width: 50px;
        height: 50px;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .textarea-container {
        margin: 0 12px;
        flex: 1;
        textarea {
          font-size: 16px;
          border: 1px solid rgb(247, 239, 239);
          box-sizing: border-box;
          padding: 5px 10px;
          background-color: var(--bg-spare-color);
          height: 50px;
          margin: 0;
          width: 100%;
          border-radius: 8px;
          resize: none;
          &:focus {
            background-color: #fff;
            outline: none;
          }
        }
      }
      .send-btn {
        cursor: pointer;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        button {
          cursor: pointer;
          position: absolute;
          width: 100%;
          height: 100%;
          border: none;
          span {
            color: white;
            font-weight: 600;
            position: relative;
            z-index: 1;
          }
          &::after {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 4px;
            position: absolute;
            content: '';
            background-color: #06edff99;
          }
          &:hover {
            background-color: #06edff;
          }
        }
      }
      .comment-emoji {
        cursor: pointer;
        padding: 0 4px;
        border-radius: 4px;
        line-height: 20px;
        display: none;
        border: 1px solid var(--bg-spare-color);
        margin-left: 60px;
        justify-content: center;
        align-content: center;
        .emoji-text {
          color: var(--bg-word-dart-color);
        }
      }
    }
  }
}
</style>
