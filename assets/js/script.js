'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if(select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "tout") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if(form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

/* ==============================================
   GESTION DE LA MODALE PROJET (PORTFOLIO)
   ============================================== */

// Variables pour la modale projet
const projectItems = document.querySelectorAll("[data-project-item]");
const modalContainerProject = document.querySelector("[data-modal-container-project]");
const modalCloseBtnProject = document.querySelector("[data-modal-close-btn-project]");
const overlayProject = document.querySelector("[data-overlay-project]");

// Variables pour le contenu de la modale
const modalProjectImg = document.querySelector("[data-modal-project-img]");
const modalProjectTitle = document.querySelector("[data-modal-project-title]");
const modalProjectTech = document.querySelector("[data-modal-project-tech]");
const modalProjectText = document.querySelector("[data-modal-project-text]");
const modalProjectGithub = document.querySelector("[data-modal-project-github]");
const modalProjectDemo = document.querySelector("[data-modal-project-demo]");

// Fonction pour basculer l'affichage de la modale
const projectModalFunc = function () {
  modalContainerProject.classList.toggle("active");
  overlayProject.classList.toggle("active");
}

// Ajouter l'événement de clic sur tous les projets
for (let i = 0; i < projectItems.length; i++) {

  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault(); 

    // 1. Récupérer les infos visibles
    const imgElement = this.querySelector("img");
    const titleElement = this.querySelector(".project-title");
    
    // 2. Récupérer les infos cachées
    const hiddenDesc = this.querySelector(".desc").innerText;
    const hiddenTech = this.querySelector(".tech-stack").innerText;
    const hiddenGithub = this.querySelector(".github-link").innerText;
    const hiddenDemo = this.querySelector(".demo-link").innerText;

    // 3. Injecter les données dans la modale
    modalProjectImg.src = imgElement.src;
    modalProjectImg.alt = imgElement.alt;
    modalProjectTitle.innerHTML = titleElement.innerHTML;
    modalProjectText.innerHTML = `<p>${hiddenDesc}</p>`;
    modalProjectTech.innerHTML = hiddenTech;
    
    // 4. Gestion des boutons
    modalProjectGithub.href = hiddenGithub;
    modalProjectDemo.href = hiddenDemo;

    // Gestion Bouton GitHub (cache si # ou vide)
    if(hiddenGithub.trim() === "#" || hiddenGithub.trim() === "") {
        modalProjectGithub.style.display = "none";
    } else {
        modalProjectGithub.style.display = "flex";
    }

    // Gestion Bouton Démo (cache si # ou vide)
    if(hiddenDemo.trim() === "#" || hiddenDemo.trim() === "") {
        modalProjectDemo.style.display = "none";
    } else {
        modalProjectDemo.style.display = "flex"; 
    }

    // 5. Ouvrir la modale
    projectModalFunc();
  });
}

// Fermeture de la modale
if(modalCloseBtnProject) {
    modalCloseBtnProject.addEventListener("click", projectModalFunc);
    overlayProject.addEventListener("click", projectModalFunc);
}