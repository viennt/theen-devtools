<template>
  <div class="scroll-list height-100">
    <SettingLogsListViewOptions />
    <SettingDetailViewOptions />
  </div>
</template>

<script>
  import SettingLogsListViewOptions from '../../components/SettingLogsListViewOptions'
  import SettingDetailViewOptions from '../../components/SettingDetailViewOptions'

  export default {
    components: {
      SettingLogsListViewOptions,
      SettingDetailViewOptions
    }
  }
</script>
