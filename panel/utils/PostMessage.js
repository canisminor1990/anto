export const PostMessage = (name, data) => {
  try {
    window.postMessage(name, data);
  } catch (e) {
    console.log(name, data);
  }
};
