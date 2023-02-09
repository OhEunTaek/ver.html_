/*
AIzaSyD62N3ObfAdS9fO3LIOtg5NYyfqE7sWmq4

url : 'https://www.googleapis.com/youtube/v3/playlistItems'

*/

const vidList = document.querySelector(".vidList");
const key = "AIzaSyD62N3ObfAdS9fO3LIOtg5NYyfqE7sWmq4";
const playlistId = "PLYOPkdUKSFgWPLsAWpqRpK0cCiAGdxi-Y";
const num = 5;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url)
.then(data=>{
    return data.json();
})
.then(json=>{
    let items = json.items;
    console.log(items);
    let result = '';

    items.map(item=>{

        let title = item.snippet.title;
        //타이틀에서 특정갯수만큼 문자열을 잘라서 나머지 위에는 ". . ."을 붙여준다. 30글자.
        //문자열.substr(start, length) 특정문자에서 특정시작부분부터 특정갯수만큼 문자열을 자름. 
        if(title.length > 30){
            title = title.substr(0, 30)+"...";
        }
        let con = item.snippet.description;
        if(con.length > 50){
            con = con.substr(0,50)+"...";
        }
        let date = item.snippet.publishedAt;
        //date = date.substr(0,10);
        //문자열.split("구분점") 구분점을 기준으로 문자열을 분리해서 배열로 변환해준다.
        date = date.split("T")[0];


        result += `<article>
            <a href="${item.snippet.resourceId.videoId}" class="pic">
                <img src="${item.snippet.thumbnails.medium.url}">
            </a>
            <div class="con">
                <h2>${title}</h2>
                <p>${con}</p>
                <span>${date}</span>
            </div>
        </article>`;
    })
    vidList.innerHTML = result;
})

vidList.addEventListener("click",(e)=>{
    e.preventDefault();

    //클릭한 요소의 부모태그가 a요소가 아니라면 멈춤, 중지
    if(!e.target.closest("a")) return;

    const vidId = e.target.closest("a").getAttribute("href");

    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML =`
            <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%"></iframe>
            <span class="btnClose">CLOSE</span>
    
    `;

    vidList.append(pop);
});

vidList.addEventListener("click",(e)=>{
    const pop = vidList.querySelector(".pop");
    if(pop){
        const close = pop.querySelector("span");
        if(e.target == close) pop.remove();
    }
})