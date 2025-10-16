import React from 'react'
import mensCollection from '../../assets/mens-collection.webp'
import womensCollection from '../../assets/Womens-collection.webp'
import { Link } from 'react-router-dom'

const GenderCollectionSection = () => {
  return (
    <section>
        <div className='container  mx-auto lg:px-15 my-12   flex flex-col md:flex-row gap-10'>
            {/* Women's collection */}
            <div className='relative flex-1 '>
                <img src={womensCollection} alt="Women's collection" className='w-full h-[700px] object-cover' />
                <div className='absolute bottom-8 left-8 bg-white bg-opacoty-90 p-4 '>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Women's Collection
                    </h2>
                    <Link to='/collections/all?gender=women' className='text-gray-900 underline '>
                        Shop Now
                    </Link>
                </div>
            </div>

            {/* Men's Collection */}
            <div className='relative flex-1 bg-amber-300'>
                <img src={mensCollection} alt="Men's collection" className='w-full h-[700px] object-cover' />
                <div className='absolute bottom-8 left-8 bg-white bg-opacoty-90 p-4 '>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Men's Collection
                    </h2>
                    <Link to='/collections/all?gender=women' className='text-gray-900 underline '>
                        Shop Now
                    </Link>
                </div>
            </div>

        </div>
    </section>
  )
}

export default GenderCollectionSection