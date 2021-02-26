import { Link } from 'react-router-dom';

const Footer = () => {
    let today = new Date();
    let year = today.getFullYear();
    return (
        <footer>
            <p>Copyright &copy; {year}</p>
            <Link to="/about">About</Link>
        </footer>
    )
}

export default Footer
