import { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardSubtitle,
    FormGroup,
    Input,
    Label,
    CardFooter,
    Spinner,
    Button,
} from "reactstrap";

import { MdDelete } from "react-icons/md";
import { X } from "react-feather";
import validator from "validator";
import { toast } from "react-toastify";
import { v4 as uuid4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { addNote, updateNote } from "../redux/noteSlice";
import { addTags, updateTags } from "../redux/tagSlice";

const NoteView = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigator = useNavigate();
    const notes = useSelector((state) => state.notes);

    const [noteId, setNoteId] = useState();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [oldTags, setOldTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [pageTitle, setPageTitle] = useState("Add new");
    console.log(tags)

    // runs once
    useEffect(() => {
        const id = params.noteId;

        if (id) {
            setPageTitle("Update");
            setNoteId(id);
            loadNote(id);
        } else {
            resetView();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const resetView = () => {
        setNoteId("");
        setPageTitle("Add New");
        setTitle("");
        setContent("");
        setTags([]);
        setOldTags([]);
        setLoading(false);
        setSubmitted(false);
    };

    const loadNote = (id) => {
        const note = notes.find((n) => n.id === id);

        // if note is found, show its details
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setTags(note.tags);
            setOldTags(note.tags);
        }

        // if not, then navigate to add note.
        else {
            toast.warn(
                "Unable to find the note you are locking for. Please create a new one!"
            );
            navigator("/notes/add");
        }
    };

    const onFormSubmit = async(e) => {
        e.preventDefault();

        setSubmitted(true);

        if (validator.isEmpty(title)) {
            toast.error("Note Title is required");
            return;
        }

        setLoading(true);
        

        try {
            // adding firebase
            const res = await fetch("https://simplenote-5703a-default-rtdb.firebaseio.com/sampleNote.json",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    title,
                    content,
                    tags
                }),
            });
            console.log(res);
            if(res){
                alert("Data Stored");
            }else{
                alert("Data not be stored");
            }
            
            const note = {
                title,
                content,
                tags,
                
                updated: new Date().toISOString(),
            };
            

            if (noteId) {
                note.id = noteId;

                dispatch(updateNote(note));
                dispatch(updateTags({ tags, oldTags, notes, noteId }));
            } else {
                note.id = uuid4();
                note.created = new Date().toISOString();

                dispatch(addNote(note));
                dispatch(addTags(note.tags));

                navigator(`/notes/edit/${note.id}`);
            }

            toast.success(`Note add/updated successfully`);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    
    function handleKeyDown(e) {
        if (e.key !== "Enter") return;

        const value = e.target.value;

        if (!value.trim()) return;

        // only add if tag is not there already
        if (!tags.includes(value)) setTags([...tags, value]);
        console.log(tags)

        e.target.value = "";
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

  

    return (
        <>
            <div className="mt-3">
                <Card>
                    <CardBody>
                        <CardSubtitle className="mb3 text-muted">
                            {pageTitle} note
                        </CardSubtitle>

                        <FormGroup floating>
                            <Input
                                type="text"
                                id="NoteTitle"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                invalid={!title && submitted}
                            />
                            <Label for="NoteTitle">Title</Label>
                        </FormGroup>

                        <FormGroup floating>
                            <Input
                                type="textarea"
                                id="NoteContent"
                                placeholder="Note Content"
                                value={content}
                                height={5}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ height: "300px" }}
                            />
                            <Label for="NoteContent">Note Content</Label>
                        </FormGroup>

                        <div className="tags-input-container ">
                            {tags.map((tag, index) => (
                                <div className="tag-item" key={index}>
                                    <span className="text">{tag}</span>
                                    <MdDelete onClick={() => removeTag(index)} />
                                </div>
                            ))}
                            <input
                                onKeyDown={handleKeyDown}
                                type="text"
                                className="tags-input"
                                placeholder="type to add note tag"
                               
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        {loading && <Spinner>Saving...</Spinner>}
                        {!loading && (
                            <Button
                                type="submit"
                                color="primary"
                                onClick={onFormSubmit}
                            >
                                Save Note
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default NoteView;
