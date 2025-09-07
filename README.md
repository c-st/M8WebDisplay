# M8 Headless Web Display

This is alternative frontend for [M8 Headless](https://github.com/DirtyWave/M8HeadlessFirmware).

It runs entirely in the browser and only needs to be hosted on a server to satisfy browser security policies. No network communication is involved.

Try it out at https://derkyjadex.github.io/M8WebDisplay/.

Features:

- Render the M8 display
- Route M8's audio out to the default audio output
- Keyboard and gamepad input
- Custom key/button mapping
- Touch-compatible on-screen keys
- Firmware loader
- Full offline support
- Installable as a [PWA](https://en.wikipedia.org/wiki/Progressive_web_application)

## Supported Platforms

The following should generally work, details are below.

- Chrome 89+ on macOS, Windows and Linux<sup>1</sup>
- Edge 89+ on macOS and Windows
- Chrome on Android<sup>2</sup>, without audio<sup>3</sup>

The web display uses the Web Serial API to communicate with the M8. This API is currently only supported by desktop versions of Google Chrome and Microsoft Edge in versions 89 or later. For Chrome on Android the code can fallback to using the WebUSB API.

1. On Ubuntu and Debian systems (and perhaps others) users do not have permission to access the M8's serial port by default. You will need to add yourself to the `dialout` group and restart your login session/reboot. After this you should be able to connect normally.
2. Newer Samsung phones appear to handle USB serial in a way that prevents Chrome from being able to open the device. There is an [outstanding Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1099521#c21) to fix this.
3. The way that that Android handles USB audio devices (such as the M8) prevents us from being able to redirect the audio to the phone's speakers or headphone output. When the M8 is attached, Android appears to completely disable the internal audio interface and uses the M8 for all audio input and output instead. So the page is able to receive the audio from the M8 but it does not have anywhere to redirect it to other than the M8 itself.

## Developing

To build this project you need a recent version of [Node.js](https://nodejs.org/) (18+ recommended). You should be able to build on macOS, Linux and [WSL](https://docs.microsoft.com/en-us/windows/wsl/) on Windows.

From a fresh clone, install dependencies and build assets:

```bash
npm install
npm run build:assets
```

Then start the development server:

```bash
npm run dev
```

This will launch a local development server at http://localhost:8000/ with hot module reloading. The page will automatically refresh when you edit JavaScript files. For SCSS files, you may need to refresh manually.

Available scripts:
- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run build:assets` - Build shader and font assets (run this after cloning)

Chrome requires that pages are served securely in order to enable features such as the Serial API. The development server runs on `localhost` which has a security exception, so you can test locally without HTTPS.

To build a production version:

```bash
npm run build
```

This will create optimized files in the `dist/` directory that can be hosted on any static web server with an HTTPS address.

## TODO/Ideas

- Avoid/automatically recover from bad frames
- Auto-reboot for firmware loader/real M8 support
- Selectable audio output device

## Licence

This code is released under the MIT licence.

See LICENSE for more details.
