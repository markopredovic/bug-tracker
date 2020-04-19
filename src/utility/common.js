const getExcerpt = (text, length) => {
  let _excerpt = text;

  if (text.length > length) {
    _excerpt = text.substring(0, length - 1);
    _excerpt += "...";
  }

  return _excerpt;
};

export { getExcerpt };
