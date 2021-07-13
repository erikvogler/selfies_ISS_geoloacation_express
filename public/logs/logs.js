getData();

// >>>>>>>>>> possible sorting function
const selfies = [];

document.getElementById('time').addEventListener('click', event => {
  sortData((a, b) => b.time - a.time);
});

function sortData(compare) {
  for (let item of selfies) {
    item.elt.remove();
  }
  selfies.sort(compare);
  for (let item of selfies) {
    document.body.append(item.elt);
  }
}

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data);
  for (item of data) {
    const root = document.createElement('p');
    const comment = document.createElement('div')
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');

    comment.textContent = `${item.comment}`;
    geo.textContent = `${item.lat}, ${item.long}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.src = item.image64;

    root.append(comment, geo, date, image);
    selfies.push({elt: root, time: item.timestamp});
    document.body.append(root);
  }
}
