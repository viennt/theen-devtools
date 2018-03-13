<template lang="pug">
  <div class="md-layout">
    <LogsList />
    <LogsDetail />
  </div>
</template>

<script>
  import LogsList from './logs-list'
  import LogsDetail from './logs-detail'

  export default {
    components: {
      LogsList,
      LogsDetail
    }
  }
</script>
