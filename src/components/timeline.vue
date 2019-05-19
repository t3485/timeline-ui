<template>
  <div class="timeline">
  	<div class="wrapper">
  		<div v-for="item in items" class="timeline-item" ref="timeline" :class="{'timeline-bg':item.style}">
  			<div class="timeline-content">
  				<h3 class="timeline-date">{{item.date}}</h3>
  				<p>{{item.info}}</p>
  			</div>
  			<div class="timeline-circle"></div>
  		</div>
  	</div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        items:[{date:'2018-1-', info:'cooooooo', style:true},
          {date:'2018-1-', info:'cooooooo', style:false},
          {date:'2018-1-', info:'cooooooo', style:false},
          {date:'2018-1-', info:'cooooooo', style:false},
          {date:'2018-1-', info:'cooooooo', style:false},
          {date:'2018-1-', info:'cooooooo', style:false},
          {date:'2018-1-', info:'cooooooo', style:false},
          {date:'2018-1-', info:'cooooooo', style:false},
          {date:'2018-1-', info:'cooooooo', style:false},
          {date:'2018-1-', info:'cooooooo', style:false},
          {date:'2018-1-', info:'cooooooo', style:false}],
        }
    },
    methods: {
    	scrollShow() {
    		var scrollTop = (window.pageYOffset || document.documentElement.scrollTop ||
    			document.body.scrollTop) + window.innerHeight - 300;
    		var ele = this.$refs.timeline;
    		for (var i = 0; i < ele.length; i++){
    			if (scrollTop > ele[i].offsetTop){
    				this.items[i].style = true;
    			}
    			else{
    				this.items[i].style = false;				
    			}
    		}
    	}
    },
    mounted() {
    	window.addEventListener("scroll", this.scrollShow);
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  body,
  h3,
  p {
    margin: 0;
    padding: 0;
  }

  body {
    background: linear-gradient(to left, #BE93C5, #7BC6CC)
  }

  .wrapper {
    padding: 20px 0;
  }

  .timeline {
    width: 80%;
    margin: auto;
    position: relative;
  }

  .timeline::before {
    content: "";
    left: 50%;
    position: absolute;
    color: black;
    height: 100%;
    border-left: 4px solid #8d94b1;
    margin-left: -2px
  }

  .timeline-item {
    overflow: hidden;
    position: relative;
  }

  .timeline-item::after {
    content: "";
    clear: both;
    display: table;
  }

  .timeline-content {
    width: 40%;
    border-radius: 6px;
    padding: 30px 30px;
    transition: all .3s ease-out;
    color: #65adb7;
    background-color: white;
  }

  .timeline-item:nth-child(2n) .timeline-content {
    float: right;
    color: #b292c5;
  }

  .timeline-bg:nth-child(2n) .timeline-content {
    background-color: #b292c5;
    color: white;
  }

  .timeline-bg .timeline-content {
    color: white;
    background-color: #65adb7;
  }

  .timeline-content::before {
    content: "";
    width: 10%;
    height: 4px;
    background: #65adb7;
    content: '';
    display: block;
    position: absolute;
    left: 40%;
    top: 18px;
  }

  .timeline-item:nth-child(2n) .timeline-content::before {
    left: 50%;
    background: #b292c5;
  }

  .timeline-circle {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    top: 0;
    background: #65adb7;
    border-radius: 50%;
    border: 4px solid #8d94b1;
  }

  .timeline-item:nth-child(2n) .timeline-circle {
    background: #9aa0b9;
  }

  .timeline-date {
    border: 2px solid white;
    border-radius: 4px;
    display: inline-block;
    padding: 5px 10px;
    font-size: 16px;
    background-color: #65adb7;
    color: white;
  }

  .timeline-item:nth-child(2n) .timeline-date {
    background-color: #b292c5;
  }

  .timeline-item p {
    margin-top: 8px;
  }
</style>
