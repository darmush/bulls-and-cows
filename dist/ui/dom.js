export const el = (tag, props = {}, children = []) => {
    const element = Object.assign(document.createElement(tag), props);
    element.append(...children);
    return element;
};
export const render = (screen) => {
    document.body.replaceChildren(screen);
};
//# sourceMappingURL=dom.js.map