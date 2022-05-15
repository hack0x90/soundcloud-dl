# README
`soundcloud-dl` can can be used as a standalone CLI or it can be used a dependency module in your NodeJS project to download songs from https://soundcloud.com.
For demo visit https://instautils.com

## CLI Usage
```bash
# Install soundcloud-dl globally
npm install -g @hack0x90/soundcloud-dl
# Create SC_CLIENT_ID env variable
export SC_CLIENT_ID='your-sound-cloud-id'
# Save song .mp3 in current directory
npx soundcloud-dl https://soundcloud.com/rashidaliofficial/bhangra-loco ./
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

Above code will return an object as below.
```js
{
  "url": "https://cf-hls-media.sndcdn.com/playlist/vyPUILS7Qm3Q.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L3Z5UFVJTFM3UW0zUS4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjUyNjAyNDgxfX19XX0_&Signature=LiP3OlfhuX9oeH0CxEROcEli34MaciklzSy2Gk4cvmSAeFLlPMMevh-dmOyaR1LiYODohIko4IovckBx1uf8sXz-n3xeIYxH7xSKBAathG8NnaKVlASM-jX5hfGAmBqfM1P5uu9IcXreN9L~jANdU~4yIkprfqSrnh9TSmUHZO7nyW7D~uFVWubt9T-RR4hB0nSyxYMcic0KLojEjvfTqbsm353nVSB75zEPACOeWnLaF7HgFLe6BxsITNILOUDKNfpq4SVTOPQue1JQ85DMHmTbU-sa5mvJCFgU7LWTupm8noq0FyR1M7ktAyyRw8nc~xzUo5XBCKnxuS8AdD3ssA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJQSyIsInN1YiI6IiIsInJpZCI6IjU4ZTRiMDAyLTM2ZDAtNGU3Ny05NGNmLWVjOTBlMWFkOTNiYiIsImlhdCI6MTY1MjYwMjIwMn0.8JY_W5fK_ZDbUsNXvGOh_e0T40KfSYnJPvLqMM1MnXs"
}
```

## Saving Song .mp3 File
You can use the `url` from the result above to download song mp3 file from SoundCloud.
```bash
# Command to save mp3 file, using above url
ffmpeg -i <soundcloud_url> <filename.mp3>

# Example
ffmpeg -i https://cf-hls-media.sndcdn.com/playlist/vyPUILS7Qm3Q.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L3Z5UFVJTFM3UW0zUS4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjUyNjAyNDgxfX19XX0_&Signature=LiP3OlfhuX9oeH0CxEROcEli34MaciklzSy2Gk4cvmSAeFLlPMMevh-dmOyaR1LiYODohIko4IovckBx1uf8sXz-n3xeIYxH7xSKBAathG8NnaKVlASM-jX5hfGAmBqfM1P5uu9IcXreN9L~jANdU~4yIkprfqSrnh9TSmUHZO7nyW7D~uFVWubt9T-RR4hB0nSyxYMcic0KLojEjvfTqbsm353nVSB75zEPACOeWnLaF7HgFLe6BxsITNILOUDKNfpq4SVTOPQue1JQ85DMHmTbU-sa5mvJCFgU7LWTupm8noq0FyR1M7ktAyyRw8nc~xzUo5XBCKnxuS8AdD3ssA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJQSyIsInN1YiI6IiIsInJpZCI6IjU4ZTRiMDAyLTM2ZDAtNGU3Ny05NGNmLWVjOTBlMWFkOTNiYiIsImlhdCI6MTY1MjYwMjIwMn0.8JY_W5fK_ZDbUsNXvGOh_e0T40KfSYnJPvLqMM1MnXs track.mp3
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
