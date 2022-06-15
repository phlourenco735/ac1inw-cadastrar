import Head from 'next/head'
import { useState,useEffect} from 'react'

//importar a config do firebase
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs, orderBy, query, doc, deleteDoc} from 'firebase/firestore';

//configurar o Firebase do projeto
const contato = collection(database,'contato')

export default function Read() {

  const [contatoLista,setContatoLista] = useState([])
  const read = ()=>{
    getDocs(query(contato, orderBy("nome")))
    .then((data)=>{
      setContatoLista(data.docs.map((item)=>{
        return{...item.data(), id:item.id}
      }))
    })
  }

  useEffect(()=>{
    read()
  },[])

  //função do botão excluir
  const deleteBtn = (id)=>{
    const documento = doc(database, "contato",id)
    deleteDoc(documento)
    .then(()=>{
      read()
    }
    )
  }

  return (
    <>
      
        <h3 className='text-center'>GRAVADOS</h3>
        {contatoLista.map((lista)=>{
          return(
            <div className='card'>
              <div className="card-header bg-dark text-light">{lista.nome}</div>
              <div className='card-body'>
              <p className='card-subtitle'>{lista.email}</p>
              <p className='card-subtitle'>{lista.telefone}</p>
              <p className='card-text'>{lista.mensagem}</p>
              </div>
              <div className='card-footer text-center'>
              <div className="input-group">
              <input type="button" className='btn-outline-warning form-control' value="Alterar" />
              <input type="button" onClick={()=>deleteBtn(lista.id)} className='btn-outline-danger form-control' value="Excluir" />  
              </div>
              </div>

              </div>
            
          )
        })}
    </>
  )
}
