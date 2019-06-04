<template>
	<div class="timeline">
		<div class="wrapper" @click="shuffles">
			<transition-group name="tl-complete" tag="div">
				<div v-for="item in items" class="timeline-item tl-complete-item" ref="timeline" :class="{'timeline-bg':item.style}"
				 v-bind:key="item.id">
					<div class="timeline-content">
						<h3 class="timeline-date">{{item.startTime | formatDate}}</h3>
						<p>{{item.descript}}</p>
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
			this.id = this.$route.params.id;
			this.$axios.get('services/app/TimeAxisService/GetItems', {
				params: {
					AxisId: this.id
				}
			}).then(res => {
				for (var i = 0; i < res.data.result.length; i++) {
					res.data.result[i].startTime = new Date(res.data.result[i].startTime);
				}
				this.items = res.data.result;
				this.updateDom();
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
				items: [],
				allitems: [],
				id: 0
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
				for (var i = 0; i < ele.length; i++) {
					if (scrollTop > ele[i].offsetTop) {
						this.$set(this.items[i], 'style', true);
					} else {
						this.$set(this.items[i], 'style', false);
					}
				}
			},
			added(model) {
				var m = Object.assign({}, {
					style: false
				}, model);
				m.startTime = new Date(m.date);

				this.$axios.post('services/app/TimeAxisService/CreateItem', {
					axisId: this.id,
					startTime: m.startTime,
					endTime: '',
					maxPage: 0,
					minPage: 0,
					descript: m.descript,
					content: '',
					imgPath: ''
				}).then(res => {
					if (res.data.success) {
						m.id = res.data.result.id;

						var index = find(this.items, this.items.length, m, (a, b) => a.startTime - b.startTime);
						this.items.splice(index, 0, m);
						this.updateDom();
					}
				})
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
		transition: all .5s;
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
