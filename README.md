# Yugraj.Wiz

A Harry Potter inspired portfolio built with React, Vite, and `react-router-dom`.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Add your background video to `public/hogwarts.mp4`.

Optional fallback poster:

```text
public/hogwarts-poster.jpg
```

3. Start the dev server:

```bash
npm run dev
```

## Video guidance

- Format: H.264 MP4
- Recommended size: `1280x720` or `1920x1080`
- Target filesize: under `20 MB` when possible

Compress a source video with:

```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -vf scale=1280:720 -an public/hogwarts.mp4
```

## Main features

- Full-screen Hogwarts video background with layered overlays
- Elder wand cursor with glow, spark trail, and ember particles
- Floating candles and drifting magical dust
- Particle network canvas reacting to pointer movement
- Four routed sections: home, about, projects, and contact
- Responsive layout with reduced-motion support
