// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FileText } from "react-feather";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Sidebar = () => {
    // const notes = [...useSelector((s) => s.notes)];
    // console.log(notes)

    const [data,setData]=useState(null);
   
    const getData=async()=>{
        try {
          const response = await fetch("https://simplenote-5703a-default-rtdb.firebaseio.com/sampleNote.json");
          var output = await response.json();
          setData(output) 
        
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(()=>{
       getData();
    },[])
    // console.log("data",data);
    const handleDelete = async (noteId) => {
        try {
          const response = await fetch(`https://simplenote-5703a-default-rtdb.firebaseio.com/sampleNote/${noteId}.json`, {
            method: "DELETE"
          });
        console.log(response);
          // Update the local state to reflect the deletion
          const updatedData = { ...data };
          delete updatedData[noteId];
          setData(updatedData);
          toast.success("Data Deleted");
        } catch (error) {
          console.error("Error deleting note:", error);
        }
      };



    return (
        <nav className="col-md-3 col-lg-2 bg-light sidebar">
            <div className="pt-3">
            <ul className="nav flex-column">
            {data &&  //change here
            Object.keys(data).map((key) => {
              const note = data[key];
              return (
                <li className="nav-item" key={key}>
                  <Link to={`/notes/edit/${key}`} className="nav-link">
                    <FileText size={16} className="feather" />
                    {" " + note.title}
                  </Link>
                  <div className="nav-div" onClick={() => handleDelete(key)}>
                    <MdDelete />
                  </div>
                </li>
              );
            })}
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
