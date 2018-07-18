<template>
  <el-col
    class="area-theen-first text-selection-disabled"
    :xs="24" :sm="8">

    <div v-if="!!websocketLogs && !!websocketLogs.length"
      v-chat-scroll="{always: false, smooth: true}"
      class="scroll-list height-100">
      <div v-for="wsLog in websocketLogs" :key="wsLog.id"
        @click="selectLog(wsLog)">
        <el-alert
          :type="wsLog.type"
          :title="wsLog.title"
          class="list-item">
        </el-alert>
      </div>
    </div>

    <el-alert v-else title="There are no logs"
      type="info" center :closable="false">
    </el-alert>
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
        // const $el = this.$el.querySelector('#container')
        // $el.scrollTop = $el.scrollHeight
      },
      ...mapActions([
        'selectLog'
      ])
    },
    watch: {
      websocketLogs: function () {
        // this.scrollToEnd()
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
    border-radius: 0;
  }
  .list-item:hover {
    font-weight: 600;
  }
</style>
