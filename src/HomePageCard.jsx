import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import './styles/homepagecard.css'
import './checkbox.css'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
})

export default function HomePageCard() {
    const classes = useStyles()

    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const [games, setGames] = useState([])
    // Set up the checkboxes for filtering games
    const [genres, setGenres] = React.useState({
        Action: false,
        Strategy: false,
        RPG: false,
        Shooter: false,
        Adventure: false,
        Puzzle: false,
        Racing: false,
        Sports: false
    })

    const [platforms, setPlatforms] = React.useState({
        PC: false,
        PlayStation: false,
        Xbox: false,
        Nintendo: false,
    })

    const [previousGenres, setPreviousGenres] = React.useState({})
    const [previousPlatforms, setPreviousPlatforms] = React.useState({})

    //When user toggles a checkbox, update state to reflect the checked boxes
    const handleToggleGenre = ({ target }) => {
        setGenres(s => ({ ...s, [target.name]: !s[target.name] }))
    }

    const handleTogglePlatform = ({ target }) => {
        setPlatforms(s => ({ ...s, [target.name]: !s[target.name] }))
    }

    //Returns an array of game objects that meet the filtered criteria
    function filterGames(gamesArray, platforms, genres) {
        let anyCheckedBoxes = false
        let filteredGames = []

        for (let [key, value] of Object.entries(platforms)) {
            if (value == true)
                anyCheckedBoxes = true
            //use 'key' or 'value'
        }
        for (let [key, value] of Object.entries(genres)) {
            if (value == true)
                anyCheckedBoxes = true
            //use 'key' or 'value'
        }
        //return all games if there are no checked boxes
        if (!anyCheckedBoxes) {
            console.log("No checkboxes ticked!")
            return gamesArray
        }

        //Go through each game from the API
        for (let i = 0; i < games.length; i++) {
            //Go through each platform for the game
            for (let j = 0; j < games[i].parent_platforms.length; j++) {
                //Check if the games platform/s include the checked platform/s
                for (let [key, value] of Object.entries(platforms)) {
                    if (value == true && games[i].parent_platforms[j].platform.name == key) {
                        filteredGames.push(games[i])
                    }
                }
            }
        }
        console.log("Some checkboxes ticked!")
        console.log(`Returning: ${filteredGames}`)
        return filteredGames
    }

    useEffect(() => {
        axios.get('https://react-gaming-backend.herokuapp.com/')
            .then(gamesList => {
                setGames(filterGames(gamesList.data, platforms, genres))
            })
        
    }, [])

    useEffect(() => {
        if (previousGenres != genres) {
            console.log("genre changed")
            setPreviousGenres(genres)
            setGames(filterGames(games, platforms, genres))
        }
        if (previousPlatforms != platforms) {
            console.log("platform changed")
            setPreviousPlatforms(platforms)
            setGames(filterGames(games, platforms, genres))
        }
    })

    return (
        <Card>
            <div className="checkboxContainer">
                {Object.keys(platforms).map(key => (
                    <label className="label">{key}
                        <input
                            type="checkbox"
                            onChange={handleTogglePlatform}
                            key={key}
                            name={key}
                            checked={platforms[key]}
                        />
                    </label>

                ))}
            </div>
            <div className="checkboxContainer">
                {Object.keys(genres).map(key => (
                    <label className="label">{key}
                        <input
                            type="checkbox"
                            onChange={handleToggleGenre}
                            key={key}
                            name={key}
                            checked={genres[key]}
                        />
                    </label>
                ))}
            </div>
            {games.map(game => (
                <CardActionArea key={games.id}>
                    <div>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={game.background_image}
                            title={game.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {game.name}
                            </Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
            ))}
        </Card>
    )
}
