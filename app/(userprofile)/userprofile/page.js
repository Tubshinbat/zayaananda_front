export default function Page() {
    return <>
    <section>

        <div className="container">
            <div className="row">
                <div className="col-md-4"> 
                    <div className="users-side-menu">
                        <ul className="user-menu">
                            <li><Link href="/userprofile">  Хувийн мэдээлэл </Link></li>
                            <span>Захиалгаc</span>
                        </ul>
                    </div>
                     </div>
                <div className="col-md-8"> content </div>
            </div>
        </div>
    </section>
    </>
}