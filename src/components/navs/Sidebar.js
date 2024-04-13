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

    // change here
    const handleDelete = async (noteId) => {
        try {
          const response = await fetch(`https://simplenote-5703a-default-rtdb.firebaseio.com/sampleNote/${noteId}.json`, {
            method: "DELETE"
          });
          
          const updatedData = { ...data };
          delete updatedData[noteId];
          setData(updatedData);
          
          toast.success("Data Deleted");
        } catch (error) {
          alert("Data not be Deleted")
          console.error("Error deleting note:", error);
        }
        navigator(`/notes/add`);
      };



    return (
        <nav className="col-md-3 col-lg-2 bg-light sidebar">
            <div>
            <ul className="nav flex-column">
            { loading ? (
                        <div className="spinner">Loading...</div>
                    ) :(data &&  
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
            }))}
            </ul></div>
        </nav>
    );
};

export default Sidebar;
