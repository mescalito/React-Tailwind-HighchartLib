import React, {useContext, useState} from "react";
import LaunchesContext from '../context/launches';

const Navbar = () => {

  const {spaceValue, handleShipChange, shipNames, handleLaunchResult} = useContext(LaunchesContext);
  const [showLaunchDropdown, setShowLaunchDropdown] = useState(false)
  const [showShipDropdown, setShowShipDropdown] = useState(false)

  return (<div className='navbar flex items-right sm:items-end bg-white rounded-box'>
      <div className='flex flex-row sm:justify-end sm:w-full h-full gap-8'>
        <div className='flex gap-4 items-center'>
          <h1 className='font-sans text-base sm:text-xl'>Ship Name:</h1>
          <ul className='menu w-44 text-xl menu-horizontal p-0 items-center gap-2'>
            <li tabIndex='0'>
              <button
                className='btn-ghost font-sans text-sm w-44 whitespace-nowrap justify-between sm:text-xl '
                onClick={() => setShowShipDropdown(!showShipDropdown)}
              >
                {spaceValue || 'All '}
                <svg
                  className='fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                >
                  <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'/>
                </svg>
              </button>
              {showShipDropdown ? (<ul className='p-2 z-10  bg-gray-100 '>
                <li key='all'>
                      <span
                        className='hover:bg-gray-100 '
                        onClick={(e) => handleShipChange('all')}
                      >
                        All
                      </span>
                </li>

                {shipNames.map((ship) => (<li key={ship} value={ship}>
                        <span
                          className='hover:bg-gray-100'
                          onClick={(e) => handleShipChange(ship)}
                        >
                          {ship}
                        </span>
                </li>))}
              </ul>) : (<></>)}
            </li>
          </ul>
        </div>


      </div>
      {/* Launch result mobile View */}
      <div className='flex  text-base sm:text-xl sm:hidden '>
        <ul className='menu menu-horizontal p-0'>
          <li tabIndex='0'>
            <button
              className='btn-ghost font-medium '
              onClick={() => setShowLaunchDropdown(!showLaunchDropdown)}
            >
              Launch result
              <svg
                className='fill-current'
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'/>
              </svg>
            </button>
            {showLaunchDropdown ? (<ul className='p-2 z-10 w-full bg-gray-100'>
              <li>
                <button
                  className='btn-ghost hover:bg-gray-100'
                  label='All'
                  value='all'
                  onClick={handleLaunchResult}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className='btn-ghost hover:bg-gray-100'
                  label='Successful'
                  value='successful'
                  onClick={handleLaunchResult}
                >
                  Successfull
                </button>
              </li>
              <li>
                <button
                  className='btn-ghost hover:bg-gray-100'
                  label='Failed'
                  value='failed'
                  onClick={handleLaunchResult}
                >
                  Failed
                </button>
              </li>
            </ul>) : (<></>)}
          </li>
        </ul>
      </div>
    </div>)
}

export default Navbar
