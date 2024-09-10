import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '@constants/routes';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { LuContact } from 'react-icons/lu';
import { RiContactsBookLine } from 'react-icons/ri';

const navItems = [
  { icon: <LuContact size={20} />, label: 'Contact List', link: ROUTES.CONTACT },
  { icon: <RiContactsBookLine size={20} />, label: 'Create contact', link: ROUTES.CREATE_CONTACT },
  //  add more nav items to navigate in web app
];

export default function AppLayouts({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      setIsOpen(!mediaQuery.matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOverlayClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-20 bg-black md:hidden"
              onClick={() => setIsOpen(false)}></motion.div>
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className={classNames(
                'flex shrink-0 grow-0 flex-col bg-white shadow',
                'fixed z-20 h-screen w-64 overflow-hidden px-6 py-3'
              )}>
              <p className="my-10 text-lg font-bold">Contact management</p>
              <div className="flex flex-col gap-3">
                {navItems?.map((item) => (
                  <NavLink
                    to={item.link}
                    key={item.label}
                    onClick={() => handleOverlayClick()}
                    className={({ isActive }): string =>
                      classNames(
                        'flex w-52 items-center gap-4 overflow-hidden rounded-lg px-6 py-2 text-blue-500',
                        { 'bg-blue-500/10 font-semibold text-blue-500': isActive }
                      )
                    }>
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="block rounded-lg bg-blue-500 p-2 text-white md:hidden"
        onClick={() => setIsOpen(true)}>
        <IoMenu size={30} />
      </button>

      <div className="mx-auto ml-0 px-4 sm:ml-72 md:px-28">
        <section className="pt-10">{children}</section>
      </div>
    </>
  );
}
