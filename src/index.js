// KP component dependencies
import { modalInit } from "modal-pattern/src/modal";
import polyfillInit from "navigational-picker-pattern/src/polyfills";
import navigationalPickerInit from "navigational-picker-pattern/src/navigational-picker";

// KP component script
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    // Nav picker
    polyfillInit();
    navigationalPickerInit();

    // Modal
    modalInit();
  }
};
