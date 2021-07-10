Array.prototype.shuffle = function () {
  return this.sort((a, b) => 2 * Math.round(Math.random()) - 1);
};

class Combination {
  constructor(n, r) {
    this.n = n;
    this.r = r;
  }

  generate() {
    return Array(this.n)
      .fill(0)
      .map((v, k) => k + 1)
      .shuffle()
      .slice(0, this.r);
  }
}

const pick = function (...args) {
  const combinations = Array.prototype.slice.call(args, 0);
  return [].concat.apply(
    [],
    combinations.map((x) => x.generate())
  );
};

const game = (n, type) => {
  const types = {
    lotto() {
      return pick(new Combination(45, 6));
    },
    powerball() {
      return pick(new Combination(40, 6), new Combination(20, 1));
    },
    ozlotto() {
      return pick(new Combination(45, 7));
    },
  };

  return Array(n)
    .fill(0)
    .map(() => types[type]());
};

const lottoForm = document.getElementById("lottochooser");
lottoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const gameType = document.getElementById("gameType").value;
  const rowNum = document.getElementById("rowNum").value;
  const ul = document.createElement("ul");
  const results = game(parseInt(rowNum), gameType);

  document.body.appendChild(ul);
  ul.setAttribute("id", "results");
  ul.innerHTML = results.map((n) => `<li>${n}</li>`).join("");
});
