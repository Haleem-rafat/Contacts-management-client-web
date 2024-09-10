import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import classNames from 'classnames';

const navItems = [
  { label: 'Conatct List', link: ROUTES.CONTACT },
  //  add more nav items to navigate in web app
];

export default function AppLayouts({ children }) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-28">
      <nav className="flex items-center justify-between py-6">
        <button
          type="button"
          className="text-xl font-medium"
          onClick={() => navigate(ROUTES.CONTACT)}>
          App
        </button>
        <div className="flex items-center justify-between gap-5">
          {navItems?.map((item) => (
            <NavLink
              key={item.label}
              to={item.link}
              className={({ isActive }): string =>
                classNames(
                  'border-b-2 transition-colors',
                  { 'border-b border-blue-500 text-blue-500': isActive },
                  { 'text-[#455A64]': !isActive }
                )
              }>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <section className="my-5">{children}</section>
    </div>
  );
}
