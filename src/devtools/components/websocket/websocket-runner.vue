<template>
  <el-col
    class="area-theen-second scroll-list"
    :xs="24" :sm="16">
    <div class="panel-theen">
      <el-row
        :gutter="5"
        type="flex">
        <el-tooltip
          class="item"
          effect="dark"
          content="Parse"
          placement="bottom">
          <el-button
            icon="el-icon-minus"
            size="small">
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Send"
          placement="bottom">
          <el-button
            type="primary"
            icon="el-icon-caret-right"
            size="small">
          </el-button>
        </el-tooltip>
      </el-row>
    </div>
    <div class="panel-theen-light">
      <div style="font-size: 14px">
        Request
      </div>
      <codemirror v-model="wsRequestMessage">
      </codemirror>
    </div>
    <div class="panel-theen-light">
      <div style="font-size: 14px">
        Response
      </div>
      <codemirror v-model="wsResponseMessage">
      </codemirror>
    </div>
  </el-col>
</template>

<script>
  export default {
    data: () => ({
      wsRequestMessage: `{
    messageType: 'LOGIN',
    data: {
        username: 'username',
        password: 'password',
        latitude: 0,
        longitude: 0
    }
}`,
      wsResponseMessage: ``
    })
  }
</script>

<style lang="scss" scoped>
</style>
