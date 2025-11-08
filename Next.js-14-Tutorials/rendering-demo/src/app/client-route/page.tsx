'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ThemeContext, useTheme } from '@/components/theme-provider'
import { useContext } from 'react'

// import "./ImageSlider.css";

export default function ClientRoutePage() {
  const theme = useTheme()

  const theme2 = useContext(ThemeContext)
  return (
    <>
      {/* {JSON.stringify({ theme2, theme })} */}
      <h1
        style={{
          color: theme.colors.secondary,
        }}
      >
        Server Route
      </h1>
      <div className="image-slider-container">
        <Slider>
          <div>
            <img src="https://picsum.photos/400/200" alt="placeholder" />
          </div>
          <div>
            <img src="https://picsum.photos/400/300" alt="placeholder" />
          </div>
          <div>
            <img src="https://picsum.photos/400/250" alt="placeholder" />
          </div>
          <div>
            <img src="https://picsum.photos/400/350" alt="placeholder" />
          </div>
        </Slider>
      </div>
    </>
  )
}
