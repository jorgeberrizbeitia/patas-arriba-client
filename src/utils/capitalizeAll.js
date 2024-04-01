function capitalizeAll(str) {
  return str.split(" ").map((e) => e[0].toUpperCase() + e.slice(1)).join(" ")
}

export default capitalizeAll