export default function resetScroll() {
  const pageDiv = document.querySelector('#root');
  if (pageDiv) pageDiv.scrollTo(0, 0);
}