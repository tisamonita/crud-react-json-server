import "./App.css";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function App() {
  //READ -> "get"

  //CREATE -> method "post"

  //UPDATE -> "PATCH"
  // DELETE -> DELETE

  const [data, setData] = useState(null); //data keseluruhan

  //nampung data isian user
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const loadData = async() => {
    await fetch('http://localhost:3000/quotes')
    .then((res) => res.json())
    .then((json) => setData(json))
    .catch((err) => console.log(err?.message))
  }

  useEffect(() => {
   loadData()
  }, [refresh]);

  const onSubmit = (e) => {
    e.preventDefault();
    //fetch dengan metode post untuk tambah data baru
    //POST
    fetch('http://localhost:3000/quotes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "quotes": quote,
         author,
      })
    }).then(()=>{
      setOpenModal(false)
      setRefresh(!refresh)
      setAuthor("")
      setQuote("")
    }) 
    

  };

  const onDelete = (id) => {
    //fetch dengan metode delete untuk hapus data berdasarkan id
    fetch(`http://localhost:3000/quotes/${id}`, {
      method: "DELETE"
    })
    .then (() =>{
      // setData(data.filter(data => data.id !== id)) //-> filter client side
      setRefresh(!refresh) //filter by server, refresh berubah, fetch data ulang
    })
  };

  const onUpdate = (e) => {
    e.preventDefault();

    //Patch untuk ubah data berdasarkan id
    fetch("http://localhost:3000/quotes/"+ isEdit , {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        "quotes": quote,
        author,
      })
    })
    .then(()=>{
      setQuote("")
      setAuthor("")
      setOpenModal(false)
      setRefresh(!refresh)
      setIsEdit(false)
    })
  }

  return (
    <>
      <Box w="100%" p={4}>
        <Button onClick={() => setOpenModal(true)} mr={3} mb={3}>
          Tambah data
        </Button>

        {data &&
          data.map((item) => {
            return (
              <Box key={item.id} bg="tomato" w="100%" p={4} color="white">
                <Button
                  color="black"
                  size="sm"
                  onClick={() => {
                    onDelete(item.id);
                  }}
                >
                  Delete
                </Button>
            
                <Button color="black" size="sm" ml="3"
                onClick={()=>{
                  setOpenModal(true);
                  setIsEdit(item.id);
                  setQuote(item.quotes);
                  setAuthor(item.author);
                  //logika set data dll
                }}
                >
                  Ubah Data
                </Button>

                <h1>Author : {item.author}</h1>
                <h2>Quotes : {item.quotes}</h2>
              </Box>
            );
          })}
      </Box>

{/* 
1. Modal nya di double, (- code banyak yg duplicate)
2. Klik edit, tetap modal yang sama, tapi pas di onsubmit,
 dikasih conditional (- akan ada banyak conditional rendering, if else) 
 */} 

{/* //disini akan banyak conditional */}
      <Modal isOpen={openModal} onClose={() => {setOpenModal(false); setIsEdit(false); setAuthor(''); setQuote('')}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ !isEdit ? "Add new data": "Edit data" }</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel>Author</FormLabel>
                <Input
                  type="text"
                  value={author}
                  onChange={(e) => 
                    setAuthor(e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quote</FormLabel>
                <Input
                  type="text"
                  value={quote}
                  onChange={(e) => 
                    setQuote(e.target.value)
                  }
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {setOpenModal(false); setIsEdit(false); setAuthor(''); setQuote('')}}
            >
              Close
            </Button>
            <Button colorScheme="blue" mr={3} onClick={(e) => !isEdit ? onSubmit(e) : onUpdate(e)}>
               {!isEdit ? 'Tambah data' : 'Edit data' }
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
