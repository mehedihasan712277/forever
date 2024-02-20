import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';
import banner1 from '../../../assets/banner1.jpg'
import banner2 from '../../../assets/banner2.jpg'
import banner3 from '../../../assets/banner3.jpg'

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <>
            <div className='sm:px-4 md:px-8 lg:px-12 xl:px-20 select-none'>
                <Swiper
                    spaceBetween={0}
                    effect={'fade'}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[EffectFade, Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <div>
                        <SwiperSlide>
                            <div className='w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[425px] xl:h-[500px]' >
                                <img src={banner1} alt="img" className='w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[425px] xl:h-[500px]' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[425px] xl:h-[500px]' >
                                <img src={banner2} alt="img" className='w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[425px] xl:h-[500px]' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[425px] xl:h-[500px]' >
                                <img src={banner3} alt="img" className='w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[425px] xl:h-[500px]' />
                            </div>
                        </SwiperSlide>
                    </div>
                </Swiper>
            </div>
        </>
    )
}

export default Banner