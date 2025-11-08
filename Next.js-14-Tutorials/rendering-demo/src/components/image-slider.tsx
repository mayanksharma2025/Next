'use client'

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const ImageSlider = ({ loop }: { loop: Number }) => {
  const settings = {
    dots: true,
  }
  return (
    <div className="image-slider-container">
      <Slider {...settings}>
        {[...Array(loop)].map((n, _i) => (
          <div key={_i.toString()}>
            <img src="https://picsum.photos/400/200" />
          </div>
        ))}
      </Slider>
    </div>
  )
}
