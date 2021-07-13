
function setup(params) {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(320, 240);
  let lat, long;
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
      const comment = document.getElementById('comment').value;
      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      const data = { lat, long, comment, image64 };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      };
      const response = await fetch('/api', options);
      const json = await response.json();
      console.log(json);
    }),

  document.getElementById('geo').addEventListener('click', event => {
    if ('geolocation' in navigator) {
      console.log('geolocation is available');
      navigator.geolocation.getCurrentPosition(async position => {
        lat = position.coords.latitude
        document.getElementById('latitude').textContent = lat;
        long = position.coords.longitude
        document.getElementById('longitude').textContent = long;
        const mymap = L.map('mymap').setView([lat, long], 15);
        const attribution =
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(mymap);
        const marker = L.marker([lat, long]).addTo(mymap);
      });
    } else {
      console.log('geolocation is not available');          /* geolocation IS NOT available */
    }
  });
}
