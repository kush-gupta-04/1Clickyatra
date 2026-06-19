import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="flex py-3 text-xs text-slate-400 font-medium tracking-wide uppercase">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center hover:text-primary transition-colors duration-300"
          >
            <Home className="h-3 w-3 mr-1" />
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <ChevronRight className="h-3 w-3 mx-1 text-slate-600" />
            {item.path ? (
              <Link
                to={item.path}
                className="hover:text-primary transition-colors duration-300 truncate max-w-[150px] sm:max-w-xs"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-primary truncate max-w-[150px] sm:max-w-xs">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
