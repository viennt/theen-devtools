<template lang="pug">
    <div class="area-theen-first scroll-list md-layout-item md-medium-size-50 md-small-size-100">
      <md-card-content class="panel-theen">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-large-size-20 md-medium-size-20 md-small-size-20 md-xsmall-size-20">
            <md-field>
              <md-select v-model="server" name="server" id="server" placeholder="Server">
              <md-option :value="'DEV'">Dev</md-option>
              <md-option :value="'QA'">QA</md-option>
              <md-option :value="'UAT'">Uat</md-option>
              <md-option :value="'LIVE'">Live</md-option>
              </md-select>
            </md-field>
          </div>

          <div v-if="!accessToken" class="md-layout-item md-layout md-gutter">
            <div class="md-layout-item md-large-size-40 md-medium-size-40 md-small-size-40 md-xsmall-size-40">
              <md-field>
                <md-input v-model="username" placeholder="Username"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30">
              <md-field :md-toggle-password="false">
                <md-input v-model="password" type="password" placeholder="Password"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item">
              <md-button class="md-dense md-primary" @click="doLogin()">
                <md-icon>fingerprint</md-icon>
                <md-tooltip md-direction="right">Login and get access token</md-tooltip>
              </md-button>
            </div>
          </div>

          <div v-else class="md-layout-item md-layout md-gutter">
            <div class="md-layout-item md-small-size-70">
              <md-field>
                <md-input v-model="accessToken" placeholder="Access token"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item">
              <md-button class="md-dense md-primary">
                <md-icon>replay</md-icon>
                <md-tooltip md-direction="right">Open login form</md-tooltip>
              </md-button>
            </div>
          </div>

        </div>
      </md-card-content>
    </div>
</template>

<script>
  export default {
    data: () => ({
      server: null,
      username: null,
      password: null,
      accessToken: null
    }),
    methods: {
      doLogin () {
        this.storeCredentials(this.server, this.username, this.password)
      },
      storeCredentials (server, username, password) {
        let options = {
          server: server,
          username: username,
          password: password
        }
        chrome.storage.sync.set({'theenOptions': options})
      },
      storeAccessToken (accessToken) {
        let options = {
          accessToken: accessToken
        }
        chrome.storage.sync.set({'theenOptions': options})
      }
    },
    mounted () {
      chrome.storage.sync.get(['theenOptions'], (result) => {
        this.server = (!!result.theenOptions && result.theenOptions.server) || 'DEV'
        this.username = (result.theenOptions && result.theenOptions.username) || 'city.boston'
        this.password = (result.theenOptions && result.theenOptions.password) || 'password@2017'
        this.accessToken = (result.theenOptions && result.theenOptions.accessToken) || null
      })
    }
  }
</script>

<style lang="scss" scoped>
  .md-field {
    margin-top: -12px;
    margin-bottom: 4px;
  }
</style>
