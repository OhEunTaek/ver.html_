var mapContainer = document.getElementById('map');

const t_on = document.querySelectorAll(".traffic li")[0];
const t_off = document.querySelectorAll(".traffic li")[1];

const branch_btns = document.querySelectorAll(".branch li");

let drag = true;
let zoom = true;

var mapOption = {
    center: new kakao.maps.LatLng(37.3591784, 127.1048319),
    level: 3
};

var map = new kakao.maps.Map(mapContainer, mapOption);

var markerOptions = [
    {
        title: "본점",
        latlng: new kakao.maps.LatLng(37.3591784, 127.1048319),
        imgSrc: 'img/marker1.png',
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: { offset: new kakao.maps.Point(116, 99) },
        button: branch_btns[0]
    },
    {
        title: "지점1",
        latlng: new kakao.maps.LatLng(37.513131, 127.0582827),
        imgSrc: 'img/marker2.png',
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: { offset: new kakao.maps.Point(116, 99) },
        button: branch_btns[1]
    },
    {
        title: "지점2",
        latlng: new kakao.maps.LatLng(37.5462056, 127.0494578),
        imgSrc: 'img/marker3.png',
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: { offset: new kakao.maps.Point(116, 99) },
        button: branch_btns[2]
    }
];
for (let i = 0; i < markerOptions.length; i++) {
    new kakao.maps.Marker({
        map: map,
        position: markerOptions[i].latlng,
        title: markerOptions[i].title,
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });

    //branch버튼을 클릭했을 때 해당 위치로 이동하고 또 버튼을 활성화하기
    markerOptions[i].button.onclick = (e) => {
        e.preventDefault();
        for (let k = 0; k < markerOptions.length; k++) {
            markerOptions[k].button.classList.remove("on");
        }
        markerOptions[i].button.classList.add("on");

        moveTo(markerOptions[i].latlng);
    }
}

//브라우저 리사이즈시 현재 활성화되어있는 버튼을 찾아서 setCenter의 매개변수-위치값에 적용한다.
window.onresize = () => {
    let active_btn = document.querySelector(".branch li.on");
    let active_index = active_btn.getAttribute("data-index");

    map.setCenter(markerOptions[active_index].latlng);
}

//교통정보 보기/끄기 버튼 클릭 이벤트
t_on.addEventListener("click", (e) => {
    e.preventDefault();
    // 1. 프리벤트디폴트
    if (t_on.classList.contains("on")) return;
    // 2.현재 on이 있다면 리턴으로 중지
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); //지도에 교통정보 표시하는 카카오맵 매서드
    t_on.classList.add("on");
    // 3.티온에 클래스on을 붙여야함
    t_off.classList.remove("on");
    // 4.티오프에는 리무브 온을
})

t_off.addEventListener("click", (e) => {
    e.preventDefault();
    if (t_off.classList.contains("on")) return;
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_off.classList.add("on");
    t_on.classList.remove("on");
})

var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


//지도 드래그 이동 끄기,켜기
setDraggable(drag);
function setDraggable(draggable) {
    map.setDraggable(draggable);
    //마우스 드래그로 지도 이동 가능여부를 설정하는것.  
}
//지도 확대/축소 켜기/끄기
setZoomable(zoom);
function setZoomable(zoomable) {
    map.setZoomable(zoomable);
    //마우스 휠로 지도를 확대, 축소 가능여부를 설정하는것.
}

//지도 이동 함수정의
function moveTo(target) {
    var moveLatLon = target;
    map.setCenter(moveLatLon);
}