<template lang="pug">
  <div class="md-layout">
    <LogsList />
    <LogsDetail />
  </div>
</template>

<script>
  import LogsList from './LogsList'
  import LogsDetail from './LogsDetail'

  export default {
    components: {
      LogsList,
      LogsDetail
    }
  }
</script>
