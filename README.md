# Wordlist
Parity Brain Wallets wordlist library


[Rust Documentation](https://docs.rs/parity-wordlist/)


# RUST

```toml
# Cargo.toml

[dependencies]
parity-wordlist = "1.3"
```

```rust
// main.rs

println!("/Words: {}", parity_wordlist::random_phrase(12));

let phrase = "violin oblivion cylinder list disarray wobbly fastball showplace oasis patronize septic spearhead";
println!("Valid: {:?}", parity_wordlist::validate_phrase(phrase, 12));
```


# JavaScript


```bash
$ npm i @parity/wordlist --save
```


```js
// main.js

import { randomPhrase, verifyPhrase } from '@parity/wordlist'

console.log(randomPhrase(12))

// This will throw if the phrase is not valid:
verifyPhrase("violin oblivion cylinder list disarray wobbly fastball showplace oasis patronize septic spearhead", 12)
```
