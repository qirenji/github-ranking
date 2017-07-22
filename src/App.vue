<template>
  <div id="app">
    
    <div class="header">
      <i @click="isShowBar=true" class="icon-menu"></i>
      <h1>GitHub Ranking</h1> 
    </div>
    <transition name="fadeIn">
      <div v-show="isShowBar" class="asidebar">
      <div class="content-aside">
        <div class="aside-head">
          <h2>Language</h2>
        </div>

        <div class="aside-content">
          <div @click="search(item, index)" v-for="(item, index) of langs" class="lang-name" :class="{current: index===currentIndex}">{{item}}</div >
          <div @click="isShowAbout=true" class="lang-name">About</div>
        </div>
      </div>
      <div @click="isShowBar=false" class="mask"></div>
      </div>
    </transition>

    <div class="content">
      <i v-show="isLoading" class="icon-loading"></i>
      <div v-for="(item, index) of infos" v-show="!isLoading" class="item">
        <div class="name">
          <a :href="item ? item.link : 'https://microzz.com/'" target="_blank">{{ item ? item.title : '' }}</a>
        </div>
        <div class="desc">
          {{ item ? item.desc : '' }}
        </div>
        <div class="infos">
          <div class="lang">
            <span :class="[lang.replace('\#', '')]"></span>{{lang}}
          </div>
          <div class="star">
            <svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
            {{ item ? item.star : '' }}
          </div>
        </div>
        <div class="update">
          {{ item ? item.updateDate : ''}}
        </div>
      </div>
    </div>

    <div v-show="isShowAbout" class="about">
      <i @click="isShowAbout=false" class="close"></i>
      <div class="about-content">
        <h1>关于</h1>
        <h2>github排行榜</h2>
        <p class="skill"><b>技术栈</b>：</p>
        <div>Vue2<br>axios<br>SASS(SCSS)<br>Express<br>cheerio<br>request、request-promise<br>Webpack<br>ES6<br>CSS3</div>
        <p class="url"><b>源码地址</b>：<a href="javascript:" target="_blank">GitHub</a></p>
        <p class="url"><b>个人网站</b>：<a href="www.qirenji.info" target="_blank">qirenji</a></p>
      </div>
    <div class="mask" @click="isShowAbout=false"></div>
  </div>

  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      infos: [],
      isLoading: false,
      isShowBar: false,
      langs : ['JavaScript', 'HTML', 'CSS', 'PHP', 'Java', 'Ruby', 'CoffeeScript', 'Python', 'TypeScript', 'C#'],
      lang: 'JavaScript',
      currentIndex: '',
      isShowAbout: false
    }
  },
  methods: {
    getData(lang='JavaScript', sort='stars') {
      this.axios.get(`/api/github-ranking/${lang.replace('#', '%23')}/${sort}`)
        .then(result => result.data)
        .then(data => {
          Object.keys(data).forEach(item => {
            data[item].forEach((val, index) => {
              if (!this.infos[index]) {
                this.infos[index] = {};
              }
              this.infos[index][item.replace(/s$/, '')] = val;
            })
          })
          this.isLoading = false;
        })
    },
    search(lang, index) {
      this.currentIndex = index;
      this.lang = lang;
      this.getData(lang);
      this.isShowMenu = false;
      this.isLoading = true;
    }
  },
  mounted() {
    this.search('JavaScript',0);
  }
}
</script>

<style lang="scss">
@import "./common/style/base.scss";

#app {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    position: relative;
    z-index: 1;
    flex: 1;
    width: 100%;
    background-color: #737476;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 1.8rem;
      color: #fff;
    }
    .icon-menu {
       position: absolute;
       left: 15px;
      width: 30px;
      height: 30px;
      display: block;
      background: url('./common/icons/menu.svg') no-repeat;
      background-size: contain;
      cursor: pointer;
    }
  }
  .asidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    display: flex;
    .content-aside {
      flex: 0 0 180px;
      height: 100%;
      background: rgba(115,115,115,.9);
      color: #f1f1f1;
      .aside-head {
        flex: 1;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        height: 100px;
        margin-top: 10px;
      }
      .aside-content {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        // align-items: center;
        text-align: center;
        letter-spacing: 2px;
      }
      .lang-name {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(255,255,255,.2);
      }
      .lang-name:hover {
        background-color: #F1F1F1;
        color: #2136A9;
        border-right: 1px solid #f1f1f1;
      }
      .current {
        color:#2136A9;
        background-color: #f1f1f1;
        border:-right 1px solid #f1f1f1;
      }
    }
    .mask {
      flex: 1;
    }
  }

  .content {
    position: relative;
    width: 100%;
    // height: 100%;
    flex: 9;
    overflow: auto;
    // text-align: center;

    .icon-loading {
      display: block;
      width: 35px;
      height: 35px;
      margin: 8px auto;
      background: url('./common/icons/loading.svg') no-repeat;
      background-size: contain;
      animation: loading .6s linear infinite;
    }

    .item:hover {
      background-color: #FAFAFA;
    }

    .item {
      width: 100%;
      padding: 15px 5%;
      text-align: left;
      .name {
        font-size: 120%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: bold;
        padding-top: 10px;
        padding-left: 10px;
      }
      .desc {
        padding-top: 12px;
        padding-left: 10px;
        width: 98%;
        line-height: 1.5rem;
      }
      .infos {
        display: flex;
        padding: 5px;
        .lang {
          padding: 10px;
          letter-spacing: 1px;
          flex: 4;
          span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background-color: #f1e05a;
            margin-right: 10px;
          }
          .C {
            background-color: #178600;
          }
          .TypeScript {
            background-color: #2b7489;
          }
          .Python {
            background-color: #3572A5;
          }
          .CoffeScript {
            background-color: #244776;
          }
          .Ruby {
            background-color: #701516;
          }
          .Java {
            background-color: #b07219;
          }
          .PHP {
            background-color: #4F5D95;
          }
          .CSS {
            background-color: #563d7c;
          }
          .HTML {
            background-color: #e34c26;
          }
        }
        .star {
          flex: 1;
          height: 16px;
          .octicon {
            vertical-align: -2px;
            margin-right: 3px;
            margin-top: 15px;
          }
        }
      }
      .update {
        color: gray;
        font-size: 90%;
        padding-left: 15px;
      }

      border-top: 1px solid rgba(0, 0, 0, .1);
    }

  }
  @media screen and (min-width: 760px){
    .content {
      width: 70%;
      margin-left: 15%;
      margin-right: 15%;
    }
  }


  .about {
    display: flex;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    // background-color: rgba(0, 0, 0, .5);
    .close {
      position: absolute;
      z-index: 3;
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url('./common/icons/close.svg') no-repeat;
      background-size: contain;
      top: 11%;
      right: 12%;
    }
    @media screen and (min-width: 760px) {
      .close {
        right: 26%;
      }
    }
    .about-content {
      position: relative;
      z-index: 2;
      width: 80%;
      height: 80%;
      background-color: white;
      border-radius: 10px;
      padding: 30px 10px;
      box-shadow: 0 0 20px gray;
      overflow: auto;

      h1 {
        text-align: center;
        font-size: 1.6rem;
        color: #31c27c;
        padding: 20px;  
        }
      h2 {
        font-size: 1.2rem;
        text-align: center;
      }
      .skill,.url {
        text-indent: 1.2rem;
        margin-top: 16px;
        line-height: 2rem;
        b {
          display: inline-block;
        }

      }
      div {
        padding-left: 60px;
        line-height: 1.5rem;
      }
      
    }
    @media screen and (min-width: 760px) {
      .about-content {
        width: 50%!important;
      }
    }
    .mask {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: none;
    }
  }

.showAbout-enter-active {
  transition: all .4s ease-in-out;
}
.showAbout-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.showAbout-enter, .showAbout-leave-active {
  transform: rotateZ(180deg);
  opacity: 0;
}

.fadeIn-enter-active {
  transition: all .4s ease;
}
.fadeIn-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fadeIn-enter, .fadeIn-leave-active {
  transform: translateX(-250px);
  opacity: 0;
}
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
}
</style>
