<template>
  <div >
    <h2>Hash</h2>
    <div>
      <a href="#/home">home</a>
    </div>
    <div>
      <a href="#/about">about</a>
    </div>

    <div class="containerHash">
      123465
    </div>
  </div>
</template>

<script>
  export default {
      created () {
        window.addEventListener('hashchange', () => {
          const container = document.querySelector('.containerHash')
          switch(location.hash) {
            case '#/home':
              container.innerHTML = 'home'
              break;
            case '#/about':
              container.innerHTML = 'about'
              break;

          }
        });
      },  
  }
</script>

<style lang="less" scoped>

</style>