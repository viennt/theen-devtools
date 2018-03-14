<template lang="pug">
    <div class="area-theen-first text-selection-disabled scroll-list md-layout-item md-medium-size-50 md-small-size-100">
      <md-content v-if="!!websocketLogs && !!websocketLogs.length" class="md-scrollbar">
        <md-list>
          <md-list-item v-for="(wsLog, key) in websocketLogs" @click="selectLog(wsLog)">
            <span class="md-caption">{{ wsLog.title }}</span>
            <md-button class="md-icon-button md-dense md-primary">
              <md-icon>play_arrow</md-icon>
            </md-button>
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
        var container = document.querySelector('.area-theen-first.scroll-list')
        container.scrollTop = container.scrollHeight
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
  .md-list-item > div {
    cursor: pointer;
    transition: color 0.15s;
    white-space: nowrap;
  }
</style>
