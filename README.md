# What is this?

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a egg recognition tool for find out count of eggs in hen house.

## Requirements

* Docker

### Usage

Running the container will start the server to http://localhost:8080

```
docker build -t egg-recognition .
docker run --rm -v $(pwd):/app -p 8080:8080 egg-recognition
```

To send the image to be processed, use for example command below

```
curl --request POST \
     --url http://localhost:8080/rest/analyze \
     --form file=@$(pwd)/img/eggs1.jpg
```

API documentation is available at http://localhost:8080/api/doc

You can test it in practise by navigating to http://localhost:8080. Upload your own image and click "Analyze". Soon there should be some eggs detected.

# License

MIT
