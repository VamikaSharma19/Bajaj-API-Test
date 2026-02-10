function fibonacci(n) {
  if (n <= 0) return [];
  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr.slice(0, n);
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function hcf(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

function lcm(arr) {
  const lcmTwo = (a, b) => (a * b) / gcd(a, b);
  return arr.reduce((a, b) => lcmTwo(a, b));
}

module.exports = { fibonacci, isPrime, hcf, lcm };