import React, {useContext} from "react";
import LaunchesContext from '../context/launches';
import RadioButton from "./RadioButton";

const Title = () => {

  const { shipFilter, isRadioSelected, handleLaunchResult } = useContext(LaunchesContext);
  
  return (
    <div className='flex h-10 p-6 font-sans text-lg w-full justify-between gap-4 items-center sm:text-xl flex gap-2'>
      <div className='flex gap-2'>
        <span>🚀</span>
        <h1>SpaceX Launches{shipFilter ? `: ${shipFilter}` : ``}</h1>
      </div>
      {/* Launch Result desktopView */}
      {shipFilter === 'all' && (<div className='hidden sm:flex'>
        <div className='flex gap-3  items-center '>
          <h1 className='font-sans text-lg sm:text-xl'>
            Launch result:
          </h1>

          <RadioButton
            label='All'
            value='all'
            checked={isRadioSelected('all')}
            onChange={handleLaunchResult}
          />
          <RadioButton
            label='Successful'
            value='successful'
            checked={isRadioSelected('successful')}
            onChange={handleLaunchResult}
          />
          <RadioButton
            label='Failed'
            value='failed'
            checked={isRadioSelected('failed')}
            onChange={handleLaunchResult}
          />
        </div>
      </div>)}
    </div>
  )
}

export default Title
