<template lang="pug">
  <el-col class="area-theen-first text-selection-disabled scroll-list" :xs="24" :sm="12" ref="scrollList">
    
    <div v-if="!!websocketLogs && !!websocketLogs.length">
      <div v-for="(wsLog, key) in websocketLogs" @click="selectLog(wsLog)" class="list-item">
        <el-alert v-show="true" :type="wsLog.type === 'RESPONSE_SUCCESS' ? 'success' : (wsLog.type === 'RESPONSE_ERROR' ? 'error' : 'info')" :title="wsLog.message.messageType" show-icon>
        </el-alert>
      </div>
    </div>

    <el-alert v-else title="There are no logs" type="info" center :closable="false"></el-alert>
  </el-col>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: mapGetters({
      websocketLogs: 'allLogs'
    }),
    methods: {
      scrollToEnd: function () {
        const $el = this.$refs.scrollList
        $el.scrollTop = $el.scrollHeight - $el.clientHeight
      },
      ...mapActions([
        'selectLog'
      ])
    },
    watch: {
      websocketLogs: function () {
        this.scrollToEnd()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-item {
    overflow: hidden;
    border-bottom: 1px solid rgba(0,0,0,.12);
    cursor: pointer;
    transition: color 0.15s;
    white-space: nowrap;
  }
</style>
