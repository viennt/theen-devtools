<template>
  <el-col
    class="area-theen-first text-selection-disabled"
    :xs="24" :sm="8">

    <div v-if="!!websocketRequests && !!websocketRequests.length"
      v-chat-scroll="{always: false, smooth: true}"
      class="scroll-list height-100">
      <div v-for="wsRequest in websocketRequests" :key="wsRequest.id"
        @click="selectRequest(wsRequest)">
        <el-alert
          :title="`${wsRequest.requestedAt} - ${wsRequest.server && wsRequest.server.name || 'Unknown'} - ${wsRequest.message}`"
          :class="{
            'list-item': true,
            active: !!selectedRequest && wsRequest.id === selectedRequest.id
          }"
          @close="removeRequest(wsRequest)">
        </el-alert>
      </div>
    </div>

    <el-alert v-else title="There are no requests"
      type="info" center :closable="false">
    </el-alert>
  </el-col>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: mapGetters({
      websocketRequests: 'allRequests',
      selectedRequest: 'selectedRequest'
    }),
    methods: {
      ...mapActions([
        'selectRequest',
        'removeRequest'
      ])
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
  .list-item:hover,
  .list-item.active {
    font-weight: 900;
  }
</style>
