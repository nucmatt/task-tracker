
const Footer = () => {
    let today = new Date();
    let year = today.getFullYear();
    return (
        <footer>
            <p>Copyright &copy; {year}</p>
            <a href="/about">About</a>
        </footer>
    )
}

export default Footer
