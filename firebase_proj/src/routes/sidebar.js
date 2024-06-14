/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },

  {
    path: "/app/menu",
    icon: <DocumentIcon className={`${iconClasses} inline` } />,
    name: "Menu",
    submenu: [
      {
        path: 'menu/create',
        icon: <UsersIcon className={submenuIconClasses} />,
        name: 'Create',
      },
      {
        path: '/app/menu',
        icon: <UsersIcon className={submenuIconClasses} />,
        name: 'View',
      }
    ]
  },

];

export default routes;
