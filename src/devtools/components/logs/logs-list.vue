<template lang="pug">
    <div class="area-theen-first text-selection-disabled scroll-list md-layout-item md-medium-size-50 md-small-size-100" ref="scrollList">
      <md-content v-if="!!websocketLogs && !!websocketLogs.length" class="md-scrollbar">
        <md-list>
          <md-list-item v-for="(wsLog, key) in websocketLogs" @click="selectLog(wsLog)" :class="{'item-request': wsLog.type === 'REQUEST', 'item-success': wsLog.type === 'RESPONSE_SUCCESS', 'item-error': wsLog.type === 'RESPONSE_ERROR',}">
            <span class="md-caption">{{ wsLog.title }}</span>
          </md-list-item>
        </md-list>
      </md-content>

      <md-empty-state v-else md-description="There are no logs"></md-empty-state>
    </div>
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
  .md-list-item {
    overflow: hidden;
    border-bottom: 1px solid rgba(0,0,0,.12);
  }
  .md-list-item.item-request * {
    font-weight: 100;
  }
  .md-list-item.item-success * {
    color: #06aed4;
  }
  .md-list-item.item-error * {
    color: red;
  }
  .md-list-item > div {
    cursor: pointer;
    transition: color 0.15s;
    white-space: nowrap;
  }
</style>
