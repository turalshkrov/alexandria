const capitalize = (str) => {
  const splittedStr = str.toLowerCase().trim().split(' ');
  str = "";
  splittedStr.forEach(elm => {
    if(elm.includes('.')) elm = elm.toUpperCase();
    str += elm[0].toUpperCase() + elm.slice(1) + ' ';
  });
  return str.trim();
}

module.exports = capitalize;