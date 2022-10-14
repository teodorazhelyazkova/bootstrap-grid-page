// DOM ELEMENTS
const paginationLimit = 8;

const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");

const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage;

// SEARCH ITEMS
const searchField = document.querySelector("#search-form");

searchField.addEventListener("input", (e) => {
  const searchFieldText = e.target.value;
  handleClearListBtnChange(searchFieldText);
  handleSearchFieldInput(paginatedList.querySelectorAll("li"), searchFieldText);
});

const handleSearchFieldInput = (listItems, searchFieldText) => {
  listItems.forEach((item) => {
    if (isMatching(item.innerHTML, searchFieldText)) {
      item.removeAttribute("hidden");
    } else {
      item.setAttribute("hidden", "hidden");
    }
  });

  const currentItemList = Array.from(listItems).filter(item => !item.getAttribute("hidden"));

  paginationNumbers.innerHTML = '';
  getPaginationNumbers(Math.ceil(currentItemList.length / paginationLimit));
  setCurrentPage(1, currentItemList);

  document.querySelectorAll(".pagination-number").forEach((pageLink) => {
    const pageIndex = Number(pageLink.getAttribute("page-index"));

    if (pageIndex) {
      pageLink.addEventListener("click", () => {
        setCurrentPage(pageIndex, currentItemList);
      });
    }
  });
};

const isMatching = (title, searchText) => {
  return title
    .toLowerCase()
    .replace(/ /g, "")
    .includes(searchText.toLowerCase().replace(/ /g, ""));
};

// DISABLE CLEAR LIST BUTTON
const clearListBtn = document.querySelector(".clearBtn");
clearListBtn.addEventListener("click", (e) => {
  searchField.value = "";
  handleClearListBtnChange("");
});

function handleClearListBtnChange(currentSearchFieldText) {
  clearListBtn.disabled = currentSearchFieldText === "";

  paginationNumbers.innerHTML = '';
  getPaginationNumbers(pageCount);
  setCurrentPage(1, paginatedList.querySelectorAll("li"));

  document.querySelectorAll(".pagination-number").forEach((pageLink) => {
    const pageIndex = Number(pageLink.getAttribute("page-index"));

    if (pageIndex) {
      pageLink.addEventListener("click", () => {
        setCurrentPage(pageIndex, paginatedList.querySelectorAll("li"));
      });
    }
  });
}

/* DELETE BUTTONS */
const removeItemBtns = document.querySelectorAll(".overlay-btn");
const deleteBtns = document.querySelectorAll(".bin");

[...removeItemBtns, ...deleteBtns].forEach((btn) =>
  btn.addEventListener("click", deleteItem)
);

function deleteItem(e) {
  const productItem = e.target.closest("li");
  productItem.remove();
  const searchField = document.querySelector("#search-form");
  const currentItemList = Array.from(paginatedList.querySelectorAll("li"));
  handleSearchFieldInput(currentItemList, searchField.value);
}

/* NEWSLETTER BUTTON */
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
  }

  form.classList.add("was-validated");
});

/* CAROUSEL SLIDER */
let items = document.querySelectorAll(".carousel .carousel-item");

items.forEach((el) => {
  const minPerSlide = 4;
  let next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

/* PAGINATION */
const appendPageNumber = (index) => {
  const pageNumber = document.createElement("li");
  const pageLink = document.createElement("a");

  pageNumber.className = "page-item border border-0";
  pageLink.className = "pagination-number page-link bg-white text-muted";
  pageLink.innerHTML = index;
  pageLink.setAttribute("page-index", index);
  pageLink.setAttribute("aria-label", "Page " + index);

  pageNumber.appendChild(pageLink);
  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = (count) => {
  for (let i = 1; i <= count; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum, items) => {
  currentPage = pageNum;

  handleActivePageNumber();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  items.forEach((item, index) => {
    item.setAttribute("hidden", "hidden");
    if (index >= prevRange && index < currRange) {
      item.removeAttribute("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers(pageCount);
  setCurrentPage(1, listItems);

  document.querySelectorAll(".pagination-number").forEach((pageLink) => {
    const pageIndex = Number(pageLink.getAttribute("page-index"));

    if (pageIndex) {
      pageLink.addEventListener("click", () => {
        setCurrentPage(pageIndex, listItems);
      });
    }
  });
});

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((pageLink) => {
    pageLink.classList.remove("active");

    const pageIndex = Number(pageLink.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      pageLink.classList.add("active");
    }
  });
};
