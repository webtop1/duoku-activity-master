<template>
  <div class="video-player" id="video_wrap">
    <div class="video-wrap">
      <video id="video" class="video" width="100%" preload="auto" poster="" :src="url"
             webkit-playsinline="true"
             x-webkit-airplay="true"
             x5-video-player-type="h5"
             playsinline>
      </video>
    </div>
    <div class="player-tips">
      <div class="playing"></div>
      <div class="waiting"><img src="waiting.png" alt=""></div>
      <div class="warning"></div>
      <div class="replaying"></div>
    </div>
    <div class="player-controls">
      <div class="controls-left">
        <button class="switch play">&nbsp;</button>&nbsp;
        <span class="time-current" style="">00:00</span>
      </div>
      <div class="controls-right">
        <span class="time-duration">00:00</span>&nbsp;
        <button class="mute mute-off">&nbsp;</button>
      </div>
      <div class="process-bar">
        <div class="process-bg"></div>
        <div class="process-buffer"></div>
        <div class="process-line"></div>
      </div>
    </div>
  </div>
</template>

<script>

import VideoPlayer from './player.js'

export default {
  data () {
    return {
      url: require('./movie.mp4')
    }
  },
  mounted () {
    let options = {
      el: 'video_wrap',
      url: require('./movie.mp4'),
      autoplay: true,
      loop: false,
      volume: 1
    }
    /* eslint-disable no-new */
    new VideoPlayer(options)
  }
}

</script>
<style>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  button {
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  .video-player {
    position: relative;
    top: 50%;
    width: 100%;
    height: auto;
    max-width: 1280px;
    margin: 0 auto;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    font-family: Arial, sans-serif;
  }

  .show {
    display: block !important;
  }

  .player-tips {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
  }

  .player-tips .playing {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    margin-top: -25px;
    background: #000 url("playing.png") no-repeat center center;
  }

  .player-tips .waiting {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    display: none;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    margin-top: -25px;
    background-color: white;
    text-align: center;
    line-height: 50px;
    vertical-align: middle;
    background-color: #000;
  }

  .player-tips .waiting img {
    margin-top: 10px;
    -webkit-animation: rotate 3s linear 0s infinite;
    animation: rotate 2s linear 0s infinite;
  }

  .player-tips .warning {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 3;
    display: none;
    width: 90px;
    height: 130px;
    margin-left: -45px;
    margin-top: -65px;
  }

  .player-tips .replaying {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 4;
    display: none;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    margin-top: -25px;
    background: #000 url("ended.png") no-repeat center center;
  }

  .player-controls {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
    background-color: black;
    font-size: 10px;
    color: white;
    line-height: 40px;
  }

  .player-controls .controls-left {
    float: left;
    width: 100px;
    text-align: center;
  }

  .player-controls .controls-left .play {
    background-image: url("playing.png");
  }

  .player-controls .controls-left .pause {
    background-image: url("paused.png");
  }

  .player-controls .controls-right {
    float: right;
    width: 100px;
    text-align: center;
  }

  .player-controls .controls-right .mute-off {
    background-image: url("mute_off.png");
  }

  .player-controls .controls-right .mute-on {
    background-image: url("mute_on.png");
  }

  .player-controls .switch, .player-controls .mute {
    width: 25px;
    height: 25px;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto;
  }

  .player-controls .process-bar {
    position: relative;
    top: 19px;
    z-index: 20;
    min-height: 3px;
    margin-left: 100px;
    margin-right: 100px;
  }

  .player-controls .process-bar .process-bg {
    position: absolute;
    height: 3px;
    width: 100%;
    left: 0;
    background-color: #141414;
  }

  .player-controls .process-bar .process-buffer {
    position: absolute;
    height: 3px;
    width: 0;
    left: 0;
    background-color: #2c2c2c;
  }

  .player-controls .process-bar .process-line {
    position: absolute;
    height: 3px;
    width: 0;
    left: 0;
    background-color: #9b9b9b;
  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
