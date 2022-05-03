<template>
  <div class="reply-list-wrap">
    <div class="reply-list">
      <div v-for="(item, i) in replysArr" :key="i" class="comment-item">
        <div class="item-wrap">
          <div class="item-avatar">
            <img
              :src="item.fromUid.avatar || userAvatarImg"
              alt="user-avatar"
            />
          </div>
          <div class="item-content_wrap">
            <div class="cm-info">
              <div class="uname fz-xl">{{ item.fromUid.username }}</div>
              <div v-if="item.replyType === 'reply'" class="reply_name">
                回复
                <a class="tou_name" href="/">@{{ item.toUid.username }}</a>
              </div>
              <div class="ugrade">
                <i
                  class="iconfont fz-xxxl"
                  :class="[`icon-${item.fromUid.grade}`]"
                ></i>
              </div>
              <div class="ucomment_time">{{ item.updatedAt }}</div>
            </div>
            <div class="cm-text fz-l">{{ item.content }}</div>
            <div class="cm-ctrl_bar fz-s">
              <div class="like">
                <i
                  class="iconfont icon-like"
                  :class="{ isLiked: item.likeCount }"
                  @click="likeAction(1, { reply: item._id }, item)"
                ></i
                ><span>{{ item.like > 0 ? item.like : '' }}</span>
              </div>
              <div class="unlike">
                <i
                  class="iconfont icon-like"
                  @click="likeAction(0, { reply: item._id }, item)"
                ></i>
              </div>
              <div class="reply" @click="showReply(item)">
                <i class="iconfont icon-reply fz-xl"></i> 回复
              </div>
              <div class="more"><i class="iconfont icon-more"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="total-info-bar"
      v-show="showTotalInfoBar && pageNumArr.length > 1"
    >
      <div class="total_num">共{{ pageNumTotal }}页</div>
      <div class="previous_page" @click="pageNoChange('previous')">上一页</div>
      <div class="page_num">
        <div
          v-for="(item, i) in pageNumArr"
          :key="i"
          :class="{ active: item === pager.pageNo }"
          class="page_num-item"
        >
          <i
            @click="pageNoChange('left', item)"
            v-if="typeof item === 'string' && i < 3"
            class="iconfont icon-go_left lshow"
          ></i>
          <i
            @click="pageNoChange('right', item)"
            v-else-if="typeof item === 'string' && i > 3"
            class="iconfont icon-go_right rshow"
          ></i>
          <i
            v-if="typeof item === 'string'"
            class="iconfont icon-more show"
          ></i>
          <span @click="pageNoChange('single', item)" v-else>{{ item }}</span>
        </div>
      </div>
      <div class="next_page" @click="pageNoChange('next')">下一页</div>
    </div>
    <div v-show="!showTotalInfoBar && data.length > 3" class="reply-more_info fz-s">
      共计{{ totalReplyNum }}条回复，
      <span @click="expandAllReply">点击查看</span>
    </div>
    <cm-bar
      ref="cmbar"
      :src="userInfo.avatar"
      :username="replyname"
      v-if="showCommentBar"
      v-model="replymsg"
      @replySubmit="submitReply()"
    ></cm-bar>
  </div>
</template>

<script lang="ts">
import comment from '@/mixins/comment'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
  mixins: [comment],
  components: {
    CmBar: () => import('@/components/commentBar.vue'),
  },
  watch: {
    isShowCommentBar(val) {
      console.log(val)
      ;(this as any).showCommentBar = val
    },
  },
  computed: {
    pageNumTotal() {
      return Math.ceil((this as any).pager.total / (this as any).pager.pageSize)
    },
    pageNumArr() {
      const cPN = (this as any).pager.pageNo
      const pageMaxNum = (this as any).pageNumTotal
      let pagesArr: any = ['1', '2', '3', '4', '...', '5']
      if (pageMaxNum > 6) {
        if (cPN > 4 && cPN < pageMaxNum - 2) {
          pagesArr = [1, '...', cPN - 1, cPN, cPN + 1, '...', pageMaxNum]
        } else if (cPN >= pageMaxNum - 2) {
          pagesArr = [
            1,
            '...',
            pageMaxNum - 4,
            pageMaxNum - 3,
            pageMaxNum - 2,
            pageMaxNum - 1,
            pageMaxNum,
          ]
        } else {
          pagesArr = [1, 2, 3, 4, 5, '...', pageMaxNum]
        }
      } else {
        pagesArr = Array.from({ length: pageMaxNum }, (v, k) => k + 1)
      }
      return pagesArr
    },
    userAvatarImg() {
      return require('~/assets/images/default_avatar.jpg')
    },
  },
  mounted() {
    ;(this as any).replysArr = (this as any).data
  },
})
export default class extends Vue {
  @Prop({ type: Object }) article!: object

  @Prop({ type: Number, default: 0 }) totalReplyNum?: number

  @Prop({ type: Boolean, default: false }) isShowCommentBar?: boolean

  @Prop({ type: Object }) comment!: object

  @Prop() data!: any[]

  @Prop() userInfo!: object

  replyname = (this.comment as any).user.username

  showCommentBar = false

  replysArr = []

  replymsg = ''

  replyId = ''

  showTotalInfoBar = false

  pager = {
    pageSize: 6,
    pageNo: 1,
    total: 0,
  }

  pageNoChange(type: string, no?: number) {
    switch (type) {
      case 'right':
        if (this.pager.pageNo < this.pager.total - 2) {
          this.pager.pageNo += 2
        }
        break
      case 'left':
        if (this.pager.pageNo > 2) {
          this.pager.pageNo -= 2
        }
        break
      case 'single':
        this.pager.pageNo = no as number
        break
      case 'previous':
        this.pager.pageNo > 1 ? this.pager.pageNo-- : ''
        break
      case 'next':
        this.pager.pageNo < Math.ceil(this.pager.total / this.pager.pageSize)
          ? this.pager.pageNo++
          : ''
        break
      default:
        break
    }
    this.fetchReplys()
  }

  async fetchReplys() {
    try {
      const res = await (this as any).$http.fetchReplyBycommentId(
        (this as any).comment._id,
        (this as any).pager
      )
      this.replysArr = res.data
      this.pager.total = res.total
    } catch (error) {
      console.error(error)
    }
  }

  showReply(reply: any) {
    this.replyId = reply._id
    if (this.showCommentBar && this.replyname === reply.fromUid.username) {
      ;(this.$refs.cmbar as any).focus()
    }
    this.replyname = reply.fromUid.username
    this.showCommentBar = true
  }

  reReply(replyId: string, item: any) {
    item.isShowReply = true
  }

  async submitReply(this: any) {
    if (!this.userInfo?.username) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', {}, [
          '您尚未登录，请登录后回复，点击',
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
      return
    }
    try {
      const res = await (this as any).$http.reply({
        replyId: this.replyId || null,
        commentId: this.comment._id,
        fromUid: this.userInfo._id,
        toUid: this.comment.user._id,
        replyType: this.replyId ? 'reply' : 'comment',
        content: this.replymsg,
      })
      this.replymsg = ''
      this.replyId = ''
      this.fetchReplys()
    } catch (error) {
      console.error(error)
    }
  }

  expandAllReply() {
    this.fetchReplys()
    this.showTotalInfoBar = true
  }
}
</script>

<style lang="scss" scoped>
.reply-list-wrap {
  margin-left: 40px;
  .total-info-bar {
    margin-top: 6px;
    .next_page {
      &:hover {
        color: var(--bg-main-color);
      }
      cursor: pointer;
      margin-right: 14px;
    }
    .page_num {
      display: flex;
      align-items: center;
      .page_num-item {
        margin: 0 2px;
        cursor: pointer;
        .rshow {
          display: none;
        }
        .lshow {
          display: none;
        }
        &.active {
          color: var(--bg-main-color);
        }
        &:hover {
          .lshow {
            display: inline;
          }
          .rshow {
            display: inline;
          }
          .show {
            display: none;
          }
          cursor: pointer;
          color: var(--bg-main-color);
        }
      }
      margin-right: 14px;
    }
    .previous_page {
      &:hover {
        color: var(--bg-main-color);
      }
      cursor: pointer;
      margin-right: 14px;
    }
    .total_num {
      margin-right: 14px;
    }
    display: flex;
    align-items: center;
  }
  .reply-more_info {
    margin-top: 4px;
    color: #828080;
    span {
      color: var(--bg-main-color);
      cursor: pointer;
    }
  }
  .reply-list {
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
            .reply_name {
              margin-right: 6px;
              .tou_name {
                color: var(--bg-main-color);
              }
            }
            .uname {
              margin-right: 6px;
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
              cursor: pointer;
              display: flex;
              align-items: center;
            }
          }
        }
        .item-avatar {
          width: 26px;
          height: 26px;
          img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
