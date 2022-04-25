import React, {useEffect, useReducer} from 'react'
import axios from 'axios'
import Reducer, {launchesFetch, launchesSuccess, launchesError, launchesReload} from './ducks/launches.ducks'
import CHART_OPTIONS from './constants/chartOptions'
import LaunchesContext from './context/launches';
import Navbar from './components/Navbar'
import Title from './components/Title'
import ChartContainer from './components/ChartContainer'

function App() {
  const initialState = {
    launches: null,
    shipNames: [],
    chartOptions: CHART_OPTIONS,
    isLoading: false,
    errorMessage: '',
    launchResult: 'all',
    shipFilter: 'all',
    spaceValue: ''
  }
  const [{
    chartOptions, shipNames, isLoading, errorMessage, launchResult, shipFilter,
  }, dispatch] = useReducer(Reducer, initialState)

  const fetchLaunches = async () => {
    try {
      dispatch(launchesFetch())
      const {data, status} = await axios.get('https://api.spacexdata.com/v3/launches/past')
      if (status === 200) {
        dispatch(launchesSuccess({launches: data}))

      }
    } catch (error) {
      dispatch(launchesError({errorMessage: error.message || error}))
    }
  }
  useEffect(() => {
    return () => {
      fetchLaunches()
    }
  }, [])
  const handleShipChange = (shipName) => {
    dispatch(launchesReload({shipFilter: shipName, launchResult: 'all'}))
  }
  const handleLaunchResult = (e) => {
    dispatch(launchesReload({shipFilter: 'all', launchResult: e.target.value}))
  }
  const isRadioSelected = (radioSelected) => {
    return launchResult === radioSelected
  }
  const appContextValue = {
    handleShipChange, shipNames, handleLaunchResult, shipFilter, isRadioSelected, isLoading, chartOptions, errorMessage
  }

  return (<LaunchesContext.Provider value={appContextValue}>
      <div className='flex flex-col min-h-screen p-2 sm:p-8 gap-4 mx-auto bg-base-300 font-medium'>
        <Navbar/>
        <Title/>
        <ChartContainer/>
      </div>
    </LaunchesContext.Provider>
  )
}

export default App
