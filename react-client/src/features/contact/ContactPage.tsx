import {useSelector} from "react-redux";

const ContactPage = () => {

    const data = useSelector((state:any) => state.data)
    
    return (
        <div>
             Count : {data}
        </div>
    );
};

export default ContactPage;
