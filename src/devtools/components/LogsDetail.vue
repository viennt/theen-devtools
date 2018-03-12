<template lang="pug">
    <div class="log-items__detail scroll-list-bar md-layout-item md-small-size-50 md-xsmall-size-100">
      <md-card-content v-if="!!selectedLog" md-theme="selection-black">
        <div class="md-subheading">{{ selectedLog.message.messageType }}</div>
        <json-tree :raw="selectedLogMessage" :level="2"></json-tree>
        <md-card-content class="log__detail animated" :class="{ shake: isMessageCopied }" v-clipboard:copy="slackMessageToCopy" v-clipboard:success="handleCopyStatus">
          <div v-for="(infor, key) in selectedLog.more">
            <strong class="text-theen">{{ infor.name }} </strong>
            <span class="text-grey" v-html="infor.value"></span>
          </div>
        </md-card-content>
      </md-card-content>

      <md-empty-state v-else md-description="Select a log to show detail"></md-empty-state>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      slackMessageToCopy: 'Nothing!',
      isMessageCopied: false
    }),
    computed: {
      selectedLogMessage: function () {
        return JSON.stringify(this.selectedLog.message)
      },
      ...mapGetters({
        selectedLog: 'selectedLog'
      })
    },
    watch: {
      selectedLog: function (log) {
        if (!log || !log.more || !log.more.length) {
          return
        }
        this.slackMessageToCopy = ''
        log.more.forEach(infor => {
          this.slackMessageToCopy += `${infor.name} ${infor.value}\n`
        })
        this.slackMessageToCopy = this.slackMessageToCopy.replace(new RegExp('<br><br>', 'g'), '\n')
        this.slackMessageToCopy = this.slackMessageToCopy.replace(new RegExp('<br>', 'g'), '\n')
      },
      isMessageCopied: function (value) {
        if (value) {
          setTimeout(() => {
            this.isMessageCopied = false
          }, 500)
        }
      }
    },
    methods: {
      handleCopyStatus () {
        this.isMessageCopied = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scroll-list-bar::-webkit-scrollbar-track {
    background-color: #F3F3F3;
    border-radius: 10px;
  }
  .scroll-list-bar::-webkit-scrollbar {
    width: 10px;
    background-color: #F3F3F3;
  }
  .scroll-list-bar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #D9D9DE;
    -webkit-transition: display 250ms cubic-bezier(.2,.8,.5,1),top 0s linear 0s,left 250ms ease-in-out;
    -moz-transition: display 250ms cubic-bezier(.2,.8,.5,1),top 0s linear 0s,left 250ms ease-in-out;
    transition: display 250ms cubic-bezier(.2,.8,.5,1),top 0s linear 0s,left 250ms ease-in-out;
  }

  .log-items__list,
  .log-items__detail {
    display: block;
    overflow-y: auto;
  }
  .log-items__list {
    height: calc((100vh - 60px) * (1 / 3));
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }
  .log-items__detail {
    height: calc((100vh - 60px) * (2 / 3));
    border-top: 1px solid rgba(0,0,0,.12);
  }
  @media (min-width: 768px) {
    .log-items__list,
    .log-items__detail {
      display: inline-block;
      float: left;
      width: 50%;
      height: calc(100vh - 60px);
      overflow-y: auto;
    }
    .log-items__list {
      border-right: 1px solid rgba(0,0,0,.12);
    }
    .log-items__detail {
      border-top: none;
    }
  }

  .md-list-item {
    overflow: hidden;
    border-bottom: 1px solid rgba(0,0,0,.12);
  }
  .md-list-item > div {
    cursor: pointer;
    transition: color 0.15s;
    white-space: nowrap;
  }
  .md-list-item > div:hover {
    color: #ef6c00!important;
  }
  .md-list-item-text {
    font-weight: 400;
  }

  .md-card-content {
    padding: .5rem!important;
  }

  .log__detail {
    background-color: #f5f5f5;
    border-radius: 2px;
    font-size: 87.5%;
    padding: .2rem .4rem;
    word-break: break-word;
    line-height: 1.3;
  }
</style>
