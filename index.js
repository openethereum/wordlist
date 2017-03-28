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

const dictionary = require('./res/wordlist.json')

function randomBytes (length) {
  const buf = Buffer.alloc(length)

  for (let i = 0; i < length; i++) {
    buf[i] = Math.random() * 255
  }

  return buf
}

function randomNumber (max) {
  // Use 24 bits to avoid the integer becoming signed via bitshifts
  const rand = randomBytes(3)

  const integer = (rand[0] << 16) | (rand[1] << 8) | rand[2]

  // floor to integer value via bitor 0
  return ((integer / 0xFFFFFF) * max) | 0
}

function randomWord () {
  // TODO mh: use better entropy
  const index = randomNumber(dictionary.length)

  return dictionary[index]
}

function randomPhrase (length) {
  const words = []

  while (length--) {
    words.push(randomWord())
  }

  return words.join(' ')
}

module.exports = {
  randomBytes,
  randomNumber,
  randomWord,
  randomPhrase
}
