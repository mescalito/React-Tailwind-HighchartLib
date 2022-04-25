import React, {useContext} from "react";
import LaunchesContext from '../context/launches';
import Chart from './Chart'

const ChartContainer = () => {

  const { isLoading, chartOptions } = useContext(LaunchesContext);

  return (
    <div className='card bg-white flex p-6 flex-col'>
      {isLoading ? (<div className='flex flex-col bg-center gap-2 items-center'>
        <h1 className='text-2xl'>BUCKED UP! 🚀🚀 are about to hit...</h1>
        <progress className='progress w-56'></progress>
      </div>) : (<Chart chartOptions={chartOptions}/>)}
    </div>
  )
}

export default ChartContainer
