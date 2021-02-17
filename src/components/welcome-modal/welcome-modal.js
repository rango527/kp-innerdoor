import { modalInit } from 'modal-pattern/src/modal';

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {

    modalInit();
  }
};
