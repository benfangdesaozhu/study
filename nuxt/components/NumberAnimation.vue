// 参考 vue-animated-number 这个。由于可能后续动画库皆可用，所以就自己修改了下
// gsap3 已将TweenLite 集成到to方法中。
<template>
  <span class="c-number-animation">{{ tweenedNumber }}</span>
</template>
<script>
export default {
  name: 'NumberAnimation',
  props: {
    to: {
      type: Number,
      default: 0,
    },
    format: {
      type: Function,
      default: (num) => parseInt(num, 10),
    },
    duration: {
      type: Number,
      default: 10, // Duration of animation in seconds
    },
    easing: {
      type: String,
      default: 'Power1.easeOut',
    },
    delay: {
      type: Number,
      default: 0, // Delay the animation in seconds
    },
    animationPaused: Boolean, // Stops animation before start
  },
  computed: {
    tweenedNumber() {
      return this.format(this.fromProp)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tween(this.to)
    })
  },
  data() {
    return {
      fromProp: '500',
    }
  },
  methods: {
    tween(value) {
      // 我的理解：因为gsap 可以监听对象的值。对初始值到目标值的一个动效
      // 我们对$data中的fromProp监听。当执行this.tween 将目标值传进来，就ok
      const tLite = this.$gsap.to(this.$data, {
        duration: this.duration,
        fromProp: value,
        paused: this.animationPaused,
        ease: this.easing,
        delay: this.delay, // In seconds
      })
      this.tween.tLite = tLite
    },
    play() {
      this.tween.tLite.play()
    },
    pause() {
      this.tween.tLite.pause()
    },
    restart() {
      this.tween.tLite.restart()
    },
  },
}
</script>
