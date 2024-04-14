import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FileText } from "react-feather";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Sidebar = () => {
    const isNoteSaved = useSelector((state) => state.bool.isNoteSaved);
    // console.log("isNoteSaved",isNoteSaved)
    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false); 
    const [noteIdToDelete, setNoteIdToDelete] = useState(null); 
  //  change here
    const getData=async()=>{
        try {
            setLoading(true);
          const response = await fetch("https://simplenote-5703a-default-rtdb.firebaseio.com/sampleNote.json");
          const output = await response.json();
          if (output) {
            setData(output);
            // console.log("out",output);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
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
      try {
          const response = await fetch(`https://simplenote-5703a-default-rtdb.firebaseio.com/sampleNote/${noteIdToDelete}.json`, {
              method: "DELETE"
          });

          const updatedData = { ...data };
          delete updatedData[noteIdToDelete];
          setData(updatedData);

          toast.success("Data Deleted");
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
                    <p className="modal-text">Do you want to delete this {} ?</p>
                    <div className="modal-button">
                      <button onClick={confirmDelete} className="btn-1">Yes</button>
                      <button onClick={cancelDelete} className="btn-2">No</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Sidebar;
