import Link from 'next/link'
import Favo from './favo'

function Nav() {
    return (
        <div>
            <Link href="/favo">
                <a style={{margin:10}}>Favourites</a>
            </Link>
            <Link href="/">
                <a>Home</a>
            </Link>
        </div>
    )
}

export default Nav;