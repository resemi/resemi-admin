import { FunctionComponent } from 'react';
import Link from 'next/link';

export type LogoProps = {
  href: string;
  collapsed?: boolean;
  logo: string;
  text?: string;
};

export const Logo: FunctionComponent<LogoProps> = ({ href, collapsed = false, logo, text }) => {
  return (
    <Link href={href}>
      <a className="semi-navigation-header-link">
        <i className="semi-navigation-header-logo">
          <img alt="Logo" src={logo} />
        </i>
        {!collapsed && text && <span className="semi-navigation-header-text">{text}</span>}
      </a>
    </Link>
  );
};
