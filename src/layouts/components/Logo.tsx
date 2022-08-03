import { FunctionComponent } from 'react';
import Link from 'next/link';

export type LogoProps = {
  href: string;
  collapsed?: boolean;
};

export const Logo: FunctionComponent<LogoProps> = ({ href, collapsed = false }) => {
  return (
    <Link href={href}>
      <a className="semi-navigation-header-link">
        <i className="semi-navigation-header-logo">
          <img
            alt="Logo"
            src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg"
          />
        </i>
        {!collapsed && <span className="semi-navigation-header-text">Resemi Admin</span>}
      </a>
    </Link>
  );
};
