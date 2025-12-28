const factorial = (n: number): void => {
  if (n < 0) {
    throw new Error("factorial must be higher than zero");
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return console.log(result);
};

export default factorial;
