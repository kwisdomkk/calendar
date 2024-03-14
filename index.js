const header=document.querySelector(".calendar h3");
const dates=document.querySelector(".dates");
const navs=document.querySelectorAll("#prev,#next");

const months=[
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월"
];

let date=new Date();
let month=date.getMonth();
let year=date.getFullYear();

function renderCalendar(){

  let datesHtml="";

  const start=new Date(year,month,1).getDay();//주어진 연도와 월에서 첫째날의 요일
  const endDate=new Date(year,month+1,0).getDate();//다음 달의 0번째날(해당 월의 마지막 날)
  const end=new Date(year,month,endDate).getDay();//해당 월의 마지막 날의 요일
  const endDatePrev=new Date(year,month,0).getDate();//이전 달의 마지막 날

  //이전 달의 마지막 날부터 시작 요일까지 비활성화된 날짜 표시
  for(let i=start; i>0; i--){
    datesHtml+=`<li class="inactive">${endDatePrev -i+1}</li>`
  }
  // 해당 월의 날짜 표시
  for(let i = 1; i <= endDate; i++){
    let className = (
    i === date.getDate() && 
    month === new Date().getMonth() && 
    year === new Date().getFullYear()
    ) ? ' class="today"' : "";
    datesHtml += `<li${className}>${i}</li>`;
}

// 다음 달의 시작 요일부터 마지막 요일까지 비활성화된 날짜 표시
  for(i=end; i<6;i++) {
    datesHtml+=`<li class="inactive">${i-end+1}</li>`;
  }

  dates.innerHTML=datesHtml;
  header.textContent=`${year}년 ${months[month]} `;
}

//이전,다음 버튼 클릭 이벤트 리스너
navs.forEach(nav=>{
  nav.addEventListener("click",e=>{
    const btnId=e.target.id;

    //0=1월 
    if(btnId==="prev"&&month===0){
      year--;
      month=11;
    } else if(btnId==="next"&&month===11){
      year++;
      month=0;
    } else {
      month=btnId==="next"? month+1 :month-1;
    }
    
    // 변경된 연도와 월로 날짜 객체 업데이트
    date=new Date(year,month,new Date().getDate())
    year=date.getFullYear();
    month=date.getMonth();

    renderCalendar(); //켈린더 랜더링
  })
})

renderCalendar(); //페이지 로드 시 캘리더 랜더링

//날짜선택
let selectedYear = year;
let selectedMonth = month;

document.querySelectorAll('.dates li').forEach(function(day) {
    day.addEventListener('click', function() {
        let selectedDate = parseInt(this.textContent); //선택 날짜 가져오기
        handleSelectedDate(selectedDate);
    });
});

function handleSelectedDate(selectedDate) {
    console.log(selectedYear + '년 ' + (selectedMonth + 1) + '월 ' + selectedDate + '일');
}


