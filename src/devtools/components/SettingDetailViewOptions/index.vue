<template>
  <div>
    <el-alert
      title="Detail View Options"
      type="info"
      :closable="false"
      center>
    </el-alert>
    <div class="panel-theen-light">
      <el-form ref="form" label-width="130px" size="mini">
        <el-form-item label="JSON section">
          <el-switch
            size="mini"
            :value="hasJsonTreeSection"
            @change="setHasJsonTreeSection">
          </el-switch>
        </el-form-item>
        <el-form-item label="JSON data key">
          <el-input
            size="mini"
            :disabled="!hasJsonTreeSection"
            :value="jsonTreeObjectKey"
            @change="setJsonTreeObjectKey">
            <el-button slot="append" icon="el-icon-check"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="Copy log message">
          <el-switch
            size="mini"
            :value="isCopyableLogDetail"
            @change="setIsCopyableLogDetail">
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: mapGetters({
      isCopyableLogDetail: 'isCopyableLogDetail',
      hasJsonTreeSection: 'hasJsonTreeSection',
      jsonTreeObjectKey: 'jsonTreeObjectKey'
    }),
    methods: {
      ...mapActions([
        'setIsCopyableLogDetail',
        'setHasJsonTreeSection',
        'setJsonTreeObjectKey'
      ])
    }
  }
</script>
