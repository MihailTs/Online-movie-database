import { ReactNode, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type BaseLinkProps = React.DetailedHTMLProps<
  React.LinkHTMLAttributes<HTMLLinkElement>,
  HTMLLinkElement
>;

interface AuthLinkProps extends BaseLinkProps{
  to: string,
  isAuthenticated: boolean
}

export function AuthLink(props : AuthLinkProps ) {
  const navigate = useNavigate();

  const handleClick = (event : MouseEvent<HTMLAnchorElement>) => {
    if (!props.isAuthenticated) {
      event.preventDefault();
      navigate('/login');
    }
  };

  return (
    <Link to={props.to} onClick={handleClick}>
      {props.children}
    </Link>
  );
}

export default AuthLink;