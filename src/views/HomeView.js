import { Link } from "react-router-dom";

const HomeView = () => {
    return (
        <div className="pt-2">
            <h4>Welcome to Simple Notes!</h4>
            <p>
                Create <Link to="/notes/add">a new note</Link> or Edit an
                existing. Or take a look at all the <Link to="/tags">tags</Link>
                .
            </p>
        </div>
    );
};

export default HomeView;
