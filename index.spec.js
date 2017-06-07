// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

/* global describe,it */

const dictionary = require('./res/wordlist.json')
const { expect } = require('chai')
const {
  randomNumber,
  randomWord,
  randomPhrase,
  verifyPhrase
} = require('./')

describe('wordlist', () => {
  describe('randomNumber', () => {
    it('generates numbers in range', () => {
      for (let i = 0; i < 100; i++) {
        const number = randomNumber(7777)

        expect(number).to.be.at.least(0)
        expect(number).to.be.below(7777)
        expect(number % 1).to.be.equal(0)
      }
    })
  })

  describe('randomWord', () => {
    it('generates a random word from the dictionary', () => {
      const word = randomWord()

      expect(dictionary.includes(word)).to.be.equal(true)
    })
  })

  describe('randomPhrase', () => {
    it('generates a random phrase from the dictionary', () => {
      const phrase = randomPhrase(7).split(' ')

      expect(phrase.length).to.be.equal(7)

      phrase.forEach((word) => {
        expect(dictionary.includes(word)).to.be.equal(true)
      })
    })
  })

  describe('verifyPhrase', () => {
    it('verifies too short phrase', () => {
      const phrase = randomPhrase(7)

      expect(verifyPhrase(phrase, 7)).to.be.equal(true)
      expect(() => verifyPhrase(phrase, 12)).to.throw(Error, 'too short')
      expect(() => verifyPhrase('xxx', 0)).to.throw(Error, 'not in the dictionary')
    })
  })
})
