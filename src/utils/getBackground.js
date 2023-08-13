export function getBackground(weather) {
  console.log(weather)
  const isDay = new Date().getHours() > 5 && new Date().getHours() < 20 ? true : false
  switch (weather) {
    case 'дождь':
      return 'https://cdn.coverr.co/videos/coverr-rain-falling-on-windshield-6625/1080p.mp4';
    case 'ясно':
      return isDay ? 'https://cdn.coverr.co/videos/coverr-listening-to-music-on-the-beach-9626/1080p.mp4' : 'https://www.shutterstock.com/shutterstock/videos/1099447465/preview/stock-footage-starry-night-sky-starry-night-dark-blue-background-with-starlight-sparkles-twinkling-and-blinking.webm'
    case 'облачно с прояснениями':
    case 'переменная облачность':
    case 'облачно':
      return isDay ? 'https://cdn.coverr.co/videos/coverr-cloudy-sky-2765/1080p.mp4' : 'https://cdn.coverr.co/videos/coverr-woman-in-front-of-the-clouds-5888/1080p.mp4'
    case 'гроза':
    case 'шторм':
      return 'https://www.shutterstock.com/shutterstock/videos/1020783523/preview/stock-footage-aerial-lightning-rainy-clouds-time-lapse-nature-dark-evening-day-beautiful-thunderstorm-rolling.webm'
    case 'пасмурно':
      return !isDay ? 'https://v4.cdnpk.net/videvo_files/video/free/video0485/large_watermarked/_import_61a858c3c1c7c8.21548672_FPpreview.mp4' : 'https://v4.cdnpk.net/videvo_files/video/free/video0484/large_watermarked/_import_61a46723560452.94269982_FPpreview.mp4'
    default:
      return ''
  }
}
