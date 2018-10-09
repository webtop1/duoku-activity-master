<template>
  <div>
   <!-- <c-dialog dataClose="isShowDialog" @close="close" containerBgcolor="#efefef">
      <div slot="header">header</div>
      <div slot="body">boby</div>
      <div slot="footer">footer</div>
    </c-dialog>-->
    <c-player></c-player>
  </div>
</template>

<script>
import {getUserInfo} from '@/api/index'
import { mapGetters } from 'vuex'
import cPlayer from '@/components/c-player/c-player'

export default {
  data () {
    return {
      isShowDialog: false
    }
  },
  components: {
    'cDialog': () => import('@/components/c-dialog/c-dialog'),
    cPlayer
  },
  methods: {
    getUserInfo () {
      getUserInfo.then((rs) => {
        console.log(rs)
      })
    },
    close () {
      this.isShowDialog = false
    }
  },
  created () {
  },
  computed: {
    ...mapGetters([
      'uid',
      'havaMessage',
      'dateTime',
      'dateList',
      'currentDay',
      'coin'
    ])
  },
  beforeCreate () {
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/main.scss";
</style>
