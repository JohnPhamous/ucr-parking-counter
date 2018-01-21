<template>
  <!-- <app-map/> -->
  <div id="home">
    <div class="container sign">
      <div class="title text-center mb-5">
        <h1><strong>UCR Parking Spots Available</strong></h1>
      </div>

        <div
          class="row location"
          v-for="l in locations"
          :key="l.name"
        >
          <div class="col-md-8 location-name">
            <h2>
              <strong>{{ l.name }}</strong>
            </h2>
          </div>
          <div class="col-md-4 text-right spots">
            <h2 class="spots-text">{{ l.spotsAvail }} / {{ l.spotsTotal }}</h2>
            <div class="meter" :style="{ width: (l.spotsAvail / l.spotsTotal) * 100 + '%' }">
            </div>
          </div>
        </div>
        <div class="text-center">
          Last Updated: {{ lastUpdated | date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'

function callback(data) {
  return data
}

export default {
  name: 'Home',
  data() {
    return {
      baseUrl:
        'https://cors-anywhere.herokuapp.com/https://streetsoncloud.com/parking/rest/occupancy/id/',
      lastUpdated: '',
      locations: [
        {
          name: 'Lot 21',
          address: '',
          lat: 0,
          long: 0,
          id: 85,
          spotsAvail: 0,
          spotsTotal: 0
        },
        {
          name: 'Lot 24',
          address: 'Canyon Crest Drive',
          lat: 0,
          long: 0,
          id: 81,
          spotsAvail: 0,
          spotsTotal: 0
        },
        {
          name: 'Lot 26',
          address: '3375 Rustin Avenue',
          lat: 33.98137,
          long: -117.335206,
          id: 80,
          spotsAvail: 0,
          spotsTotal: 0
        },
        {
          name: 'Lot 30',
          address: '',
          lat: 0,
          long: 0,
          id: 82,
          spotsAvail: 0,
          spotsTotal: 0
        },
        {
          name: 'Lot 32',
          address: '',
          lat: 0,
          long: 0,
          id: 83,
          spotsAvail: 0,
          spotsTotal: 0
        },
        {
          name: 'Glen Mor Structure',
          address: '',
          lat: 0,
          long: 0,
          id: 84,
          spotsAvail: 0,
          spotsTotal: 0
        }
      ]
    }
  },
  created() {
    this.locations.forEach(location => {
      axios.get(`${this.baseUrl}${location.id}`).then(response => {
        let data = eval(response.data)
        location.spotsAvail = data.results[0].free_spaces
        location.spotsTotal = data.results[0].total_spaces
        this.lastUpdated = data.results[0].date_time
      })
    })
  },
  filters: {
    date: function(value) {
      let raw = value.split(' ')
      let date = `${raw[0].substr(5, 2)}-${raw[0].substr(8, 2)}-${raw[0].substr(
        0,
        4
      )}`
      let time = raw[1]

      return `${date} at ${time}`
    }
  },
  components: {
    appMap: Map
  }
}
</script>

<style>
#home {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
}
.sign {
  background: #2d6cc0;
  color: white;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 60px;
  padding-right: 60px;
}
.location {
  margin-bottom: 1rem;
  border: 1px #f1ab00 solid;
  margin-left: auto !important;
  margin-right: auto !important;
  width: 90%;
}
.location h2 {
  margin-bottom: 0;
}
.location-name {
  padding: 10px 20px;
}
.spots {
  padding-right: 0;
  border-left: 1px solid white;
}
.spots-text {
  z-index: 1;
  position: absolute;
  right: 10px;
  padding-top: 10px;
}
.meter {
  background: #1e4a83;
  position: absolute;
  padding: 10px 20px;
  height: 100%;
  width: 100%;
  right: 0;
  z-index: 0;
}
</style>
