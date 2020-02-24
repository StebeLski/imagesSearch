module.exports.toOneArray = (gifsArray) => {
  const data = gifsArray.reduce((a, b) => {
    a.push(b.external_id);
    return a;
  }, []);

  return data;
};
