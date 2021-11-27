let paginationUl = document.querySelector(".pagination-bar ul");
let postsHolder = document.querySelector(".posts-holder");

let totalPages = 25;
let currentCards = 5;
let currentPage = currentCards;
let cards = 4;

function getPages(totalPages, page) {
  paginationUl.innerHTML = "";
  let prevBtn = "";
  let nextBtn = "";
  let activeLi;
  let beforNumb = "";
  let afterNumb = "";
  let beforPage = page - 1;
  let afterPage = page + 1;
  let firstPage = "";
  let lastPage = "";
  if (page > 1) {
    prevBtn += `<li class="btn prev" onclick="getPages(totalPages, ${
      page - 1
    })"><span>Prev</span></li>`;
  }
  if (page > 2) {
    firstPage += `<li class="numb"onclick="getPages(totalPages, 1)" ><span>1</span></li>`;
    if (page > 3) {
      firstPage += `<li class="dots"><span>...</span></li>`;
    }
  }
  //befor the last page
  if (page == totalPages) {
    beforPage = beforPage - 2;
  } else if (page == totalPages - 1) {
    beforPage = beforPage - 1;
  }

  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }
  for (let pageLength = beforPage; pageLength <= afterPage; pageLength++) {
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength == 0) {
      pageLength += +1;
    }
    if (page == pageLength) {
      activeLi = "active";
    } else {
      activeLi = "";
    }
    beforNumb += `<li class="numb ${activeLi}" onclick="getPages(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      lastPage += `<li class="dots"><span>...</span></li>`;
    }
    lastPage += `<li class="numb" onclick="getPages(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {
    nextBtn += `<li class="btn next" onclick="getPages(totalPages, ${
      page + 1
    })"><span>Next</span></li>`;
  }

  paginationUl.innerHTML += prevBtn;
  paginationUl.innerHTML += firstPage;
  paginationUl.innerHTML += beforNumb;
  paginationUl.innerHTML += lastPage;
  paginationUl.innerHTML += nextBtn;
}
const xhr = new XMLHttpRequest();
xhr.open("GET", "posts.json");
xhr.onload = accessData;
let posts;

function accessData() {
  //
  //
  //

  posts = JSON.parse(this.responseText);

  getPages(totalPages, currentCards);

  function displayPosts(posts, holder, cardsPrePage, page) {
    holder.innerHTML = "";
    page--;
    let start = cardsPrePage * page;
    let end = start + cardsPrePage;
    let paginatedCards = posts.slice(start, end);

    for (i = 0; i < paginatedCards.length; i++) {
      let post = paginatedCards[i];
      holder.innerHTML += `<div class="card-holder col-3">
      <div class="post-card ">
      <p class="title"> ${post.title}</p>
      <span class="id">CardNumber : ${post.id}</span>
      <p class="post"> ${post.body}</p>
    </div>
      </div>`;
    }
  }
  displayPosts(posts, postsHolder, cards, currentCards);

  //
  //
  //
  function moveByNumb(e) {
    if (typeof +e.target.innerText === "number") {
      currentCards = +e.target.innerText;
      currentPage = currentCards;
      displayPosts(posts, postsHolder, cards, currentPage);
    }
  }
  function getNext(current) {
    console.log("string");
    current = currentCards;
    let next = currentCards + 1;
    console.log(currentCards);
    displayPosts(posts, postsHolder, cards, next);
    console.log(next);
  }
  paginationUl.addEventListener("click", moveByNumb);
}
xhr.send();
