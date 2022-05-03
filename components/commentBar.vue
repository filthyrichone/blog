<template>
  <div class="comment-send focus">
    <div class="send-wrap wrap-default">
      <div class="avatar">
        <img :src="src" alt="user-avatar" />
      </div>
      <div class="textarea-container">
        <textarea
          ref="cmTxt"
          @input="listenerCompu"
          v-bind="$attrs"
          name="cm"
          :placeholder="`回复@${username}`"
          @keydown.enter="submit"
          id="cm"
          cols="80"
          rows="5"
        ></textarea>
      </div>
      <div class="send-btn">
        <button @click="submit">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  mounted() {
    ;(this as any).$refs.cmTxt.focus()
  },
  watch: {
    username: {
      handler() {
        (this as any).focus();
      },
    },
  },
  computed: {
    listenerCompu() {
      const self = this
      return (e: any) => {
        self.$emit('input', e.target.value)
      }
    },
  },
})
export default class extends Vue {
  @Prop({ type: String }) username!: string

  @Prop({ type: String }) src!: string

  showEmojiList() {}

  focus() {
    ;(this as any).$nextTick(() => {
      ;(this as any).$refs.cmTxt.focus()
    })
  }

  submit(this: any) {
    this.$emit('replySubmit')
  }
}
</script>

<style lang="scss" scoped>
.comment-send {
  margin: 10px 0;
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
</style>
