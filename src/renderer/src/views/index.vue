<!--
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2024-12-18 16:35:27
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-07-05 11:35:14
 * @FilePath: \open-reobot-ui\src\renderer\src\views\index.vue
 * @Description: Fuck Bug
 * 微信：lizx2066
-->
<template>
  <div class="p-2">
    <div class="test1">
      <div class="item1"></div>
      <div class="item2 flex">
        <el-button type="primary" @click="getTest">提示</el-button>
      </div>
      <div class="item3 flex">
        <el-button type="danger" @click="getTest1">提示</el-button>
      </div>
      <div class="item4 flex">
        <el-button type="success" @click="getTest2">提示</el-button>
      </div>
      <div class="item5 flex">
        <el-image src="https://p8.itc.cn/images01/20231106/f8cce835d8da4bed9c90270ed1fa427f.gif" />
      </div>
      <div class="item5">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-image
              src="https://p8.itc.cn/images01/20231106/f8cce835d8da4bed9c90270ed1fa427f.gif"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="background">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()
const getTest = async () => {
  proxy?.$modal.msgSuccess('成功！')
}
const getTest1 = async () => {
  proxy?.$modal.notifyError('我是！')
}
const getTest2 = async () => {
  proxy?.$modal.confirm('成功！')
}
</script>

<style scoped lang="scss">
.p-2 {
  position: relative;
  width: calc(1920px - 100px);
  height: calc(1080px - 100px);
  padding: 50px;
  // background-color: red;
  .test1 {
    position: absolute;
    z-index: 99;
    display: grid;
    gap: 50px;
    row-gap: 20px;
    width: calc(100% - 100px);
    height: 200px;
    grid-template-columns: repeat(6, 200px);
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .item1 {
      background-color: #fff;
      box-shadow:
        blue 0px 0px 0px 2px inset,
        rgb(255, 255, 255) 10px -10px 0px -3px,
        rgb(31, 193, 27) 10px -10px,
        rgb(255, 255, 255) 20px -20px 0px -3px,
        rgb(255, 217, 19) 20px -20px,
        rgb(255, 255, 255) 30px -30px 0px -3px,
        rgb(255, 156, 85) 30px -30px,
        rgb(255, 255, 255) 40px -40px 0px -3px,
        rgb(255, 85, 85) 40px -40px;
    }
    .item2 {
      border-radius: 10px;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    }
    .item3 {
      border-radius: 10px;
      background-color: #fff;
      box-shadow:
        rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
        rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
        rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
        rgba(0, 0, 0, 0.06) 0px 2px 1px,
        rgba(0, 0, 0, 0.09) 0px 4px 2px,
        rgba(0, 0, 0, 0.09) 0px 8px 4px,
        rgba(0, 0, 0, 0.09) 0px 16px 8px,
        rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }
    .item4 {
      border-radius: 10px;
      background-color: #fff;
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    }
    .item5 {
      border-radius: 10px;
      background-color: #fff;
      box-shadow:
        1px 1px 2px 0 rgba(0, 0, 0, 0.15),
        inset 1px 2px 0 0 #fff;
    }
  }
  @keyframes move {
    100% {
      transform: translate3d(0, 0, 1px) rotate(360deg);
    }
  }

  .background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #3e1e68;
    overflow: hidden;
  }

  .background span {
    width: 12vmin;
    height: 12vmin;
    border-radius: 12vmin;
    backface-visibility: hidden;
    position: absolute;
    animation: move;
    animation-duration: 45;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .background span:nth-child(0) {
    color: #583c87;
    top: 14%;
    left: 76%;
    animation-duration: 22s;
    animation-delay: -19s;
    transform-origin: 20vw 18vh;
    box-shadow: 24vmin 0 3.7500806990317503vmin currentColor;
  }
  .background span:nth-child(1) {
    color: #583c87;
    top: 79%;
    left: 50%;
    animation-duration: 16s;
    animation-delay: -1s;
    transform-origin: 9vw -2vh;
    box-shadow: -24vmin 0 3.731075215708006vmin currentColor;
  }
  .background span:nth-child(2) {
    color: #ffacac;
    top: 71%;
    left: 1%;
    animation-duration: 25s;
    animation-delay: -29s;
    transform-origin: -23vw 9vh;
    box-shadow: 24vmin 0 3.79817049625869vmin currentColor;
  }
  .background span:nth-child(3) {
    color: #e45a84;
    top: 9%;
    left: 33%;
    animation-duration: 46s;
    animation-delay: -30s;
    transform-origin: -14vw -11vh;
    box-shadow: 24vmin 0 3.0543716541354806vmin currentColor;
  }
  .background span:nth-child(4) {
    color: #583c87;
    top: 82%;
    left: 4%;
    animation-duration: 23s;
    animation-delay: -49s;
    transform-origin: -6vw 17vh;
    box-shadow: 24vmin 0 3.1804451516056482vmin currentColor;
  }
  .background span:nth-child(5) {
    color: #583c87;
    top: 76%;
    left: 51%;
    animation-duration: 52s;
    animation-delay: -25s;
    transform-origin: 25vw 2vh;
    box-shadow: 24vmin 0 3.330224534894743vmin currentColor;
  }
  .background span:nth-child(6) {
    color: #583c87;
    top: 56%;
    left: 26%;
    animation-duration: 32s;
    animation-delay: -5s;
    transform-origin: -12vw -1vh;
    box-shadow: -24vmin 0 3.4529269334911894vmin currentColor;
  }
  .background span:nth-child(7) {
    color: #ffacac;
    top: 96%;
    left: 82%;
    animation-duration: 45s;
    animation-delay: -26s;
    transform-origin: 16vw -11vh;
    box-shadow: 24vmin 0 3.2643992641263635vmin currentColor;
  }
  .background span:nth-child(8) {
    color: #e45a84;
    top: 56%;
    left: 80%;
    animation-duration: 10s;
    animation-delay: -45s;
    transform-origin: 20vw 24vh;
    box-shadow: -24vmin 0 3.6608249778431556vmin currentColor;
  }
  .background span:nth-child(9) {
    color: #583c87;
    top: 93%;
    left: 38%;
    animation-duration: 8s;
    animation-delay: -21s;
    transform-origin: 25vw -7vh;
    box-shadow: -24vmin 0 3.4766509360713904vmin currentColor;
  }
}
</style>
