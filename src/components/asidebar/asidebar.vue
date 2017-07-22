<template>
  <div class="asidebar">

  	<div class="content">
  		<div class="aside-head">
  			<h2>Language</h2>
  		</div>

	  	<div class="aside-content">
	  		<div v-for="(item, index) of langs" class="lang-name">{{item}}</div >
	  		<div class="lang-name">About</div>
	  	</div>
  	</div>

  	<div @click="hidebar" class="mask"></div>

  </div>
</template>

<script>

export default {
  name: 'asidebar',
  data() {
    return {
    	langs : ['JavaScript', 'HTML', 'CSS', 'PHP', 'Java', 'Ruby', 'CoffeeScript', 'Python', 'TypeScript', 'C#'],
    }
  },
  methods: {
  	hidebar() {
  		// console.log('hidebar');
  		this.$emit('hidebar');
  	}
  }
}
</script>

<style lang="scss">
	.asidebar {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 3;
		display: flex;
    // flex-direction: column;
		.content {
			flex: 0 0 160px;
			height: 100%;
			background: rgba(0,0,0,.6);
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
        align-items: center;
        text-align: center;
        letter-spacing: 2px;
        height: 80px;
        line-height: 40px;
			}
			.lang-name {
				width: 100%;
        border-bottom: 1px solid rgba(255,255,255,.2);

			}
		}
		.mask {
			flex: 1;
		}
	}
</style>
