import React, { Component } from 'react'
import { connect } from 'react-redux'

import slide1 from '../images/slide-1.png'
import slide2 from '../images/slide-2.png'
import slide3 from '../images/slide-3.png'
import slide4 from '../images/slide-4.png'
import slide5 from '../images/slide-5.png'
import slide6 from '../images/slide-6.png'
import slide7 from '../images/slide-7.png'
import slide8 from '../images/slide-8.png'
import slide9 from '../images/slide-9.png'
import slide10 from '../images/slide-10.png'
import slide11 from '../images/slide-11.png'
import slide12 from '../images/slide-12.png'
import slide13 from '../images/slide-13.png'
import slide14 from '../images/slide-14.png'

import Swiper from 'react-id-swiper'


class StartText extends Component {
    render() {
        const { language: l } = this.props.lang
        const { startScreen: block } = l

        return (
            <div className="main__start">
                <div className="main__start__text">
                    <h1 className="h1 red main__start_title">{block.title}</h1>
                    <p className="regular white main__start_desc">{block.subtitle}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    lang: state.language
})

StartText = connect(mapStateToProps)(StartText)

class Slider extends Component {
    render() {

        const params = {
            spaceBetween: 30,
            freeMode: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false
            },
            loop: true,
            speed: 6000,
            slidesPerView: 10,
            breakpoints: {
                500: {
                    slidesPerView: 3
                },
                991: {
                    slidesPerView: 6
                },
                1400: {
                    slidesPerView: 8
                },
                1500: {
                    slidesPerView: 9
                }
            }
        }

        return (
            <div className="main__start__slider">
                <Swiper {...params}  >
                    <div><img src={slide1} alt="badge"/></div>
                    <div><img src={slide2} alt="badge"/></div>
                    <div><img src={slide3} alt="badge"/></div>
                    <div><img src={slide4} alt="badge"/></div>
                    <div><img src={slide5} alt="badge"/></div>
                    <div><img src={slide6} alt="badge"/></div>
                    <div><img src={slide7} alt="badge"/></div>
                    <div><img src={slide8} alt="badge"/></div>
                    <div><img src={slide9} alt="badge"/></div>
                    <div><img src={slide10} alt="badge"/></div>
                    <div><img src={slide11} alt="badge"/></div>
                    <div><img src={slide12} alt="badge"/></div>
                    <div><img src={slide13} alt="badge"/></div>
                    <div><img src={slide14} alt="badge"/></div>
                </Swiper>
            </div>
        )
    }
}

export { Slider, StartText }