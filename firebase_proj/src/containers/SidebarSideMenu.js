import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SidebarSubmenu({ submenu, name, icon, closeSidebar }) {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    /** Open Submenu list if path found in routes, this is for directly loading submenu routes first time */
    useEffect(() => {
        if (
            submenu.filter((m) => {
                return m.path === location.pathname;
            })[0]
        ) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    }, [location.pathname, submenu]);

    const handleSubmenuClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col">
            {/** Route header */}
            <div className="w-full block" onClick={handleSubmenuClick}>
                {icon} {name}
                <ChevronDownIcon
                    className={
                        "w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all " +
                        (isExpanded ? "rotate-180" : "")
                    }
                />
            </div>

            {/** Submenu list */}
            <div className={`w-full ${isExpanded ? "" : "hidden"}`}>
                <ul className="menu menu-compact">
                    {submenu.map((m, k) => (
                        <li key={k}>
                            <Link to={m.path} onClick={closeSidebar}>
                                {m.icon} {m.name}
                                {location.pathname === m.path && (
                                    <span
                                        className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                                        aria-hidden="true"
                                    ></span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SidebarSubmenu;
