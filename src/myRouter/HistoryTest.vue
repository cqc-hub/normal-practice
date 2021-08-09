<template>
  <div >
    <h2 @click="goBack">History</h2>
    <div>
      <a @click="aClick" href="/home">home</a>
    </div>
    <div>
      <a @click="aClick" href="/about">about</a>
    </div>

    <div class="containerHistory">
      123465
    </div>
  </div>
</template>

<script>
let i = 0
  export default {
    methods: {
      goBack() {
        history.back();
        console.log(history);
      },

      aClick(e) {
        e.preventDefault();
        const container = document.querySelector('.containerHistory');
        const href = e.target.getAttribute('href');
        history.pushState({
          name: 'cqc',
          counter: i++
        }, 'title', href);
        switch(location.pathname) {
          case '/home':
            container.innerHTML = 'home';
            break;
          case '/about':
            container.innerHTML = 'about'
            break;
        }
      }
    },
      mounted () {
        // 监听返回
        window.addEventListener('popstate', e => {
          console.log(e);
        })
      },  
  }
</script>

<style lang="less" scoped>

</style>