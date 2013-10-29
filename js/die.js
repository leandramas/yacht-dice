var Die = {
  value: null,

  roll: function() {
    this.value = Math.floor(Math.random() * 6) + 1;
  }
};

function compareArrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  } else {
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }
}
