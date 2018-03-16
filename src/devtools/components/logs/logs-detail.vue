<template lang="pug">
    <div class="area-theen-second scroll-list md-layout-item md-medium-size-50 md-small-size-100">
      <md-card-content v-if="!!selectedLog" md-theme="selection-black">
        <div class="md-subheading">{{ selectedLog.title }}</div>

        <JsonTree :raw="selectedLogMessage" :level="0"></JsonTree>

        <md-card>
          <md-ripple>
            <md-card-content class="panel-theen clickable" v-clipboard:copy="slackMessageToCopy" v-clipboard:success="handleCopyStatus">
              <div v-for="(infor, key) in selectedLog.more">
                <strong class="text-theen">{{ infor.name }} </strong>
                <span class="text-grey" v-html="infor.value"></span>
              </div>
              <md-tooltip v-if="!copySucceeded" md-direction="top">Click to copy</md-tooltip>
              <md-tooltip v-else md-direction="top">Copied!</md-tooltip>
            </md-card-content>
          </md-ripple>
        </md-card>

      </md-card-content>
      <md-empty-state v-else md-description="Select a log to show detail"></md-empty-state>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import JsonTree from 'vue-json-tree'

  export default {
    data: () => ({
      slackMessageToCopy: 'Nothing!',
      copySucceeded: null
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
      },
      copySucceeded: function (val) {
        if (val) {
          setTimeout(() => {
            this.copySucceeded = false
          }, 1000)
        }
      }
    },
    methods: {
      handleCopyStatus () {
        this.copySucceeded = true
      }
    },
    components: {
      JsonTree
    }
  }
</script>

<style lang="scss" scoped>
  .area-theen-second * {
    font-family: 'Source Code Pro', sans-seri
  }
</style>
