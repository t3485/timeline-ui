<template>
	<div class="timeline">
		<div class="wrapper" @click="shuffles">
			<transition-group name="tl-complete" tag="div">
				<div v-for="item in items" class="timeline-item tl-complete-item" ref="timeline" :class="{'timeline-bg':item.style}"
				 v-bind:key="item.id">
					<div class="timeline-content">
						<h3 class="timeline-date">{{item.date | formatDate}}</h3>
						<p>{{item.info}}</p>
					</div>
					<div class="timeline-circle"></div>
				</div>
			</transition-group>
		</div>
		<addDialog @timeline:addOK="added" :visible="addedDialogVisible"></addDialog>
		<AddControl @add:click="addClick"></AddControl>
	</div>
</template>

<script>
	import addDialog from '@/components/timeline_add.vue'
	import AddControl from '@/components/AddControl.vue'
	import {
		formatDate,
		find
	} from '../common/filter.js'

	export default {
		created() {
			this.$store.commit('setTimeline', {
				title: 'adfasdf',
				id: 1
			});
		},
		destroyed() {
			this.$store.commit('setTimeline', {
				title: '',
				id: 0
			});
			window.removeEventListener("scroll", this.scrollShow);
		},
		components: {
			addDialog,
			AddControl
		},
		data() {
			return {
				items: [{
						id: 1,
						date: new Date('2018/1/1'),
						info: 'cooooooo',
						style: true
					},
					{
						id: 2,
						date: new Date('2018/1/4'),
						info: 'cooooooo<br/>fsdfas',
						style: false
					},
					{
						id: 3,
						date: new Date('2018/1/11'),
						info: 'cooooooo',
						style: false
					},
					{
						id: 4,
						date: new Date('2018/1/21'),
						info: 'cooooooo',
						style: false
					},
					{
						id: 5,
						date: new Date('2018/2/1'),
						info: 'cooooooo',
						style: false
					},
					{
						id: 6,
						date: new Date('2018/2/11'),
						info: 'cooooooo',
						style: false
					},
					{
						id: 7,
						date: new Date('2018/2/21'),
						info: 'cooooooo',
						style: false
					},
					{
						id: 8,
						date: new Date('2018/3/11'),
						info: 'cooooooo',
						style: false
					},
					{
						id: 9,
						date: new Date('2018/3/14'),
						info: 'cooooooo',
						style: false
					},
					{
						id: 10,
						date: new Date('2018/5/11'),
						info: 'cooooooo',
						style: false
					},
					{
						id: 11,
						date: new Date('2018/9/11'),
						info: 'cooooooo',
						style: false
					}
				],
				allitems: []
			}
		},
		computed: {
			addedDialogVisible() {
				return this.$store.state.popAddDialog;
			}
		},
		methods: {
			scrollShow() {
				var scrollTop = (window.pageYOffset || document.documentElement.scrollTop ||
					document.body.scrollTop) + window.innerHeight - 300;
				var ele = this.allitems;
				console.log(ele.length)
				for (var i = 0; i < ele.length; i++) {
					if (scrollTop > ele[i].offsetTop) {
						this.items[i].style = true;
					} else {
						this.items[i].style = false;
					}
				}
			},
			added(model) {
				var m = Object.assign({}, {
					style: false
				}, model)
				m.date = new Date(m.date);
				var index = find(this.items, this.items.length, m, (a, b) => a.date - b.date);
				this.items.splice(index, 0, m);
				this.updateDom();
			},
			shuffles: function() {
				var r = this.items.concat();
				this.items = this.shuffle(r);
				this.updateDom();
			},
			shuffle(v) {
				for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
				return v;
			},
			addClick() {
				this.$store.commit('setPopStatus', true);
			},
			updateDom() {
				this.$nextTick(() => {
					this.allitems = document.querySelectorAll('div.timeline-item');
				});
			}
		},
		mounted() {
			this.updateDom();
			window.addEventListener("scroll", this.scrollShow);
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			}
		}
	}
</script>

<style>
	.timeline-item p {
		margin-top: 8px;
	}

	.tl-complete-item {
		transition: all 1s;
	}

	.tl-complete-enter,
	.tl-complete-leave-to {
		transform: translateX(1024px);
	}

	.tl-complete-enter:nth-child(2n),
	.tl-complete-leave-to:nth-child(2n) {
		transform: translateX(-1024px);
		opacity: 0;
	}
</style>
