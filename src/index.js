// KP component dependencies
import { modalInit } from 'modal-pattern/src/modal';
import polyfillInit from 'navigational-picker-pattern/src/polyfills';
import navigationalPickerInit from 'navigational-picker-pattern/src/navigational-picker';

// KP component script
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    // Nav picker
    polyfillInit();
    navigationalPickerInit();

    // Modal
    modalInit();
  }
};

// Generic click handler
function addEvent(element, evnt, funct) {
  if (element.attachEvent) return element.attachEvent('on' + evnt, funct);
  else return element.addEventListener(evnt, funct, false);
}

// Care reminders - view more/less
addEvent(document.getElementById('my-button'), 'click', function () {
  let hiddenList = Array.from(document.getElementsByClassName('is-hidden'));
  let visibleList = Array.from(document.getElementsByClassName('is-visible'));

  if (hiddenList.length) {
    document.querySelector('.care-reminders .view-toggle').innerHTML =
      'View less care reminders';
    hiddenList.forEach(function (el) {
      el.classList.add('is-visible');
      el.classList.remove('is-hidden');
    });
  } else {
    document.querySelector('.care-reminders .view-toggle').innerHTML =
      'View all care reminders';
    visibleList.forEach(function (el) {
      el.classList.add('is-hidden');
      el.classList.remove('is-visible');
    });
  }
});
