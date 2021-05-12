import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg'

import Wrapper from '../components/Wrapper'
import Logo from '../components/Logo'

import separator from '../images/slash.svg'
import den from '../images/den.png'
import yura from '../images/yura.png'

import vk from '../images/vk.svg'
import inst from '../images/inst.svg'
import telegram from '../images/telegram.svg'

class About extends Component {
    render() {
        const { pageAbout: block } = this.props.lang.language

        return (
            <Wrapper>
                <section id="About" className="about">
                    <Logo />
                    <ul className="breadcrumbs">
                        <li><Link to="/">{block.bread[0]}</Link></li>
                        <li className="separator"><img src={separator}/></li>
                        <li>{block.bread[1]}</li>
                    </ul>
                    <div className="about__start">
                        <div className="about__start__text">
                            <h1 className="h1 red about__start_title">{block.title}</h1>
                            <p className="regular white about__start_desc">{block.subtitle}</p>
                        </div>
                    </div>
                    <div className="autors">
                        <div className="autors__item">
                            <img src={yura} className="autors__item_avatar" />
                            <p className="autors__item_name red">{block.designer.name}</p>
                            <p className="autors__item_desc white">{block.designer.self}</p>
                            <ul className="socials">
                                <li><a href="https://vk.me/yuradesignit" target="_blank" rel="noopener noreferrer" className="vk"><ReactSVG src={vk}/></a></li>
                                <li><a href="https://www.instagram.com/yuradesignit/" target="_blank" rel="noopener noreferrer" className="inst"><ReactSVG src={inst}/></a></li>
                                <li><a href="tg://resolve?domain=yuradesignit" target="_blank" rel="noopener noreferrer" className="telegram"><ReactSVG src={telegram}/></a></li>
                            </ul>
                            <a href="https://lope.agency/" target="_blank" rel="noopener noreferrer" className="link border autors__item_site">lope.agency</a>
                        </div>
                        <div className="autors__item">
                            <img src={den} className="autors__item_avatar" />
                            <p className="autors__item_name red">{block.developer.name}</p>
                            <p className="autors__item_desc white">{block.developer.self}</p>
                            <ul className="socials">
                                <li><a href="https://vk.me/ya_ytochka" target="_blank" rel="noopener noreferrer" className="vk"><ReactSVG src={vk}/></a></li>
                                <li><a href="tg://resolve?domain=ytka1337" target="_blank" rel="noopener noreferrer" className="telegram"><ReactSVG src={telegram}/></a></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => ({
    lang: state.language
})

export default connect(mapStateToProps)(About)