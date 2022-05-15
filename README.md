# README
`soundcloud-dl` can can be used as a standalone CLI or it can be used a dependency module in your NodeJS project to download songs from https://soundcloud.com.
For demo visit https://instautils.com

## CLI Usage
```bash
# TODO: Will write the instructions after publishing the NPM package.
```

## Module USAGE
You must have a env variable `SC_CLIENT_ID`. Also see the examples folder in repo.
```js
const getSoundCloudTrackLink = require('@hack0x90/soundcloud-dl');

async function getLink () {
  const link = await getSoundCloudTrackLink({
    scTrackUrl: 'https://soundcloud.com/rashidaliofficial/bhangra-loco',
    scClientId: process.env.SC_CLIENT_ID
  });
  console.log('------------ Link ------------');
  console.log(link);
}

getLink();
```

## TODO Items
- [ ] Check for external dependencies before running the module
- [ ] Proxy input
- [ ] Playlist download
- [ ] Download by artist
- [ ] Download by hashtag
- [ ] Create Mashup/Mix with download option
- [ ] Read playlist links from file
- [ ] Work with pool of SoundCloud client ids
