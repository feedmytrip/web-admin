<template>
  <div>
    <h2 class="subtitle">Schedule</h2>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <div class="field">
              <b-checkbox type="is-info" v-model="es.fixed_date">Fixed date</b-checkbox>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <b-checkbox type="is-info" v-model="es.fixed_period">Fixed period</b-checkbox>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <b-checkbox type="is-info" v-model="es.annually">Annually</b-checkbox>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <b-checkbox type="is-info" v-model="es.closed">Closed</b-checkbox>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">Start date</label>
              <div class="control">
                <b-datepicker
                  v-model="start_date"
                  placeholder="Click to select..."
                  size="is-small"
                  :editable="true"
                  :date-formatter="(date) => this.$moment(date).format('DD/MM/YYYY')"
                  :date-parser="(date) => this.$moment(date, 'DD/MM/YYYY').toDate()"
                ></b-datepicker>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">End date</label>
              <div class="control">
                <b-datepicker
                  v-model="end_date"
                  placeholder="Click to select..."
                  size="is-small"
                  :editable="true"
                  :date-formatter="(date) => this.$moment(date).format('DD/MM/YYYY')"
                  :date-parser="(date) => this.$moment(date, 'DD/MM/YYYY').toDate()"
                ></b-datepicker>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">Start time</label>
              <div class="control">
                <b-timepicker
                  v-model="start_date"
                  placeholder="Click to select..."
                  size="is-small"
                  :editable="true"
                ></b-timepicker>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">End time</label>
              <div class="control">
                <b-timepicker
                  v-model="end_date"
                  placeholder="Click to select..."
                  size="is-small"
                  :editable="true"
                ></b-timepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">Week days</label>
              <div class="block">
                <b-checkbox v-model="week_days" native-value="SUN">SUN</b-checkbox>
                <b-checkbox v-model="week_days" native-value="MON">MON</b-checkbox>
                <b-checkbox v-model="week_days" native-value="TUE">TUE</b-checkbox>
                <b-checkbox v-model="week_days" native-value="WED">WED</b-checkbox>
                <b-checkbox v-model="week_days" native-value="THU">THU</b-checkbox>
                <b-checkbox v-model="week_days" native-value="FRI">FRI</b-checkbox>
                <b-checkbox v-model="week_days" native-value="SAT">SAT</b-checkbox>
              </div>
            </div>
          </div>
          <div class="column is-2">
            <div class="field">
              <label class="label is-small"></label>
              <p class="control is-pulled-right" style="padding-rig: 1.5em;">
                <a
                  class="button is-small is-info"
                  @click="save"
                  :class="loading ? 'is-loading' : ''"
                >Save</a>
              </p>
            </div>
          </div>
        </div>
        <hr>
        <fmt-hierarchical-list
          ref="element"
          :data="schedules"
          :fields="scheduleFields"
          id="id"
          :delete-button="true"
          v-on:delete-item="deleteSchedule"
        ></fmt-hierarchical-list>
      </div>
    </div>
  </div>
</template>

<script>
import HierarchicalList from '@/components/common/HierarchicalList'
export default {
  components: {
    'fmt-hierarchical-list': HierarchicalList
  },
  async mounted () {
    const loading = this.$loading.open({
      container: this.isFullPage ? null : this.$refs.element.$el
    })
    const payload = {
      event_id: this.$route.params.id,
      queryString: '?sort=created_by&order=asc'
    }
    await this.$store.dispatch('schedules/getAll', payload)
    loading.close()
  },
  data () {
    return {
      loading: false,
      es: {
        fixed_date: false,
        fixed_period: false,
        annually: false,
        closed: false,
        week_days: '',
        start_date: null,
        end_date: null
      },
      start_date: null,
      end_date: null,
      week_days: [],
      scheduleFields: [
        {
          name: 'start_date',
          label: 'Start',
          type: 'date'
        },
        {
          name: 'end_date',
          label: 'End',
          type: 'date'
        },
        {
          name: 'closed',
          label: 'Closed',
          type: 'boolean'
        },
        {
          name: 'week_days',
          label: 'Week Days',
          type: 'text'
        },
        {
          name: 'annually',
          label: 'Annually',
          type: 'boolean'
        },
        {
          name: 'fixed_date',
          label: 'Fixed Date',
          type: 'boolean'
        },
        {
          name: 'fixed_period',
          label: 'Fixed Period',
          type: 'boolean'
        }
      ]
    }
  },
  computed: {
    schedules () {
      return this.$store.getters['schedules/all'].data
    }
  },
  methods: {
    save () {
      this.es.event_id = this.$route.params.id
      this.es.week_days = this.$_.join(this.week_days, ',')
      if (this.start_date !== null) {
        this.es.start_date = this.$moment(this.start_date).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
      }
      if (this.end_date !== null) {
        this.es.end_date = this.$moment(this.end_date).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
      }
      this.loading = true
      this.$store.dispatch('schedules/new', this.es)
        .then(() => {
          this.loading = false
          this.es = {
            fixed_date: false,
            fixed_period: false,
            annually: false,
            closed: false,
            week_days: '',
            start_date: null,
            end_date: null
          }
          this.week_days = []
          this.start_date = null
          this.end_date = null
        })
        .catch(err => {
          console.log(err)
          this.loading = false
          this.$toast.open({
            duration: 3000,
            message: err.message,
            type: 'is-danger'
          })
        })
    },
    deleteSchedule (id) {
      const loading = this.$loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      const payload = {
        event_id: this.$route.params.id
      }
      payload.schedule_id = id
      this.$store.dispatch('schedules/delete', payload)
        .then(() => {
          loading.close()
        })
        .catch(err => {
          console.log(err)
          loading.close()
          this.$toast.open({
            duration: 3000,
            message: err.message,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
