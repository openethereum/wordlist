#!/bin/bash
set -x
set -e
cat wordlist.txt \
  | awk ' BEGIN { ORS = ""; print "["; } { printf "%s\""$0"\"", separator; separator=","; } END { print "]"; }' \
  > wordlist.json

