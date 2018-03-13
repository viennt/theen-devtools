<template lang="pug">
    <div class="log-items__detail scroll-list-bar md-layout-item md-small-size-50 md-xsmall-size-100">
      <md-card-content v-if="!!selectedLog" md-theme="selection-black">
        <div class="md-subheading">{{ selectedLog.message.messageType }}</div>

        <json-tree :raw="selectedLogMessage" :level="0"></json-tree>

        <md-card>
          <md-ripple>
            <md-card-content class="panel-theen clickable" v-clipboard:copy="slackMessageToCopy">
              <div v-for="(infor, key) in selectedLog.more">
                <strong class="text-theen">{{ infor.name }} </strong>
                <span class="text-grey" v-html="infor.value"></span>
              </div>
            </md-card-content>
          </md-ripple>
        </md-card>

      </md-card-content>
      <md-empty-state v-else md-description="Select a log to show detail"></md-empty-state>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      slackMessageToCopy: 'Nothing!'
    }),
    computed: {
      selectedLogMessage: function () {
        return JSON.stringify(this.selectedLog.message.data)
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .log-items__detail {
    display: block;
    overflow-y: auto;
  }
  .log-items__detail {
    height: calc((100vh - 60px) * (2 / 3));
    border-top: 1px solid rgba(0,0,0,.12);
  }
  @media (min-width: 768px) {
    .log-items__detail {
      display: inline-block;
      float: left;
      width: 50%;
      height: calc(100vh - 60px);
      overflow-y: auto;
    }
    .log-items__detail {
      border-top: none;
    }
  }
</style>
