import {useState, useEffect} from 'react'
import axios from 'axios'

function Form(){

    const [name,setName] =useState();
    const [email, setEmail] = useState();
    const [arr, setArr] = useState([]);
    const [dis, setDis] = useState(0);
    const [pic, setPic] = useState();

    useEffect(()=>{
        axios.get("https://msirph.online/api/sample_api").then((res)=>{
            console.log(res)
          setArr(res.data);
        })
    },[dis]);
    
    const submitForm = () =>{
        let getData = new FormData();
        getData.append('name', name);
        getData.append('email', email);
        getData.append('pic', pic);
        getData.append('pic_name', pic.name);
        console.log(pic)
        axios({
            method:'POST',
            url:"https://msirph.online/api/sample_api/send",
            data: getData
        }).then((response)=>{
            console.log(response.data.data);
            setDis([]);
            // axios.get("https://msirph.online/api/sample_api").then((res)=>{
            //     setArr(res.data.data);
            //  })
          
        })

    }

    const updateForm = (id) =>{    
        let getData = new FormData();
        getData.append('name', name);
        getData.append('email', email);
        getData.append('id', id);
        axios({
            method:'POST',
            url:"https://msirph.online/api/sample_api/edit/" +  id,
            data: getData
        }).then((response)=>{
            console.log(response.data.data);
            setDis([])

        })
            }

    const deleBtn = (id) =>{
        let getData = new FormData();
        getData.append('id', id);
        axios({
            method:'POST',
            url:"https://msirph.online/api/sample_api/delete/" + id,
            data: getData
        }).then((response)=>{
           // window.location.reload();
           setDis([])

        })
    }

    const preview = (e) =>{
        setPic(e.target.files[0]);
    }
            
        return(
        <>
        <form>
            Name: <input type="text" name="name" id="name" onChange={(e)=> setName(e.target.value)}/> <br/>
            Email: <input type="text" name="email" id="email" onChange={(e)=> setEmail(e.target.value)}/> <br/>
            Pic: <input type="file" name="pic" id="pic" onChange={preview}/> <br/>
            <button type="button" onClick={submitForm}>Submit</button>
        </form>
        <hr/>
        {arr.map((item)=>{
            return(
                <>
                <tr>
                <td>
                    <input type="text" name="ename" id="ename" defaultValue={item.name} onChange={(e)=> setName(e.target.value)}/>
                </td>
                <td>
                    <input type="text" name="ename" id="ename" defaultValue={item.email} onChange={(e)=> setEmail(e.target.value)}/>
                </td>
                <td>
                    <input type="text" name="ename" id="ename" defaultValue={item.pic} onChange={(e)=> setPic(e.target.value)}/>
                </td>
                <td>
                    <img src={"https://msirph.online/storage/images/"+item.pic} style={{width: "100px"}} />
                </td>
                <td>
                    <button type="button" id={item.id} onClick={updateForm}>Update</button>
                    <button type="button" title={item.id} onClick={() => {deleBtn(item.id)}}>Delete</button>
                </td>
                </tr>
                </>
            )
        })}
        </>
    )
}

export default Form;