import { jsx as _jsx } from "react/jsx-runtime";
export function EmptyState({ message }) {
    return (_jsx("div", { className: "empty-state", children: _jsx("p", { children: message }) }));
}
