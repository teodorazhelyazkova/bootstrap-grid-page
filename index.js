// SEARCH ITEMS
const searchField = document.querySelector("#search-form");
searchField.addEventListener("input", () => {});

/* DELETE BUTTONS */
const removeItemBtns = document.querySelectorAll(".overlay-btn");
const deleteBtns = document.querySelectorAll(".bin");

[...removeItemBtns, ...deleteBtns].forEach((btn) =>
  btn.addEventListener("click", deleteItem)
);

function deleteItem(e) {
  const productItem = e.target.closest("li");
  productItem.remove();
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
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");

const paginationLimit = 8;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage;

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

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.setAttribute("hidden", "hidden");
    if (index >= prevRange && index < currRange) {
      item.removeAttribute("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  document.querySelectorAll(".pagination-number").forEach((pageLink) => {
    const pageIndex = Number(pageLink.getAttribute("page-index"));

    if (pageIndex) {
      pageLink.addEventListener("click", () => {
        setCurrentPage(pageIndex);
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
