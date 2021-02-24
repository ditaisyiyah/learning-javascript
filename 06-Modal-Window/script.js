/// DOM and Events Fundamentals ///
'use strict';

/////////////////////
/// Modal Window ///
// simply about how to open and close window
// 1) in order to make a dry code, store a querySelector into a variable
// 2) give a function to open window button
// 3) give an overlay effect when opening
// 4) give a function to close window into: close button, clicking overlay, and pressing escape

// 1)
// button to open window
const opnModalButtons = document.querySelectorAll('.show-modal');
// modal window
const modalWindow = document.querySelector('.modal');
// button to close window
const clsModalButton = document.querySelector('.close-modal');
// overlay
const overlay = document.querySelector('.overlay');

// 2) & 3)
// defaul condition: modal windwo and overlay is hidden
// give a function to open window button
// use for loop because it's buttonS
for (let i = 0; i < opnModalButtons.length; i++) {
  opnModalButtons[i].addEventListener('click', function () {
    // console.log(`open button ${i + 1} was clicked`);
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

// 4)
// give a function to close window
const closeWindow = function (ifYouWanna) {
  console.log(ifYouWanna);
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

clsModalButton.addEventListener('click', closeWindow());
overlay.addEventListener('click', closeWindow());
document.addEventListener('click', closeWindow());

/*
// give the function to close window button
clsModalButton.addEventListener('click', function () {
  //   console.log('close button was clicked');
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
});

// 3)
// clicking overlay
overlay.addEventListener('click', function () {
  //   console.log('overlay was clicked');
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
});

// pressing escape
document.addEventListener('keydown', function (e) {
  //   console.log(`${e.key} was pressed`);

  if (e.key === 'Escape') {
    if (!modalWindow.classList.contains('hidden')) {
      modalWindow.classList.add('hidden');
      overlay.classList.add('hidden');
    }
  }
});
*/
