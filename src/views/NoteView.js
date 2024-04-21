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
    Row,
} from "reactstrap";

import { MdDelete } from "react-icons/md";
import { getAuth } from 'firebase/auth';

import validator from "validator";
import { toast } from "react-toastify";
import { v4 as uuid4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Outlet } from "react-router-dom";

import { addNote, updateNote } from "../redux/noteSlice";
import { addTags, updateTags } from "../redux/tagSlice";
import { toggleNoteSaved } from "../redux/toggleSlice";
import Header from "../components/navs/Header";
import Sidebar from "../components/navs/Sidebar";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
const NoteView = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigator = useNavigate();
    const notes = useSelector((state) => state.notes);
    // console.log(notes)

    const [noteId, setNoteId] = useState();
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
const [fileUrl, setFileUrl] = useState(null);
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [oldTags, setOldTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [pageTitle, setPageTitle] = useState("Add new");
    // console.log(tags)
    
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


    const onFormSubmit = async (e) => {
        
            e.preventDefault();
            const auth = getAuth();
            const user = auth.currentUser;
        
            setSubmitted(true);
            if (validator.isEmpty(title)) {
                toast.error("Note Title is required");
                return;
            }
        
            setLoading(true);
            const Id = uuid4();
        
            try {
                if (user) {
                    const userId = user.uid;
                    const storage = getStorage();
                    const storageRef = ref(storage, `users/${userId}/images/${file.name}`);
        
                    // Check if file is selected
                    if (file) {
                        const uploadTask = uploadBytesResumable(storageRef, file);
        
                        // Listen for upload completion
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                // Handle upload progress if needed
                            },
                            (error) => {
                                console.error('Error uploading file:', error);
                                toast.error('Failed to upload file');
                                setLoading(false);
                            },
                            async () => {
                                // Upload completed successfully, get download URL
                                try {
                                    const downloadURL = await getDownloadURL(storageRef);
                                    console.log('Download URL:', downloadURL);
        
                                    // Update state with the file URL
                                    setFileUrl(downloadURL);
        
                                    // Continue with saving the note to Realtime Database
                                    const note = {
                                        title,
                                        content,
                                        tags,
                                        fileUrl: downloadURL, // Include file URL in the note data
                                        updated: new Date().toISOString(),
                                    };
        
                                    // Save the note to Firebase Realtime Database
                                    const res = await fetch(`https://simplenote-5703a-default-rtdb.firebaseio.com/users/${userId}/notes.json`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            ...note,
                                            noteId: Id,
                                        }),
                                    });
        
                                    dispatch(toggleNoteSaved());
        
                                    if (noteId) {
                                        note.id = noteId;
                                        dispatch(updateNote(note));
                                        dispatch(updateTags({ tags, oldTags, notes, noteId }));
                                    } else {
                                        note.id = Id;
        
        
                                        dispatch(addNote(note));
                                        dispatch(addTags(note.tags));
        
                                        // Reset file input after successful submission
                                        setFile(null); // Clear the file state
                                        const fileInput = document.getElementById('fileInput');
                                        if (fileInput) {
                                            fileInput.value = null; // Reset the file input value
                                        }
        
                                        navigator(`/notes/add`);
                                    }
        
                                    toast.success('Note saved successfully');
                                } catch (error) {
                                    console.error('Error getting download URL:', error);
                                    toast.error('Failed to get file download URL');
                                }
        
                            }
                        );
                    } else {
                        // No file selected, save/update the note without file URL
                        const note = {
                            title,
                            content,
                            tags,
                            updated: new Date().toISOString(),
                        };
        
                        // Save the note to Firebase Realtime Database
                        const res = await fetch(`https://simplenote-5703a-default-rtdb.firebaseio.com/users/${userId}/notes.json`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                ...note,
                                noteId: Id,
                            }),
                        });
        
                        dispatch(toggleNoteSaved());
        
                        if (noteId) {
                            note.id = noteId;
                            dispatch(updateNote(note));
                            dispatch(updateTags({ tags, oldTags, notes, noteId }));
                        } else {
                            note.id = Id;
        
        
                            dispatch(addNote(note));
                            dispatch(addTags(note.tags));
        
                            // Reset file input after successful submission
                            setFile(null); // Clear the file state
                            const fileInput = document.getElementById('fileInput');
                            if (fileInput) {
                                fileInput.value = null; // Reset the file input value
                            }
        
                            navigator(`/notes/add`);
                        }
        
                        toast.success('Note saved successfully');
                    }
                }
        
            } catch (error) {
                console.error('Error saving note:', error);
                toast.error('Failed to save note');
        
            }
            setLoading(false);
            navigator(`/notes/add`);
       
        
    };
    

    
    function handleKeyDown(e) {
        if (e.key !== "Enter") return;

        const value = e.target.value;

        if (!value.trim()) return;

        // only add if tag is not there already
        if (!tags.includes(value)) setTags([...tags, value]);
        // console.log(tags)

        e.target.value = "";
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

  

    return (
       <>
       
       <Header appName="Simple Notes" homePage="/" logoutLink="" />
                    
       
       <div className="noteWrapper">
                 <div >           
                        <Row>
                            <Sidebar />
                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-5">
                                <Outlet />
                            </main>
                        </Row>
                 </div>
         <div className="mt-3 noteView">
                <Card>
                    <CardBody>
                        <CardSubtitle className="mb3 ">
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
                               className="input-1"
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
                         
                        <FormGroup>
                            <Label for="fileInput">Upload File</Label>
                            <Input
                                type="file"
                                id="fileInput"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
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
            </div>
       </>
            
        
    );
};

export default NoteView;
