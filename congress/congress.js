import { senators } from '../congress/senators.js'
import { representatives } from '../congress/representatives.js'

const container = document.querySelector('.container')

const filterSenators = (prop, value => {
    return senators.filter(senator => senator[prop] === value)
})