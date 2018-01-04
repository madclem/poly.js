## Fido.js, Goodboy's rich media framework ##

Notes from update on the template, September 15th 2015

This repo contains the latest version of fido, the one we'll use for everything from now on, but because the decision to use it as a module was only made recently and for the purposes of the Star Wars games, some things have changed along the way, so here's a quick recap:

- The shop currently in this repo **does not** work, it needs to be replaced by the one in Rebels or in the cooking game (cooking had the best shop as far as I'm aware).
<br/>
*Be careful, if we change the shop here the arcade will break, I think it would be wise to create and tag a specific version of fido to be used in the Star Wars projects.*

- The traditional ```Button``` class has been renamed to ```AsbtractButton``` and is backwards-compatible, only the name needs to be changed.

- There is a ```PixiScrollbar``` and a ```PixiScrollbar_``` ?
- Historically (for as long as I, Alvin, remember) the ```/game/``` folder used to contain the minimalistic World/GameObject framework but there are files from the running games that might need to be deleted/moved elsewhere.
<br/>
As a temporary fix I renamed the minimalistic ```World``` to ```DefaultWorld``` so the fido template can still work.

- The game framework is located in the ```bob/``` folder.

### Feel free to add you own notes! ###

:heart: :fr:
