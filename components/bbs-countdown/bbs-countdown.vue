<template>
	<view class="bbs-countdown" :style="{color: setColor}">
		距结束<text class="middle">:</text>
		<!-- <text>{{days < 10 ? `0${days}` : days}}天</text> -->
		<text class="card">{{hours < 10 ? `0${hours}` : hours}}</text>
		<text class="middle">:</text>

		
		<text class="card">{{minutes < 10 ? `0${minutes}` : minutes}}</text>
		<text class="middle">:</text>
		<text class="card">{{seconds < 10 ? `0${seconds}` : seconds}}</text>

	</view>
</template>
<script>
	const MILLISECONDS_SECOND = 1000;
	const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
	const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
	const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

	export default {
		name: 'bbs-countdown',
		props: {
			/**
			 * Starts the countdown automatically when initialized.
			 */
			autoStart: {
				type: Boolean,
				default: true,
			},

			/**
			 * Emits the countdown events.
			 */
			emitEvents: {
				type: Boolean,
				default: true,
			},

			/**
			 * The interval time (in milliseconds) of the countdown progress.
			 */
			interval: {
				type: Number,
				default: 1000,
				validator: value => value >= 0,
			},

			/**
			 * The time (in milliseconds) to count down from.
			 */
			time: {
				type: Number,
				default: 0,
				validator: value => value >= 0,
			},
			setColor: {
				type: String,
				default: "#ffffff"
			}
		},
		computed: {
			/**
			 * Remaining days.
			 * @returns {number} The computed value.
			 */
			days() {
				return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY);
			},

			/**
			 * Remaining hours.
			 * @returns {number} The computed value.
			 */
			hours() {
				return Math.floor((this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR);
			},

			/**
			 * Remaining minutes.
			 * @returns {number} The computed value.
			 */
			minutes() {
				return Math.floor((this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE);
			},

			/**
			 * Remaining seconds.
			 * @returns {number} The computed value.
			 */
			seconds() {
				return Math.floor((this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND);
			},

			/**
			 * Remaining milliseconds.
			 * @returns {number} The computed value.
			 */
			milliseconds() {
				return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND);
			},

			/**
			 * Total remaining days.
			 * @returns {number} The computed value.
			 */
			totalDays() {
				return this.days;
			},

			/**
			 * Total remaining hours.
			 * @returns {number} The computed value.
			 */
			totalHours() {
				return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR);
			},

			/**
			 * Total remaining minutes.
			 * @returns {number} The computed value.
			 */
			totalMinutes() {
				return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE);
			},

			/**
			 * Total remaining seconds.
			 * @returns {number} The computed value.
			 */
			totalSeconds() {
				return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND);
			},
		},
		data() {
			return {
				/**
				 * It is counting down.
				 * @type {boolean}
				 */
				counting: false,
				// timeoutId: '',
				/**
				 * The absolute end time.
				 * @type {number}
				 */
				endTime: 0,

				/**
				 * The remaining milliseconds.
				 * @type {number}
				 */
				totalMilliseconds: 0,
			}
		},
		watch: {
			$props: {
				deep: true,
				immediate: true,

				/**
				 * Update the countdown when props changed.
				 */
				handler() {
					this.totalMilliseconds = this.time;
					this.endTime = new Date().getTime() + this.time;

					if (this.autoStart) {
						this.start();
					}
				},
			},
		},
		methods: {
			/**
			 * Starts to countdown.
			 * @public
			 * @emits Countdown#start
			 */
			start() {
				if (this.counting) {
					return;
				}

				this.counting = true;

				if (this.emitEvents) {
					/**
					 * Countdown start event.
					 * @event Countdown#start
					 */
					this.$emit('start');
				}

				this.continue();
			},

			/**
			 * Continues the countdown.
			 * @private
			 */
			continue () {
				if (!this.counting) {
					return;
				}
				const delay = Math.min(this.totalMilliseconds, this.interval);

				if (delay > 0) {

					this.timeoutId = setTimeout(() => {
						this.progress();
					}, delay);
				} else {
					this.end();
				}
			},

			/**
			 * Pauses the countdown.
			 * @private
			 */
			pause() {
				clearTimeout(this.timeoutId);
			},

			/**
			 * Progresses to countdown.
			 * @private
			 * @emits Countdown#progress
			 */
			progress() {
				if (!this.counting) {
					return;
				}

				this.totalMilliseconds -= this.interval;

				if (this.emitEvents && this.totalMilliseconds > 0) {
					/**
					 * Countdown progress event.
					 * @event Countdown#progress
					 */
					this.$emit('progress', {
						days: this.days,
						hours: this.hours,
						minutes: this.minutes,
						seconds: this.seconds,
						milliseconds: this.milliseconds,
						totalDays: this.totalDays,
						totalHours: this.totalHours,
						totalMinutes: this.totalMinutes,
						totalSeconds: this.totalSeconds,
						totalMilliseconds: this.totalMilliseconds,
					});
				}

				this.continue();
			},

			/**
			 * Aborts the countdown.
			 * @public
			 * @emits Countdown#abort
			 */
			abort() {
				if (!this.counting) {
					return;
				}

				this.pause();
				this.counting = false;

				if (this.emitEvents) {
					/**
					 * Countdown abort event.
					 * @event Countdown#abort
					 */
					this.$emit('abort');
				}
			},

			/**
			 * Ends the countdown.
			 * @public
			 * @emits Countdown#end
			 */
			end() {
				if (!this.counting) {
					return;
				}

				this.pause();
				this.totalMilliseconds = 0;
				this.counting = false;

				if (this.emitEvents) {
					/**
					 * Countdown end event.
					 * @event Countdown#end
					 */
					this.$emit('end');
				}
			},

			/**
			 * Updates the count.
			 * @private
			 */
			update() {
				if (this.counting) {
					this.totalMilliseconds = Math.max(0, this.endTime - this.now());
				}
			},
		},
		beforeDestroy() {
			this.pause();
		}
	}
</script>
<style lang="scss">
	.bbs-countdown{
		color: #000 !important;
	}
	.card{
		background:rgba(19,19,19,1);
		border-radius:4px;
		color: #FFFFFF;
		font-size: 24upx;
		padding:1px 4px;
	}
	.middle{
		margin: 0 8upx;
	}

</style>
