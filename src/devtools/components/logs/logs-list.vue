<template lang="pug">
    <div class="log-items__list scroll-list-bar md-layout-item md-small-size-50 md-xsmall-size-100">
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
    methods: mapActions([
      'selectLog'
    ])
  }
</script>

<style lang="scss" scoped>
  .log-items__list {
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
  @media (min-width: 768px) {
    .log-items__list {
      display: inline-block;
      float: left;
      width: 50%;
      height: calc(100vh - 60px);
      overflow-y: auto;
    }
    .log-items__list {
      border-right: 1px solid rgba(0,0,0,.12);
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
</style>
