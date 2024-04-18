import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FileText } from "react-feather";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAuth } from 'firebase/auth';

const Sidebar = () => {
    const isNoteSaved = useSelector((state) => state.bool.isNoteSaved);
    // console.log("isNoteSaved",isNoteSaved)
    const [data,setData]=useState([]);
    const navigator = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false); 
    const [noteIdToDelete, setNoteIdToDelete] = useState(null); 
  //  change here
    const getData=async()=>{
       const auth = getAuth();
        const user = auth.currentUser;
        try {
          if (user) {
            const userId = user.uid;
            console.log("In fetch",userId)
            const response = await fetch(`https://simplenote-5703a-default-rtdb.firebaseio.com/users/${userId}/notes.json`);
            const output = await response.json();
            
            if (output) {
                setData(output);
            }
         }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        
    }
    // change here
    useEffect(()=>{
      
      getData();
      //  console.log("using useeffect")
    },[isNoteSaved])   //change here 

    const handleDelete = async (noteId) => {
      try {
          // Show confirmation dialog
          console.log(noteId)
          setShowConfirmation(true);
          setNoteIdToDelete(noteId);
      } catch (error) {
          console.error("Error deleting note:", error);
      }
  };

  const confirmDelete = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
      try {
          if (user) {
            const userId = user.uid;
            console.log("In delete",userId)

            const response = await fetch(`https://simplenote-5703a-default-rtdb.firebaseio.com/users/${userId}/notes/${noteIdToDelete}.json`, {
                method: "DELETE"
            });

            const updatedData = { ...data };
            delete updatedData[noteIdToDelete];
            setData(updatedData);

            toast.success("Data Deleted");
        }
      } catch (error) {
          alert("Data could not be deleted");
          console.error("Error deleting note:", error);
      }

      // Reset confirmation state and navigate
      setShowConfirmation(false);
      setNoteIdToDelete(null);
      navigator(`/notes/add`);
  };

      const cancelDelete = () => {
        // Reset confirmation state
        setShowConfirmation(false);
        setNoteIdToDelete(null);
    };

    return (
        <nav className="col-md-3 col-lg-2 bg-light sidebar">
            <div>
            <ul className="nav flex-column">
            {data &&  
            Object.keys(data).map((key) => {
              const note = data[key];
              return (
                <li className="sideBar" key={key}>
                  <Link to={`/notes/edit/${note.noteId}`} className="nav-link">
                    <div  />
                    {" " + note.title}
                  </Link>
                  <div className="nav-div" onClick={() => handleDelete(key)}>
                    <MdDelete  className="delete"/>
                  </div>
                </li>
              );
            })}
            </ul></div>
            {showConfirmation && (
                <div className="Modal">
                <div className="modal-dialog  w-50">
                  <div className="modal-content">
                    <div className="modal-header">
                      
                      <button typeof="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={cancelDelete}></button>
                    </div>
                    <div className="modal-body">
                      Do you want to delete this ?
                    </div>
                    <div className="modal-footer">
                    <button typeof="button" className="btn btn-primary"  onClick={confirmDelete}>Confirm</button>
                      <button typeof="button" className="btn btn-secondary"  onClick={cancelDelete}>Close</button>
                      
                    </div>
                  </div>
                </div>
               </div>
            )}
        </nav>
       
    );
};

export default Sidebar;
