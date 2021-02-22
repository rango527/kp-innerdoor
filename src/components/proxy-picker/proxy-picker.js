import polyfillInit from 'navigational-picker-pattern/src/polyfills';
import navigationalPickerInit from 'navigational-picker-pattern/src/navigational-picker';

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    polyfillInit();
    navigationalPickerInit();
  }
};
