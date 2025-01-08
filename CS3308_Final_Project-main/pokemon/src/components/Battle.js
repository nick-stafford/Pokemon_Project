import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPokemon, fetchOpponentBag } from '../actions';
import pokeapi from '../apis/pokeapi';
import BattleCard from './BattleCard';
import { Container, Modal, Button } from 'react-bootstrap';

import "./battle.css"

class Battle extends Component {
    state = {
        // user state
        activePokemonIndex: 0,
        userHealth: [80, 100, 100],
        userMaxHealth: [80, 100, 100],

        // opponent state
        activeOpponentPokemonIndex: 0,
        opponentHealth: [100, 100, 100, 100],
        opponentMaxHealth: [100, 100, 100, 100],

        isModalOpen: false,
        modalTitle: "Modal Title",
        modalText: "This is modal text",

        opponentCanAttack: true,
        isGameOver: false,
    }

    componentDidMount() {
        let opponentBagSize = 1
        const min = Math.ceil(this.props.bag.length - 1);
        let max = Math.floor(this.props.bag.length + 2);

        if (this.props.bag.length > 1) {
            if (this.props.bag.length > 5) {
                max = 1
            }
            
            opponentBagSize = Math.floor(Math.random() * (max - min) + min);
        }

        const opponentBagArray = []

        for (let i = 0; i < opponentBagSize; i++) {
            opponentBagArray[i] = Math.floor(Math.random() * (152 - 1) + 1);
        }
        
        this.props.fetchOpponentBag(opponentBagArray)
    }

    render() {
        const { bag, opponentBag } = this.props;
        const {
            activePokemonIndex,
            userHealth,
            userMaxHealth,
            activeOpponentPokemonIndex,
            opponentHealth,
            opponentMaxHealth,
            isModalOpen,
            modalTitle,
            modalText,
            isGameOver,
            opponentCanAttack,
        } = this.state;
        const pokemon = bag[activePokemonIndex];
        const opponentPokemon = opponentBag[this.state.activeOpponentPokemonIndex];
        
        const getData = async (url) => {
            const res = await pokeapi.get(url);
            return await res.data;
         }

        //Attack button script
        const userAttack = (move) => {
            const userMove  = move.name

            this.setState({ 
                opponentCanAttack: true
            })

            getData(move.url)
                .then(data => {
                    let newOpponentHealthArray = opponentHealth
                    newOpponentHealthArray[activeOpponentPokemonIndex] = newOpponentHealthArray[activeOpponentPokemonIndex] - data.power
                    this.setState({
                        opponentHealth: newOpponentHealthArray,
                        isModalOpen: true,
                        modalTitle: "User Attack",
                        modalText: `You used ${userMove} and did ${data.power} damage`,
                    })

                    if (opponentHealth[activeOpponentPokemonIndex] <= 0) {
                        const nextIndex = activeOpponentPokemonIndex + 1;
                        this.setState({ 
                            activeOpponentPokemonIndex: nextIndex,
                            opponentCanAttack: false
                        })
                        if (activeOpponentPokemonIndex >= opponentBag.length - 1) {
                            this.setState({ 
                                activeOpponentPokemonIndex: 0,
                                isModalOpen: true,
                                modalTitle: "Congrats",
                                modalText: "Your opponent has no pokemon left. You Win!",
                                isGameOver: true,
                            })
                        }
                    }
                })
                .catch(err => console.log(err));
        }

        const opponentAttack = () => {
            const moveIndex = Math.floor(Math.random() * opponentPokemon.moves.length)
            const attackMove = opponentPokemon.moves[moveIndex].move
            const userMove  = attackMove.name

            getData(attackMove.url)
                .then(data => {
                if (opponentCanAttack) {
                    let newHealthArray = userHealth
                    newHealthArray[activePokemonIndex] = newHealthArray[activePokemonIndex] - data.power
                    this.setState({
                        userHealth: newHealthArray,
                        isModalOpen: true,
                        modalTitle: "Opponent Attack",
                        modalText: `Your opponent used ${userMove} and did ${data.power} damage`,
                        opponentCanAttack: false,
                    })
                    
                    if (userHealth[activePokemonIndex] <= 0) {
                        this.setState({ 
                            activePokemonIndex: activePokemonIndex + 1,
                        })
                        if (activePokemonIndex >= bag.length - 1) {
                            this.setState({ 
                                activePokemonIndex: 0,
                                isModalOpen: true,
                                modalTitle: "Sorry",
                                modalText: "You have no pokemon left. You Lose!",
                                isGameOver: true,
                            })
                        }
                    }
                } else {
                    this.setState({ 
                        isModalOpen: false,
                    })
                }
            })
            .catch(err => console.log(err));
        }

        return pokemon && opponentPokemon ? (
            <div className="battle">
                <Container>
                    <div classname="buttondiv">
                    <button type="button" className="backButton  btn btn-primary btn-lg"><Link className="btn-primary-link" to={"/pokedex"}>BACK</Link></button>
                    </div>
                    <BattleCard pokemon={opponentPokemon} currentHealth={opponentHealth[activeOpponentPokemonIndex]} totalHealth={opponentMaxHealth[activeOpponentPokemonIndex]} />
                    <BattleCard pokemon={pokemon} currentHealth={userHealth[activePokemonIndex]} totalHealth={userMaxHealth[activePokemonIndex]} attack={userAttack} reverse />
                    
                    {isModalOpen && <div className="modal-wrapper">
                        <Modal.Dialog className="modal-dialog">
                            <Modal.Body className="modal-body">
                                <Modal.Title className="modal-title">{modalTitle}</Modal.Title>
                                <p style={{alignSelf: "center"}}>{modalText}</p>
                                {!isGameOver ?
                                    <Button onClick={() => opponentAttack()} variant="primary">Continue</Button> 
                                    : <button type="button" className="btn btn-outline-primary"><Link to={"/pokedex"}>Continue</Link></button>
                                }
                            </Modal.Body>
                        </Modal.Dialog>
                    </div>}
                </Container>
            </div>
        ) : null;
    }
}

const mapStateToProps = (state) => {
    return { 
        pokemons: state.pokemons,
        bag: state.bag,
        opponentBag: state.opponentBag,
    };
};

export default connect(
    mapStateToProps, 
    { fetchPokemon, fetchOpponentBag }
)(Battle);
