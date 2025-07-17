import React from 'react'

const Sort = ({selected,onChange}) => {
  return (
    <>
        <div className='flex items-center'>
        <h3 className='mr-2 tracking-tighter text-2xl'>sort by:</h3>
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="block w-[20vh] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >

            <option value="Popular">Popular</option>
            <option value="Discounted">High to Low Price</option>
            <option value="Available">Low to High Price</option>
        </select>
        </div>
    </>
  )
}

export default Sort