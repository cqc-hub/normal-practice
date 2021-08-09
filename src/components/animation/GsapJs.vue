<template>
  <div>
    <h1>
      transition-group
    </h1>
<!-- 列表交替动画 -->
    <input type="text" v-model="keyWord" />
    <transition-group 
      name="cqc1" 
      tag="ul" 
      :css="false"
      @enter="enter"
      @leave="leave"
      @before-enter="beforeEnter"
    >
      <li 
        v-for="(name, index) in showNames" 
        :key="name"
        :data-index="index"
        >
        {{name}}
      </li>
    </transition-group>
    <hr />
    <button @click="btnClick('+')">+</button>
    <button @click="btnClick('-')">-</button>
    <button @click="btnClick('$')">$</button>
    <transition-group
      tag="p"
      name="cqc"
    >
      <span
        v-for="i in groupArr" 
        :key="i"
        class="item"
        :style="{
          marginRight: '10px'
        }"
      >
      {{i}}
      </span>
    </transition-group>
    <hr />
    <button @click="toggleClick">toggle</button>
    <transition
      @enter="transitionEnter"
      @leave="transitionLeave"
      :css="false"
      appear
    >
      <div v-if="flag">
        gsap 测试
      </div>
    </transition>

    <input @input="counterChange" type="number" step="100" v-model="counter">
    <h2>{{showNumber.toFixed(0)}}</h2>
  </div>
</template>

<script>
import gsap from 'gsap';
var _ = require('lodash');
  const randomIndex = function(len) {
    return Math.floor(Math.random() * len);
  }


  export default {
    data() {
      return {
        flag: true,
        counter: 0,
        showNumber: 0,

        groupArr: [0,1,2,3,4,5,6,7,8,9],
        numCounter: 10,
        
        keyWord: '',
        names: [
          'abc',
          'cba',
          'why',
          'cqc',
          'cop',
          'jack'
        ]
      }
    },

    methods: {
      beforeEnter(el) {
        el.style.opacity = 0;
        el.style.height = 0;
      },

      enter(el, done) {
        gsap.to(el, {
          opacity: 1,
          height: '1.5em',
          delay: el.dataset.index * 0.5,
          onComplete: done
        })
      },

      leave(el, done) {
        gsap.to(el, {
          opacity: 0,
          height: 0,
          delay: el.dataset.index * 0.5,
          onComplete: done
        })
      },

      btnClick(type) {
        switch(type) {
          case '+':
            this.groupArr.splice(randomIndex(this.groupArr.length), 0, this.numCounter++)
            break;
          case '-':
            this.groupArr.splice(randomIndex(this.groupArr.length), 1)
            break;
          case '$':
            this.groupArr = _.shuffle(this.groupArr);
            break;
        }
      },

      toggleClick() {
        this.flag = !this.flag;
        gsap.to(this, {
          showNumber: 0,
          duration: 1
        })
      },

      counterChange({target: {valueAsNumber: value}}) {
        gsap.to(this, {
          duration: 1,
          showNumber: value
        })
        
        // let timer = setInterval(() => {
        //   if (this.showNumber  < value) {
        //   this.showNumber ++
        // } else {
        //   clearInterval(timer)
        // }
          
        // }, 5);

        
      },

      transitionEnter(el, done) {
        // done 需要手动调用一次， 不进行手动调用的话默认同步调用done
        gsap.from(el, {
          scale: 1,
          x: 200,
          duration: 1000,
          onComplete: done
        })
      },

      transitionLeave(el, done) {
        gsap.to(el, {
          scale: 0,
          x: 200,
          onComplete: done
        })
      }
    },

    computed: {
      showNames() {
        return this.names.filter(item => item.indexOf(this.keyWord) !== -1) 
      }
    },

  }
</script>

<style lang="less" scoped>
.item {
  display: inline-block;
}
.cqc-enter-from,
.cqc-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.cqc-enter-active,
.cqc-leave-active {
  transition: all .5s ease;
}

.cqc-leave-active {
  position: absolute;
}

.cqc-move {
  transition: transform .5s ease;
}


// 交替动画
// .cqc1-enter-from,
// .cqc1-leave-to {
//   opacity: 0;
// }

// .cqc1-enter-active,
// .cqc1-leave-active {
//   transition: opacity 1s ease;
// }
</style>