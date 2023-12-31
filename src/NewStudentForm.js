import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

function NewStudentForm() {
    const [students, addStudent] = useOutletContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [language, setLanguage] = useState("");
    const [learningStyle, setLearningStyle] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate();

    function handleFirstName(e) {
        setFirstName(e.target.value)
    }

    function handleLastName(e) {
        setLastName(e.target.value)
    }

    function handleLanguage(e) {
        setLanguage(e.target.value)
    }

    function handleLearningStyle(e) {
        setLearningStyle(e.target.value)
    }

    function handleImage(e) {
        setImage(e.target.value)
    }

    function handleAddStudent(e) {
        e.preventDefault();
        if (firstName.length > 0 && lastName.length > 0) {
            const fullName = [firstName, lastName]
            const joinedName = fullName.join(" ")
            const id = (students.length + 1)
            const newStudent = {
                id: id,
                name: joinedName,
                language: language,
                learningStyle: learningStyle,
                image: image
            }
            fetch("http://localhost:3000/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStudent),
            })
            .then(r => r.json())
            .then(addStudent)
            setFirstName("");
            setLastName("");
            setLanguage("");
            setLearningStyle("");
            setImage("");
            navigate('/home')
        } else {
            alert ("Students must have a name!")
        }
    }

    return (
        <>
            <h1>New Student Form</h1>
            <h3>Add a new student to the roster using the form below.</h3>
            <form onSubmit={handleAddStudent}>
                <input type="text" value={firstName} onChange={handleFirstName} placeholder="First Name"/>
                <input type="text" value={lastName} onChange={handleLastName} placeholder="Last Name"/>
                <select value={language} onChange={handleLanguage}>
                    <option value="">Select Language</option>
                    <option value="Javascript">Javascript</option>
                    <option value="Python">Python</option>
                    <option value="Spoken">Spoken</option>
                </select>
                <input type="text" value={learningStyle} onChange={handleLearningStyle} placeholder="Learning Style" />
                <input type="text" value={image} onChange={handleImage} placeholder="Image URL" />
                <button type="submit">Add Student to Roster</button>
            </form>
        </>
    )
}

export default NewStudentForm;