import React from 'react';
import { Link } from 'react-router-dom';
import Sound from 'react-sound';
import home_opening from '../utils/audio/home_opening.mp3';
import { Container, Modal, Button } from 'react-bootstrap';

import "./Home.css"

const Home = () => {
    return (
            <div className="home">
                <Container className="home-container">
                    <h1 className="welcome-banner"><img src="pokemon5.png" width="550" height="100"/></h1>
                    <p className= "main-text"> {`
                     Welcome to the world of Pokémon! This world is inhabited by creatures called Pokémon! 
                     For some people, Pokémon are pets. Others use them for fights. 
                     Your very own Pokémon adventure is about to unfold! 
                     A world of dreams and adventures with Pokémon awaits!
                     `}</p>
                    <div classname="buttondiv">
                    <button type="button" className="pokedexButton  btn btn-primary btn-lg"><Link className="btn-primary-link" to={"/pokedex"}>Pokédex</Link></button>
                    </div>
                    <Sound 
                        url={home_opening}
                        playStatus={Sound.status.PLAYING}
                        playFromPosition={300}
                        loop={true}
                    />
                </Container>
            </div>
    )
};

export default Home;