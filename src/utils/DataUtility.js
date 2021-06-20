import { DATAFORMAT } from "../constants/DataFormat";

export const asciiToHex = function (str) {
  var hex, i;
  var result = "";
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }
  return result;
};

export const hexToAscii = function (str) {
  var j;
  var hexes = str.match(/.{1,4}/g) || [];
  var back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }
  return back;
};

export const convertTo = function (from, to, data) {
  switch (from) {
    case DATAFORMAT.ASCII.type:
      switch (to) {
        case DATAFORMAT.HEX.type:
          return asciiToHex(data);
        default:
          return data;
      }

    case DATAFORMAT.HEX.type:
      switch (to) {
        case DATAFORMAT.ASCII.type:
          return hexToAscii(data);
        default:
          return data;
      }
    default:
      return data;
  }
};
