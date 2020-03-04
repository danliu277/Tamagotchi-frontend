import React, { Component } from 'react'

const ghostImg = [
    'https://25.media.tumblr.com/fc75e2d8c105a33d4f7b79eac5691258/tumblr_mk726dRAip1qcm5b7o1_400.gif', 
    'https://i.ya-webdesign.com/images/ghost-gif-png-8.gif', 
    'https://i.ya-webdesign.com/images/ghost-gif-png-4.gif', 
    'https://i.ya-webdesign.com/images/ghost-gif-png-1.gif', 
    'https://i.ya-webdesign.com/images/ghost-gif-png-5.gif',
    'https://i.pinimg.com/originals/c9/a9/fa/c9a9fa3a1fd58f70df1a05ade71ae6fe.gif',  
    'https://i.pinimg.com/originals/53/04/96/530496f5dcf65046e8c0360d7d89b10a.gif', 
    'https://i.ya-webdesign.com/images/ghost-gif-png-14.gif', 
    'https://thumbs.gfycat.com/LikelyReadyDinosaur-max-1mb.gif', 
    'https://38.media.tumblr.com/cc19deb13574fc4ade9f58d53921f9dd/tumblr_mude7hB89u1rgpyeqo1_250.gif', 
    'https://i.gifer.com/PPCX.gif'
]

const shuffledGhostImg = ghostImg.sort((a,b) => 0.5 - Math.random())

class Graveyard extends Component {
    state = {
        interval: 0,
        left: 0,
        top: 0
    }

    componentDidMount() {
        const interval = setInterval(() => {
            this.setState(() => {
                return {
                    left: Math.floor(Math.random() * Math.floor(50)),
                    top: Math.floor(Math.random() * Math.floor(50))
                }
            })
        }, 1000);
        this.setState(() => ({ interval }))
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    renderGhosts = () => {
        return this.props.tamagotchis.map((status, index) => {
            const imgUrl = shuffledGhostImg[index % shuffledGhostImg.length]
            return (
                <div key={status.id} 
                    className="ghost-wrapper" 
                    style={{ left: `${Math.floor(Math.random() * Math.floor(100))}%`, top: `${Math.floor(Math.random() * Math.floor(100))}%` }} >
                    <h3 className='neon'>
                        {status.nickname}
                    </h3>
                    <img 
                        className='tamagotchi'
                        src={imgUrl} 
                        alt="ghost" />
                </div>
            )
        })
    }


    render() {
        return (
            <div>
                { this.renderGhosts() }
            </div>
        )
    }
}

export default Graveyard
