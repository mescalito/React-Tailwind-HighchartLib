/* CONSTANTS */
const LAUNCHES_FETCH = 'launches_fetch'
const LAUNCHES_SUCCESS = 'launches_success'
const LAUNCHES_ERROR = 'launches_error'
const LAUNCHES_RELOAD = 'launches_reload'

/* ACTIONS */
const launchesFetch = (payload) => ({
  type: LAUNCHES_FETCH, payload
})
const launchesSuccess = (payload) => ({
  type: LAUNCHES_SUCCESS, payload
})
const launchesError = (payload) => ({
  type: LAUNCHES_ERROR, payload
})
const launchesReload = (payload) => ({
  type: LAUNCHES_RELOAD, payload
})

/* REDUCERS */
const Reducer = (state, action) => {
  let years = []
  let shipNames = []
  let series = []
  switch (action.type) {
    case LAUNCHES_FETCH:
      return {...state, isLoading: true}
    case LAUNCHES_ERROR:
      alert(action.payload.errorMessage) // TODO: replace
      return {...state, isLoading: false, errorMessage: action.payload.errorMessage}
    case LAUNCHES_SUCCESS:
      years = filterYears(action.payload.launches)
      shipNames = filterShipName(action.payload.launches)
      series = transformChartData(action.payload.launches, shipNames, years, 'all')
      return {
        ...state, launches: [...action.payload.launches], years, shipNames, chartOptions: {
          ...state.chartOptions, xAxis: {
            categories: [...years],
          }, series: [...series],
        }, isLoading: false,
      }
    case LAUNCHES_RELOAD:
      let shipNameFiltered = []
      if (action.payload.shipFilter !== 'all') {
        shipNameFiltered = state.shipNames.filter((ship) => ship === action.payload.shipFilter)
      } else {
        shipNameFiltered = state.shipNames
      }
      series = transformChartData(state.launches, shipNameFiltered, state.years, action.payload.launchResult)
      return {
        ...state, chartOptions: {
          ...state.chartOptions, series: [...series],
        }, launchResult: action.payload.launchResult, shipFilter: action.payload.shipFilter,
      }
    default:
      return state
  }
}

/* TRANSFORMATIONS */
const transformChartData = (launches, shipNames, years, launchResult) => {
  //shipNames = ['falcon1']
  return shipNames.reduce((series, name) => {
    // find all launches per rocket_id ('falcon1')
    let launchesPerRocketId = []
    if (launchResult === 'all') {
      launchesPerRocketId = Object.values(launches).filter((launch) => launch.rocket.rocket_id === name)
    } else if (launchResult === 'successful') {
      launchesPerRocketId = Object.values(launches).filter((launch) => launch.rocket.rocket_id === name && launch.launch_success === true)
    } else if (launchResult === 'failed') {
      launchesPerRocketId = Object.values(launches).filter((launch) => launch.rocket.rocket_id === name && launch.launch_success === false)
    }

    if (shipNames.length > 1) {
      const amountLaunchesPerYearPerRocketId = years.reduce((falcon1_launches, year) => {
        return falcon1_launches.concat(launchesPerRocketId.filter((launch) => launch.launch_year === year).length)
      }, [])
      series = [...series, {
        name, data: amountLaunchesPerYearPerRocketId,
      },]
    } else {
      const amountLaunchesPerYearPerRocketIdLSuccessed = years.reduce((falcon1_launches, year) => {
        return falcon1_launches.concat(launchesPerRocketId.filter((launch) => launch.launch_year === year && launch.launch_success === true).length)
      }, [])
      series = [...series, {
        name: 'Successed', data: amountLaunchesPerYearPerRocketIdLSuccessed,
      },]
      const amountLaunchesPerYearPerRocketIdLFailed = years.reduce((falcon1_launches, year) => {
        return falcon1_launches.concat(launchesPerRocketId.filter((launch) => launch.launch_year === year && launch.launch_success === false).length)
      }, [])
      series = [...series, {
        name: 'Failed', data: amountLaunchesPerYearPerRocketIdLFailed,
      },]
    }
    return series
  }, [])
}

const filterShipName = (launches) => {
  return Object.values(launches).reduce((ship_name, launch) => {
    return [...new Set(ship_name.concat(launch.rocket.rocket_id))]
  }, [])
}

const filterYears = (launches) => {
  return Object.values(launches).reduce((years, launch) => {
    return [...new Set(years.concat(launch.launch_year))]
  }, [])
}

/* EXPORTS */
export default Reducer
export { launchesFetch, launchesSuccess, launchesError, launchesReload }
