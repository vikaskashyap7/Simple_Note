import { useSelector } from "react-redux";
import { Badge } from "reactstrap";

const TagsView = () => {
    const tags = useSelector((state) => state.tags);

    return (
        <div className="pt-2">
            <h4>List of Tags</h4>
            {tags &&
                tags.map((tag, indx) => (
                    <Badge pill key={indx} className="me-2">
                        {tag}
                    </Badge>
                ))}
        </div>
    );
};

export default TagsView;
