import React, { useState, useEffect, Fragment } from 'react'
import { Input } from '@material-ui/core'
import SearchDropdown, {SearchDropdownNoResult} from './SearchDropdown'

import './styles/Search.css'

export default function Search() {
const [data, setData] = useState(null)
const [dataIsReady, setDataIsReady] = useState(false)
const [dropdownIsopened, setDropdownIsopened] = useState(false)
const [keyword, setKeyword] = useState('')

useEffect(() => {
    async function getRawgApi() {
      if (keyword !== '') {
        try {
          const response = await fetch(`http://localhost:4000/videogameAutocomplete?q=${keyword.toLowerCase()}`)
          const json = await response.json()
          setData(json)
          setDataIsReady(true)
        } catch (e) {
          console.error(e)
        }
      }
      else{
        setDropdownIsopened(false)
    }
    }
    getRawgApi()
  }, [keyword])

  const setKeywordInInput = event => {
    setKeyword(event.target.value)
    setDropdownIsopened(true)
  }

  const closeDropdown = () => {
    setDropdownIsopened(false)
    setKeyword('')
  }

    return (
        <>
            <div className="search" style={ {zIndex: 1}}>
                <Input onChange={setKeywordInInput} value={keyword} placeholder={"Chicken"}/>
                {dataIsReady ? (
                <Fragment>
                    {dropdownIsopened ? (
                    <div className='bg-white position-absolute dropdown-position'>
                        <ul className='list-unstyled mb-0'>
                        {data.count >= 1 ? (
                            // only first eight search results displayed in the dropdown
                            data.results.slice(0, 8).map(result => <SearchDropdown key={result.id} result={result} />)
                        ) : (
                            <SearchDropdownNoResult />
                        )}
                        </ul>
                        <div id='dropdownOverlay' onClick={closeDropdown} className='overlay-style'></div>
                    </div>
                    ) : null}
                </Fragment>
                ) : null}
            </div>
        </>
    )
}