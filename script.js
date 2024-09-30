const API_key='a70f9861fde14b69b2fdb469003757e2';
const URL="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=> fetchNews("India"))

async function fetchNews(query){
  const res =await  fetch(`${URL}${query}&apikey=${API_key}`);
  const data=await res.json();
  console.log(data);
  bindData(data.articles);

}

function bindData(articles){
    const cardscontainer=document.getElementById('cards-container')
    const newscardtemplate=document.getElementById('template-news-card');

    cardscontainer.innerHTML='';
    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardclone=newscardtemplate.content.cloneNode(true);
        fillData(cardclone,article);
        cardscontainer.appendChild(cardclone)
    })
}

function fillData(cardclone,article){
    const newsImage=cardclone.querySelector('#news-img')
    const newstitle=cardclone.querySelector('#news-title')
    const newssource=cardclone.querySelector('#news-source')
    const newsdesc=cardclone.querySelector('#news-desc')

    newsImage.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newssource.innerHTML=`${article.source.name} ▫ ${date}`;
    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"blank")
    })



}


let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const NavItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=NavItem;
    curSelectedNav.classList.add('active');

}

const searchbutton=document.getElementById('search-button');
const searchtext=document.getElementById('search-text');
searchbutton.addEventListener('click',()=>{
    const query=searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav =null;


});