export function dispatch(element, action, payload, evt) {
  let type = evt ? evt : "event";
  let event = new CustomEvent(type, {
    detail: { action, payload }
  });
  element.dispatchEvent(event);
}
