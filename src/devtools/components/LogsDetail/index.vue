<template>
  <el-col
    class="area-theen-second scroll-list"
    :xs="24" :sm="16" v-loading="isLoading">

    <div v-if="!isLoading">
      <div v-if="!!selectedLog"
        class="selection-black">
        <div style="font-size: 16px; word-wrap: break-word;">
          {{ selectedLog.title || 'Unknown Log' }}
          <el-button v-if="selectedLog['type'] ===  'info'"
            size="mini" type="text"
            icon="el-icon-caret-right"
            @click="openWebSocketPage()">Run</el-button>
        </div>

        <JsonTree
          v-if="hasJsonTreeSection"
          :raw="selectedLogMessage"
          :level="0">
        </JsonTree>

        <el-tooltip v-if="isCopyableLogDetail && !!selectedLog['moreData']"
          :content="!copySucceeded ? 'Click to copy' : 'Copied!'"
          class="item" effect="dark" placement="top">
          <div
            v-clipboard:copy="slackMessageToCopy"
            v-clipboard:success="handleCopyStatus"
            class="panel-theen clickable">
            <template v-for="infor in selectedLog['moreData']">
              <div :key="infor.name + 'line'">
                <strong class="text-theen">{{ infor.name || '-' }} </strong>
                <span class="text-grey" v-html="highlight(infor.value)"></span>
              </div>
              <br :key="infor.name + 'break-line'"/>
            </template>
          </div>
        </el-tooltip>

        <div v-if="!isCopyableLogDetail">
          <template v-for="infor in selectedLog['moreData']">
            <div :key="infor.name + 'line'"
              class="panel-theen">
              <strong class="text-theen">{{ infor.name || '-' }} </strong>
              <span class="text-grey" v-html="highlight(infor.value)"></span>
            </div>
          </template>
        </div>

        <el-input
          class="search-input"
          placeholder="Enter keyword to search"
          size="mini"
          v-model="searchingQuery">
        </el-input>
      </div>

      <el-alert v-else
        title="Select a log to show detail"
        type="info"
        :closable="false"
        center>
      </el-alert>
    </div>

  </el-col>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import JsonTree from 'vue-json-tree'

  export default {
    data: () => ({
      isLoading: false,
      slackMessageToCopy: 'Nothing!',
      copySucceeded: null,
      searchingQuery: null
    }),
    computed: {
      selectedLogMessage: function () {
        if (!!this.selectedLog && !!this.selectedLog.jsonTreeData) {
          return JSON.stringify(this.selectedLog[this.jsonTreeObjectKey || 'jsonTreeData'])
        } else {
          return JSON.stringify({})
        }
      },
      ...mapGetters({
        selectedLog: 'selectedLog',
        isCopyableLogDetail: 'isCopyableLogDetail',
        hasJsonTreeSection: 'hasJsonTreeSection',
        jsonTreeObjectKey: 'jsonTreeObjectKey'
      })
    },
    watch: {
      selectedLog: function (log) {
        this.isLoading = true
        setTimeout(() => { this.isLoading = false }, 250)

        if (!log || !log['moreData']) {
          return
        }
        this.slackMessageToCopy = ''
        for (var key in log['moreData']) {
          if (!log['moreData'].hasOwnProperty(key)) continue
          var infor = log['moreData'][key]
          this.slackMessageToCopy += `${infor.name} ${infor.label}\n`
        }
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
      ...mapActions([
        'selectRequest'
      ]),
      handleCopyStatus () {
        this.copySucceeded = true
      },
      highlight (content) {
        if (!this.searchingQuery) {
          return content
        }
        return content.replace(new RegExp(this.searchingQuery, 'gi'), match => {
          return '<span class="theen-highlight">' + match + '</span>'
        })
      },
      openWebSocketPage () {
        const request = {
          message: this.selectedLog['moreData']['messageContent'].value,
          server: {
            name: this.selectedLog['moreData']['server'].value,
            value: this.selectedLog['moreData']['server'].value
          }
        }
        this.selectRequest(request)
        this.$router.push('/websocket')
      }
    },
    components: {
      JsonTree
    }
  }
</script>

<style lang="scss" scoped>
  .area-theen-second .selection-black {
    padding: 8px 8px;
  }
  .search-input {
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
