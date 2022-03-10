# Bro2Bro

A web application for connecting with your peers by saying bro repeatedly.  Inspired by an app of the same name seen in [this clip](https://youtu.be/OVoFzu-vH4o) from the show Silicon Valley.

## Intro

The website was visually styled with plain HTML/CSS, and the functionality was implemented with JavaScript, Node.js, Express.js, and Socket.io.  The current build is only hosted on my laptop, but I plan on getting hosting set up by this afternoon (March 8).

Over the next few days I plan on limiting the amount of messages that can be on the screen concurrently, as they currently keep appending to the bottom of the last message until they go beneath the screen.  I also plan on adding more style to index.ejs, to allow for a better experience as users come to the page and join a room.

I also plan on adding several hidden "bro"s that are slightly more difficult to access, and potentially even a text input feature, which is why there are unused "message" variables in script.js.

## Setup
Quickstart with Docker:
```bash
# Build the docker container
docker build . -t logantml/bro2bro

# Run the container (add -d to background it)
docker run -p 3000:3000 logantml/bro2bro

# Get shell within the container
docker exec -it <container id> /bin/bash
```

Attribution:
The basic structure of this file was inspired by two videos from a Youtube Series [1](https://www.youtube.com/watch?v=rxzOqP9YwmM), [2](https://www.youtube.com/watch?v=UymGJnv-WsE), and their companion repositories [1](https://github.com/WebDevSimplified/Realtime-Simple-Chat-App), [2](https://github.com/WebDevSimplified/Realtime-Chat-App-With-Rooms) from the channel WebDevSimplified.