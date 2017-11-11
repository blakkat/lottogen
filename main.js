Array.prototype.shuffle = function() {
  return this.sort(function(a, b) {
    return 2 * Math.round(Math.random()) - 1;
  });
};

function Combination(n, r) {
  this.n = n;
  this.r = r;
}

Combination.prototype.generate = function() {
  return Array(this.n)
    .fill(0)
    .map(function(v, k) { return k + 1; })
    .shuffle()
    .slice(0, this.r);
};

var pick = function() {
  var combinations = Array.prototype.slice.call(arguments, 0);
  return [].concat.apply([], combinations.map(function(x) { return x.generate();  }));
};

var game = function(n, type) {
  var types = {
    lotto    : function() { return pick(new Combination(45, 6)); },
    powerball: function() { return pick(new Combination(40, 6), new Combination(20, 1)); },
    ozlotto  : function() { return pick(new Combination(45, 7)); }
  };

  return Array(n).fill(0).map(function() { return types[type](); });
};


var lottoForm = document.getElementById("lottochooser");
lottoForm.addEventListener("submit", function(e){
  e.preventDefault(); 
    var gameType = document.getElementById("gameType").value,
            rowNum = document.getElementById("rowNum").value,
      ul = document.createElement("ul"),
      results = game(parseInt(rowNum), gameType);
 
  document.body.appendChild(ul);
  ul.setAttribute("id","results")
  ul.innerHTML =  results.map(function(n){return "<li>" + n + "</li>"}).join("");
});
