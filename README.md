# Wordlist
Parity Brain Wallets wordlist library


# RUST

```toml
# Cargo.toml

[dependencies]
parity-wordlist = "1.1"
```

```rust
# main.rs

extern crate parity_wordlist;

fn main() {
  println!("Words: {}", parity_wordlist::random_phrase(12))
}
```


# JavaScript


```bash
$ npm i @parity/wordlist --save
```


```js
// main.js

import { randomPhrase } from '@parity/wordlist'

console.log(randomPhrase(12))
```

