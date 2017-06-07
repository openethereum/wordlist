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

function isDefined (str) {
  return str !== 'undefined'
}

// Adapted from https://github.com/tonyg/js-scrypt
// js-scrypt is written by Tony Garnock-Jones tonygarnockjones@gmail.com and is licensed under the 2-clause BSD license:
function secureRandomBytes (count) {
  if (!isDefined(typeof Uint8Array)) {
    return null
  }

  const bs = new Uint8Array(count)
  const self = isDefined(typeof window) ? window : isDefined(typeof global) ? global : this

  if (isDefined(typeof self.crypto)) {
    if (isDefined(typeof self.crypto.getRandomValues)) {
      self.crypto.getRandomValues(bs)
      return bs
    }
  }

  if (isDefined(typeof self.msCrypto)) {
    if (isDefined(typeof self.msCrypto.getRandomValues)) {
      self.msCrypto.getRandomValues(bs)
      return bs
    }
  }

  return null
}

function randomBytes (length) {
  const random = secureRandomBytes(length)
  if (random) {
    return random
  }

  // Fallback if secure randomness is not available
  const buf = isDefined(typeof Buffer) ? Buffer.alloc(length) : Array(length)

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

let dictionaryLookup = null

function verifyPhrase (phrase, expectedLength) {
  if (!dictionaryLookup) {
    dictionaryLookup = {}
    dictionary.forEach(word => {
      dictionaryLookup[word] = true
    })
  }

  const words = phrase.split(/\s+/)

  const wrongWord = words.find(word => !dictionaryLookup[word])
  if (wrongWord) {
    throw new Error(`Word is not in the dictionary: ${wrongWord}.`)
  }

  if (words.length < expectedLength) {
    throw new Error(`Phrase is too short: ${words.length}.`)
  }

  return true
}

module.exports = {
  randomBytes,
  randomNumber,
  randomWord,
  randomPhrase,
  verifyPhrase
}
