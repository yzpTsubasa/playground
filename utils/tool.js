export class Tool {
  static formatArgs(txt, ...args) {
    return txt && txt.replace(/\{(\d+?)\}/g, function(value, sub1, index, input) {
      var result = args && args[sub1];
      if (result == null) {
        result = value;
      }
      return result;
    }) || txt;
  }
  static formatParams(txt, params) {
    return txt && txt.replace(/\{(\S+?)\}/g, function (value, sub1, index, input) {
      var result = params && params[sub1];
      if (result == null) {
        result = value;
      }
      return result;
    }) || txt;
  }
}