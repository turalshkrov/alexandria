const capitalize = (str) => {
  const array = str.toLowerCase().trim().split(' ');
  str = "";
  array.forEach(elm => {
    str += elm[0].toUpperCase() + elm.slice(1) + ' ';
  });
  return str.trim();
}

module.exports = capitalize;