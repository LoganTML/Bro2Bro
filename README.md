# Bro2Bro

A web application for connecting with your peers by saying bro repeatedly.  Inspired by an app of the same name seen in [this clip](https://youtu.be/OVoFzu-vH4o) from the show Silicon Valley.

The front end was constructed with basic HTML/CSS and JavaScript, and the back end was built using Node.js, and is currently locally hosted on my laptop.

I plan on finishing this app in the next few weeks by adding a few more key features, including creating different rooms as users join.  I then plan on hosting the server on either Microsoft Azure or Google Cloud.

I also plan on adding several hidden "bro"s that are slightly more difficult to access, and potentially even a text feature, which is why there are unused "message" variables in script.js.

After the basic features are complete, I plan on adding some less functional and more cosmetic upgrades.  I plan on adding a second parameter to the printBro function to determine whether the message came from the current user or another one, and use a div element with a different id (and therefore different horizontal alignment and background properties) for each one.  In script.js, I also plan on combining the majority of the three main addEventListener functions (one for each button) into a function, to cut down on the file size and complexity.

The structure of this file was inspired by a [YouTube Video](https://www.youtube.com/watch?v=rxzOqP9YwmM) and its companion [repository](https://github.com/WebDevSimplified/Realtime-Simple-Chat-App) from the channel WebDevSimplified.