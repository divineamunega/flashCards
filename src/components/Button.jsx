import { Link } from "react-router";

const Button = function ({ type, children, to, className, handleClick }) {
    if (type === "button") {
        return (
            <button
                onClick={handleClick}
                className="cursor-pointer text bg-gradient-to-r from-[#52357B] to-[#5459AC] text-white px-12 py-2 rounded-3xl flex items-center gap-3 hover:opacity-80"
            >
                {children}
            </button>
        );
    }

    if (type === "link") {
        let classString =
            "flex items-center flex-nowrap gap-2 bg-white rounded-4xl  border-2 border-gray-200 hover:bg-slate-100 ";

        const defaultPadding = " px-4 py-2 ";

        if (!className) {
            classString += defaultPadding;
        }
        classString += className;
        return (
            <Link to={to} className={classString}>
                {children}
            </Link>
        );
    }
};

export default Button;
