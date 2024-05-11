import './style.css'
import guiso from './soup.svg'
import './style.css'
import Airtable from 'airtable';

const API_KEY = 'patXrLVWA9XmNqgb6.ebf4e3d5b6b47be4e39e6d023d6f057e7c706d8ee6555dada1b517ed335261e1';

var base = new Airtable({apiKey: API_KEY}).base('app8Xvp783RotQ9EO');



const app = document.getElementById('app')
const img = ()=>{return document.createElement('img')}
const h1 = ()=>{return document.createElement('h1')}
const div = ()=>{return document.createElement('div')}


const loadCcontainer = div()
loadCcontainer.id='loader-container'
app.appendChild(loadCcontainer)


const mLoad = div()
mLoad.id='loader';
loadCcontainer.appendChild(mLoad);

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loader-container").style.display = "flex"
  setTimeout(function () {
      document.getElementById("loader-container").style.display = "none"
  }, 2000);
});



const logo = img()
logo.src='./soup.svg'
logo.className='logo'
logo.alt='logo guisos'

const title = h1()
title.textContent='Menú de guisados'

const guisosContainer = div()
guisosContainer.className='card-container'


app.appendChild(logo)
app.appendChild(title)
app.appendChild(guisosContainer)



base('guisados').select({
    maxRecords: 10,
    view: "vista"
  }).eachPage(function page(records, fetchNextPage) {
  
    records.forEach((record,i) =>{
        const card = div()
        card.innerHTML=`
        <div class="card">
            <img src="${record.get('imagen')}" alt="Imagen ${record.get('guiso')}" loading="lazy">
            <h2>${record.get('guiso')}</h2>
            <p>${record.get('descripcion')}</p>
        </div>
        `


      guisosContainer.appendChild(card)
      });
  
    fetchNextPage();
  }, function done(err) {
    if (err) { console.error(err); return; }
  });


