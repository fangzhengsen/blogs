<template>
  <div id="show">
    <div v-if="ifShowBacktop">显示吧</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifShowBacktop: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollTo, true);
  },
  methods: {
    scrollTo() {
      var scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        (document.body && document.body.scrollTop) ||
        0;
      if (scrollTop > window.screen.height) {
        this.ifShowBacktop = true;
      } else {
        this.ifShowBacktop = false;
      }
    }
  }
};
</script>

<style>
</style>
