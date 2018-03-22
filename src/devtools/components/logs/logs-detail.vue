<template lang="pug">
  <el-col class="area-theen-second scroll-list" :xs="24" :sm="12">

    <div v-if="!!selectedLog" class="selection-black">
      <div style="font-size: 16px">{{ selectedLog.title }}</div>

      <JsonTree :raw="selectedLogMessage" :level="0"></JsonTree>

      <el-tooltip class="item" effect="dark" :content="!copySucceeded ? 'Click to copy' : 'Copied!'" placement="top">
        <div class="panel-theen clickable" v-clipboard:copy="slackMessageToCopy" v-clipboard:success="handleCopyStatus">
          <div v-for="(infor, key) in selectedLog.more">
            <strong class="text-theen">{{ infor.name }} </strong>
            <span class="text-grey" v-html="infor.value"></span>
          </div>
        </div>
      </el-tooltip>
    </div>

    <el-alert v-else title="Select a log to show detail" type="info" center :closable="false"></el-alert>
  </el-col>
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
  .area-theen-second .selection-black {
    padding: 8px 8px;
  }
</style>
