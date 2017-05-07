# FreeCodeCamp API Challenges: URL Shortener Microservice

## User Stories
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. When I visit that shortened URL, it will redirect me to my original link.

## Example creation usage:
`http://thepeted-url-shortener.herokuapp.com/new/http://www.google.com`

## Example creation output:
`{
"original_url": "http://www.google.com",
"short_url": "http://thepeted-url-shortener.herokuapp.com/BkJw_qh1b"
}`

## Usage:
`http://thepeted-url-shortener.herokuapp.com/BkJw_qh1b` will redirect to: `http://www.google.com`









