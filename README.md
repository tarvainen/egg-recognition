# What is this?

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a egg recognition tool for find out count of eggs in hen house.

## Requirements

* Docker

### Usage

```
docker build -t egg-recognition .
docker run --rm -v $(pwd):/app egg-recognition [path to the image]

# will print something like

[ { type: 'chicken', looksLike: 'person', sure: true },
  { type: 'egg', looksLike: 'frisbee', sure: true },
  { type: 'egg', looksLike: 'sports ball', sure: true },
  { type: 'egg', looksLike: 'sports ball', sure: true } ]
```

# License

MIT
